/**
 * Constructs new exception object with a specified exception message.
 *
 * @param {String} msg human readable exception message.
 *
 * @constructor
 * @augments qmonix.exceptions.Exception
 *
 * @class
 * Exception is thrown when some operation is performed in illegal event state.
 * E.g. when timing event was started and {@link qmonix.Trackergstart start}
 * is invoked again, or when {@link Trackergpause pause} is invoked on a
 * stopped event.
 * <p>
 * Exception constructor accepts error message string parameter which later
 * can be retrieved with
 * {@link qmonix.exceptions.Exception.getMessage getMessage}.
 *
 * @see qmonix.TimingEvent
 */

qmonix.exceptions.IllegalEventStateException = function(msg)
{
	this.name = "IllegalEventStateException";
	this.msg = msg;
}

qmonix.exceptions.IllegalEventStateException.prototype =
	new qmonix.exceptions.Exception(this.msg);

/* export symbols */
qmonix.exceptions['IllegalEventStateException'] =
	qmonix.exceptions.IllegalEventStateException;
