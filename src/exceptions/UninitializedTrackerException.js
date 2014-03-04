/**
 * Constructs new exception object with a specified exception message.
 *
 * @param {String} msg human readable exception message.
 *
 * @constructor
 * @augments qmonix.exceptions.Exception
 *
 * @class
 * Exception that is thrown when performing any operations before
 * {@link qmonix.Tracker} was initialized. E.g. one is trying to
 * {@link qmonix.Tracker.fire fire} and event before
 * {@link qmonix.Tracker.init init} was
 * invoked.
 * <p>
 * Exception constructor accepts error message string parameter which later
 * can be retrieved with
 * {@link qmonix.exceptions.Exception.getMessage getMessage}.
 *
 * @see qmonix.Tracker
 */
qmonix.exceptions.UninitializedTrackerException = function(msg)
{
	this.name = 'UninitializedTrackerException';
	this.msg = msg;
}

qmonix.exceptions.UninitializedTrackerException.prototype =
	new qmonix.exceptions.Exception(this.msg);

/* export symbols */
qmonix.exceptions['UninitializedTrackerException'] =
	qmonix.exceptions.UninitializedTrackerException;
