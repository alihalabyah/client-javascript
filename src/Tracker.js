/**
 * Constructor is not used. {@link qmonix.Tracker Tracker} is an object
 * with static methods.
 * @constructor
 *
 * @class
 * Global event tracking object. It has methods to track single and create
 * timing events. Events are identified by their unique tag name. Each
 * different event has a different tag name. It is up to the user to make sure
 * tags are unique.
 * <p>
 * An event is called single, if it has a single time stamp - when it was fired.
 * This type of event can be used for button clicks, page views, etc.
 * {@link qmonix.Tracker.fire fire} method is used to track single events.
 * <p>
 * Timing events have two values: one when the event was started, second how
 * long it lasted. So this type of event is used to track continuous user
 * activities. E.g. it might be be used to track how much time user took to
 * fill registration form. Such event would be started when registration form
 * was displayed to the user. In this case the event could be fired when the
 * user hit "Register" button. Timing events show when specific event started
 * and for how long it lasted. {@link qmonix.Tracker.start start} method
 * creates and returns a new timing event object which can be paused, resumed
 * and fired. More detailed description is in
 * {@link qmonix.TimingEvent TimingEvent} class.
 * <p>
 * The smallest unit of time is a second. Every event represents a
 * corresponding second - time when it was fired (single events) or started
 * (timing events).
 * <p>
 * By default Tracker is initialized with DefaultEventDispatcher which is
 * created with the same server address and port number that the Qmonix SDK
 * script was loaded from. The SDK script tag must have id attribute with
 * value "Qmonix-Server-script". Otherwise Tracker will not be initialized,
 * in this case it could be done by setting the EventDispatcher with
 * {@link qmonix.Tracker.setDispatcher setDispatcher}.
 * <p>
 * When the events are fired they are forwarded to event dispatcher which is
 * responsible for collecting and dispatching the events. Initially
 * {@link qmonix.Tracker Tracker} uses default dispatcher which is
 * described in {@link qmonix.DefaultEventDispatcher DefaultEventDispatcher}.
 * But it is possible to use custom dispatcher which should implement
 * {@link qmonix.EventDispatcher EventDispatcher} interface.
 * {@link qmonix.Tracker.setDispatcher setDispatcher} is used to replace
 * default dispatcher.
 *
 * @see qmonix.Event
 * @see qmonix.TimingEvent
 * @see qmonix.EventDispatcher
 * @see qmonix.exceptions.UninitializedTrackerException
 */
qmonix.Tracker = new function()
{
	this.QMONIX_SCRIPT_ID = "Qmonix-Server-script";
	this.DEFAULT_URL = "/event/";

	this.exceptions = qmonix.exceptions;
	this.dispatcher = undefined;

	var tempAnchor = document.createElement("a");
	var qmonixScript = document.getElementById(this.QMONIX_SCRIPT_ID);
	if (qmonixScript != null)
	{
		tempAnchor.href = qmonixScript.src;
		var serverUrl = tempAnchor.protocol + "//" + tempAnchor.host
			+ this.DEFAULT_URL;
		this.dispatcher = new qmonix.DefaultEventDispatcher(
			serverUrl);
	}


	/**
	 * Checks if {@link qmonix.Tracker Tracker} singleton was
	 * initialized. If it was, returns silently, otherwise exception is
	 * thrown.
	 *
	 * @throws {qmonix.exceptions.UninitializedTrackerException}
	 * exception if dispatcher was not set.
	 * @private
	 */
	this.checkInitialized = function()
	{
		if (typeof this.dispatcher == 'undefined')
		{
			var msg = "Tracker was not initialized";
			throw new this.exceptions.UninitializedTrackerException(msg);
		}
	}


	/**
	 * Adds new single or volume event depending on specified parameters
	 * to the event dispatcher. Event fire time is when this method is
	 * invoked. Throws exception if tracker was not initialized.
	 * If event volume parameter is specified, then Tracker creates
	 * and fires {@link qmonix.VolumeEvent VolumeEvent}, otherwise
	 * {@link qmonix.Event Event} is fired.
	 *
	 * @param {String} tag unique event tag name.
	 * @param {Number} volume event volume. Optional.
	 * @throws {qmonix.exceptions.UninitializedTrackerException}
	 *	exception, if tracker was not initialized.
	 */
	this.fire = function(tag, volume)
	{
		this.checkInitialized();

		var e = undefined;

		if (volume === undefined)
		{
			e = new qmonix.Event(tag);
		}
		else
		{
			e = new qmonix.VolumeEvent(tag, volume);
		}

		e.fire();
	};


	/**
	 * Creates and returns a new timing event with a specified tag name.
	 * Before returning timing event it is started. If tracker was not
	 * initialized, throws exception.
	 *
	 * @param {String} tag event tag name.
	 * @return {qmonix.TimingEvent} new timing event object
	 * associated with specified tag.
	 *
	 * @throws {qmonix.exceptions.UninitializedTrackerException}
	 * exception, if tracker was not initialized.
	 */
	this.start = function(tag)
	{
		this.checkInitialized();

		var newEvent = new qmonix.TimingEvent(tag);
		newEvent.start();
		return newEvent;
	};


	/**
	 * Returns dispatcher currently used by the Trakcer. If Tracker was
	 * not initialized, throws exception.
	 *
	 * @return {qmonix.EventDispatcher} dispatcher which is currently
	 * used by {@link qmonix.Tracker}.
	 * @throws {qmonix.exceptions.UninitializedTrackerException}
	 * exception, if tracker was not initialized.
	 */
	this.getDispatcher = function()
	{
		this.checkInitialized();

		return this.dispatcher;
	};


	/**
	 * Replaces current dispatcher. Does not execute old dispatcher
	 * finalization process. E.g. in default event dispatcher case, user
	 * should manually submit it's events before setting a new dispatcher,
	 * otherwise they would never be sent to the server.
	 *
	 * @param {qmonix.EventDispatcher} dispatcher new dispatcher.
	 */
	this.setDispatcher = function(dispatcher)
	{
		this.dispatcher = dispatcher;
	};
}


/* export symbols */
qmonix['Tracker'] = qmonix.Tracker;
qmonix.Tracker['start'] = qmonix.Tracker.start;
qmonix.Tracker['fire'] = qmonix.Tracker.fire;
qmonix.Tracker['getDispatcher'] = qmonix.Tracker.getDispatcher;
qmonix.Tracker['setDispatcher'] = qmonix.Tracker.setDispatcher;
