/**
 * Constructs new exception object with a specified exception message.
 *
 * @param {String} msg human readable exception message.
 *
 * @constructor
 * @augments qmonix.exceptions.Exception
 * @private
 *
 * @class
 * Excetion that is thrown when performing invalid operations on
 * {@link qmonix.TimeInterval} class objects. E.g. this might be when stop
 * time stamp is lower than the start time stamp.
 * <p>
 * Exception constructor accepts error message string parameter which later
 * can be retrieved with
 * {@link qmonix.exceptions.Exception.getMessage getMessage}.
 *
 * @see qmonix.TimeInterval
 */
qmonix.exceptions.TimeIntervalException = function(msg)
{
	this.name = "TimeIntervalException";
	this.msg = msg;
}

qmonix.exceptions.TimeIntervalException.prototype =
	new qmonix.exceptions.Exception(this.msg);

