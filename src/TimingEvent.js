/**
 * Constructs new timing event with a specified tag name
 *
 * @param {String} tag event tag name. This is a unique name for every
 *	different event. It is used as event ID in database. User is
 *	responsible to make sure different events have different names.
 *
 * @constructor
 * @augments qmonix.VolumeEvent
 *
 * @class
 * Timing event is the event that is continuous in time, it has event start
 * time and length. Timing events are identified by unique tag name. This class
 * does not assure that tag names are unique so the user must choose unique
 * tags themselves. Timing event extends {@link qmonix.VolumeEvent}, where
 * volume is for how long Timing event lasted.
 * <p>
 * Timing event is used to track when particular events started and how long
 * they lasted. E.g.
 * it could be used to measure how long it took a user to fill in registration
 * form. Event would be started once the registration form was displayed to the
 * user and stopped when the user hit "Register" button.
 * <p>
 * Timing event is created with a specified tag name. This event might be
 * started, paused, resumed, and fired.
 * <ul>
 * <li>{@link qmonix.TimingEvent.start start} causes to start tracking the
 * timing event. Event start time is captured whenever this method is invoked.
 * If timing event was already started, this method will throw an exception.
 * <li>{@link qmonix.TimingEvent.pause pause} pauses timing event. Later
 * it can be resumed. E.g. this might be used when application is minimized
 * and one does not want to include this time into measurements. If event was
 * not started or was already paused, exception is thrown.
 * <li>{@link qmonix.TimingEvent.resume resume} resumes a paused event.
 * After this method call event tracking is continued. If event was not
 * started or pause, exception is thrown.
 * <li>{@link qmonix.TimingEvent.fire fire} stops tracking the event and
 * forwards it's data to {@link qmonix.EventDispatcher EventDispatcher}.
 * It uses the same dispatcher as {@link qmonix.Tracker Tracker} does.
 * After this method is invoked, event becomes unusable anymore and cannot be
 * restarted. Any further attempts to use it will throw an exception. Methods
 * that provide event information, like
 * {@link qmonix.TimingEvent.toJson toJson},
 * {@link qmonix.Event.getTag getTag} are allowed after
 * {@link qmonix.TimingEvent.fire fire} too.
 * </ul>
 * <p>
 * When paused and resumed timing event collects all the time intervals while
 * it was being tracked. {@link qmonix.TimingEvent.fire fire} sums the
 * total length of all the intervals and passes it together with the event
 * start time to the dispatcher. E.g. in scenario like this: event is started,
 * then paused, then resumed and finally stopped, there would be two time
 * intervals. First - between start and pause time, second - between resume
 * and stop time. Event dispatcher would receive start time stamp and total
 * timing event length. Which would be calculated like this:
 * (pause time - start time) + (stop time - resume time).
 *
 * @see qmonix.Event
 * @see qmonix.Tracker
 * @see qmonix.EventDispatcher
 */
qmonix.TimingEvent = function(tag)
{
	/* super constructor */
	qmonix.VolumeEvent.call(this, tag);

	this.State = {INITIAL : 1, STARTED : 2, FIRED : 3, PAUSED : 4};

	this.state = this.State.INITIAL;

	this.timeIntervals = new Array();
	this.lastTimeInterval = undefined;
}

qmonix.TimingEvent.prototype = new qmonix.VolumeEvent();

/**
 * Returns time when event was started. If event was not started yet, throws
 * exception.
 *
 * @return {Number} event start time.
 * @throws {qmonix.exceptions.IllegalEventStateException} exception, if
 *	event was already started.
 */
qmonix.TimingEvent.prototype.getTimeArised = function()
{
	var retval = qmonix.STimeInterval.UNINITIALIZED_TIME;

	if (this.state == this.State.INITIAL)
	{
		var msg = "Event was not started yet.";
		throw new this.exceptions.IllegalEventStateException(msg);
	}

	if (this.timeIntervals.length > 0)
	{
		retval = this.timeIntervals[0].getStart();
	}
	else
	{
		retval = this.lastTimeInterval.getStart();
	}

	return retval;
};


/**
 * Starts tracking timing event. Sets event start time to method invocation
 * time. If timing event was already started, exception will be thrown.
 *
 * @throws {qmonix.exceptions.IllegalEventStateException} exception, if
 *	event was already started.
 */
qmonix.TimingEvent.prototype.start = function()
{
	if (this.state == this.State.STARTED)
	{
		var msg = "Event was already started.";
		throw new this.exceptions.IllegalEventStateException(msg);
	}

	var timeNow = this.utils.Utils.getUnixTime();
	this.lastTimeInterval = new qmonix.TimeInterval(timeNow);
	this.state = this.State.STARTED;
};


/**
 * Stops a timing event and passes it's info to the event dispatcher. Uses the
 * same event dispatcher that {@link qmonix.Tracker} does. Timing event
 * stop time is the same to this method invocation time. If event was paused
 * event stop time is the same as pause time.
 *
 * @throws {qmonix.exceptions.IllegalEventStateException} exception, if
 * event was not started.
 */
qmonix.TimingEvent.prototype.fire = function()
{
	if ((this.state != this.State.STARTED) &&
		(this.state != this.State.PAUSED))
	{
		var msg = "Event was not started";
		throw new this.exception.IllegalEventStateException(msg);
	}

	/* if event was started or resumed, meaning it was not paused */
	if (this.state == this.State.STARTED)
	{
		var timeNow = this.utils.Utils.getUnixTime();
		this.lastTimeInterval.setStop(timeNow);
		this.timeIntervals.push(this.lastTimeInterval);
	}

	this.state = this.State.FIRED;
	qmonix.Tracker.getDispatcher().submit(this);
};

/**
 * Pauses event tracking. If event was not started or was already paused,
 * throws exception. Saves time interval, where start is when event was
 * started or resumed anb stop is the time when this method is invoked.
 *
 * @throws {qmonix.exceptions.IllegalEventStateException} exception, if
 * event was not started or was already paused.
 */
qmonix.TimingEvent.prototype.pause = function()
{
	if (this.state != this.State.STARTED)
	{
		var msg = "Event was not started or resumed";
		throw new this.exception.IllegalEventStateException(msg);
	}

	var timeNow = this.utils.Utils.getUnixTime();
	this.lastTimeInterval.setStop(timeNow);
	this.timeIntervals.push(this.lastTimeInterval);

	this.state = this.State.PAUSED;
};

/**
 * Resumes event tracking which was paused. If event was not paused, throws
 * exception.
 *
 * @throws {qmonix.exceptions.IllegalEventStateException} exception, if
 * event was not started or paused.
 */
qmonix.TimingEvent.prototype.resume = function()
{
	if (this.state != this.State.PAUSED)
	{
		var msg = "Event was not paused";
		throw new this.exceptions.IllegalEventStateException(msg);
	}

	var timeNow = this.utils.Utils.getUnixTime();
	this.lastTimeInterval = new qmonix.TimeInterval(timeNow);

	this.state = this.State.STARTED;
};

/**
 * Serializes event to JSON object which is ready to be encoded to event
 * message. Event tag name and time intervals are used. If event was not
 * started yet, throws exception.
 *
 * @return event encoded in JSON format.
 * @throws {qmonix.exceptions.IllegalEventStateException} exception, if
 *	event was never started.
 */
qmonix.TimingEvent.prototype.toJson = function()
{
	if (this.state == this.State.INITIAL)
	{
		var msg = "Event was not started yet.";
		throw new this.exceptions.IllegalEventStateException(msg);
	}

	var timeLength = this.sumTimeIntervals();
	this.setVolume(timeLength);
	var json = qmonix.VolumeEvent.prototype.toJson.call(this);

	return json;
};


/**
 * Traverses all event time intervals and sums the total amount of time that
 * event lasted.
 *
 * @private
 * @return {Number} total continuous event time.
 */
qmonix.TimingEvent.prototype.sumTimeIntervals = function()
{
	var retval = 0;

	for (var i = 0; i < this.timeIntervals.length; i++)
	{
		retval += this.timeIntervals[i].size();
	}

	return retval;
};


/* export symbols */
qmonix['TimingEvent'] = qmonix.TimingEvent;
qmonix.TimingEvent.prototype['getTimeArised'] =
	qmonix.TimingEvent.prototype.getTimeArised;
qmonix.TimingEvent.prototype['toJson'] =
	qmonix.TimingEvent.prototype.toJson;
qmonix.TimingEvent.prototype['start'] =
	qmonix.TimingEvent.prototype.start;
qmonix.TimingEvent.prototype['fire'] =
	qmonix.TimingEvent.prototype.fire;
qmonix.TimingEvent.prototype['pause'] =
	qmonix.TimingEvent.prototype.pause;
qmonix.TimingEvent.prototype['resume'] =
	qmonix.TimingEvent.prototype.resume;

