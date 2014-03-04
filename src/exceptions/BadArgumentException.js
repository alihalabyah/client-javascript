/**
 * Constructs new exception object with a specified exception message.
 *
 * @param {String} msg human readable exception message.
 *
 * @constructor
 * @augments qmonix.exceptions.Exception
 *
 * @class
 * Exception is thrown when bad argument is provided to the function.
 * <p>
 * Exception constructor accepts error message string parameter which later
 * can be retrieved with
 * {@link qmonix.exceptions.Exception.getMessage getMessage}.
 */

qmonix.exceptions.BadArgumentException = function(msg)
{
	this.name = "BadArgumentException";
	this.msg = msg;
}

qmonix.exceptions.BadArgumentException.prototype =
	new qmonix.exceptions.Exception(this.msg);

/* export symbols */
qmonix.exceptions['BadArgumentException'] =
	qmonix.exceptions.BadArgumentException;
