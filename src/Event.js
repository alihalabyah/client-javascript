/**
 * Constructs new single event object with a specified tag name.
 *
 * @param {String} tag event tag name.
 *
 * @constructor
 *
 * @class
 * Single event class that holds it's tag name and a single value - it's
 * fire time. Every different logic event must have a unique tag name. If there
 * are several different event objects with the same tags, their information
 * will be combined. Event tag name might be retrieved by
 * {@link qmonix.Event.getTag getTag}.
 * {@link qmonix.Event.getTimeArised getTimeArised} returns event fire time.
 * <p>
 * {@link qmonix.Event.fire fire} captures event fire time which cannot
 * be changed in the future. After firing an event, it becomes unusable. If
 * one tries to invoke {@link qmonix.Event.fire fire} more than once,
 * the exception will be thrown.
 * <p>
 * {@link qmonix.Event.toJson toJson} encodes event information to JSON
 * object.
 *
 * @see qmonix.EventDispatcher
 */
qmonix.Event = function(tag)
{
	this.State = {INITIAL:1, FIRED:2};

	this.exceptions = qmonix.exceptions;
	this.utils = qmonix.utils;

	this.tag = tag;
	this.timeArised = qmonix.STimeInterval.UNINITIALIZED_TIME;
	this.state = this.State.INITIAL;
}

/**
 * @return {String} event tag name.
 */
qmonix.Event.prototype.getTag = function()
{
	return this.tag;
};

/**
 * Returns time when event was fired.
 *
 * @return {Number} event fire time.
 */
qmonix.Event.prototype.getTimeArised = function()
{
	return this.timeArised;
};

/**
 * Captures single event fire time. After this method is called event must be
 * in unusable state. Meaning it should not be fired anymore or change it's
 * state in any way. Otherwise the exception should be thrown.
 *
 * @throws {qmonix.exceptions.IllegalEventStateException} exception, if
 * one tries to fire event multiple times.
 */
qmonix.Event.prototype.fire = function()
{
	if (this.state != this.State.INITIAL)
	{
		var msg = "event cannot be fired more than once";
		throw new this.exception.IllegalEventStateException(msg);
	}

	this.timeArised = this.utils.Utils.getUnixTime();
	this.state = this.State.FIRED;

	qmonix.Tracker.getDispatcher().submit(this);
};

/**
 * Serializes event to JSON object which is ready to be encoded to event
 * message. Event fire time and tag name are used.
 *
 * @return {Object} event encoded in JSON format.
 * @throws {qmonix.exceptions.IllegalEventStateException} exception, if
 *	event was never fired.
 */
qmonix.Event.prototype.toJson = function()
{
	if (this.state == this.State.INITIAL)
	{
		var msg = "Event was not fired yet.";
		throw new this.exceptions.IllegalEventStateException(msg);
	}

	var json =
	{
		"tag" : String(this.tag),
		"whenArised" : this.getTimeArised()
	}

	return json;
};

/* export symbols */
qmonix['Event'] = qmonix.Event;
qmonix.Event.prototype['getTag'] = qmonix.Event.prototype.getTag;
qmonix.Event.prototype['getTimeArised'] =
	qmonix.Event.prototype.getTimeArised;
qmonix.Event.prototype['fire'] = qmonix.Event.prototype.fire;
qmonix.Event.prototype['toJson'] = qmonix.Event.prototype.toJson;

