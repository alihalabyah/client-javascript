/**
 * Constructs new volume event object with a specified tag name and volume.
 *
 * @param {String} tag event tag name.
 * @param {Number} volume event volume.
 * @throws {qmonix.exceptions.BadArgumentException} if specified volume is
 *	a negative number.
 *
 * @constructor
 * @augments qmonix.Event
 *
 * @class
 * Volume event class extends {@link qmonix.Event}. Besides tag name and time
 * when it was fired, volume event also has a volume (quantity) associated
 * associated with it. Volume is a positive integer number.
 * <ul>
 * <li>{@link qmonix.Event.getTag getTag} - returns event tag name
 * <li>{@link qmonix.Event.getTimeArised getTimeArised} - returns event
 * fire time.
 * <li>{@link qmonix.VolumeEvent.getVolume getVolume} - returns event volume.
 * <li>{@link qmonix.Event.fire fire} captures event fire time which
 * cannot be changed in the future. After firing an event, it becomes unusable.
 * If one tries to invoke {@link qmonix.VolumeEvent.fire fire} more than once,
 * the exception will be thrown.
 * <li>{@link qmonix.VolumeEvent.toJson toJson} encodes event information to
 * JSON object.
 * </ul>
 *
 * @see qmonix.Event
 * @see qmonix.Tracker
 * @see qmonix.EventDispatcher
 */
qmonix.VolumeEvent = function(tag, volume)
{
	/* super constructor */
	qmonix.Event.call(this, tag);

	if (volume < 0)
	{
		var msg = "Event volume must be positive integer number.";
		throw new this.exceptions.BadArgumentException(msg);
	}

	this.volume = volume;
}


qmonix.VolumeEvent.prototype = new qmonix.Event();


/**
 * @return {Number} event volume.
 */
qmonix.VolumeEvent.prototype.getVolume = function()
{
	return this.volume;
};


/**
 * Sets volume for event.
 *
 * @param {Number} volument event volume.
 * @throws {qmonix.exceptions.BadArgumentException} if specified volume is
 *	a negative number.
 */
qmonix.VolumeEvent.prototype.setVolume = function(volume)
{
	if (volume < 0)
	{
		var msg = "Event volume must be positive integer number.";
		throw new this.exceptions.BadArgumentException(msg);
	}

	this.volume = volume;
};


/**
 * Serializes event to JSON object which is ready to be encoded to event
 * message. Event fire time, tag name and volume are used.
 *
 * @return {Object} event encoded in JSON format.
 */
qmonix.VolumeEvent.prototype.toJson = function()
{
	if (this.state == this.State.INITIAL)
	{
		var msg = "Event was not fired yet.";
		throw new this.exceptions.IllegalEventStateException(msg);
	}

	var json = qmonix.Event.prototype.toJson.call(this);
	json["volume"] = this.volume;

	return json;
};


/* export symbols */
qmonix['VolumeEvent'] = qmonix.VolumeEvent;
qmonix.VolumeEvent.prototype['getVolume'] =
	qmonix.VolumeEvent.prototype.getVolume;
qmonix.VolumeEvent.prototype['toJson'] = qmonix.VolumeEvent.prototype.toJson;


