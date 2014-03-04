/**
 * Constructs new {@link qmonix.EventMessage} object.
 *
 * @constructor
 * @ignore
 *
 * @class
 * Holds all information that is necessary to send a valid event message to
 * the Server. It has a predefined client protocol version
 * {@link qmonix.EventMessage.PROTOCOL_VERSION}.
 * <p>
 * {@link qmonix.EventMessage} collects event objects with a method
 * {@link qmonix.EventMessage.addEvent addEvent} and is able to encode
 * JSON formated legal event message with {@link EventMessage.toJson toJson}.
 *
 * @see qmonix.Event
 */
qmonix.EventMessage = function()
{
	/**
	 * @ignore
	 * @constant
	 * @type {String}
	 * @default
	 */
	this.PROTOCOL_VERSION = "1.0";

	this.exceptions = qmonix.exceptions;

	this.eventList = [];
}

/**
 * Adds new event to the event list.
 *
 * @ignore
 *
 * @param {qmonix.Event} event event object to add to the list.
 */
qmonix.EventMessage.prototype.addEvent = function(e)
{
	if (!(e instanceof qmonix.Event))
	{
		var msg = "provided argument is not Event object";
		throw new this.exceptions.BadArgumentException(msg);
	}

	this.eventList.push(e);
}

/**
 * Encodes event message to JSON string which meets Server protocol. Sets
 * 'whenSent' property to the time when this function is being executed.
 *
 * @ignore
 *
 * @return {Object} event message in JSON format.
 */
qmonix.EventMessage.prototype.toJson = function()
{
	var events = [];
	for (var i = 0; i < this.eventList.length; i++)
	{
		events.push(this.eventList[i].toJson());
	}

	var now = qmonix.utils.Utils.getUnixTime();

	var json =
	{
		"version" : this.PROTOCOL_VERSION,
		"events" : events,
		"whenSent" : now
	}

	return JSON.stringify(json);
}

