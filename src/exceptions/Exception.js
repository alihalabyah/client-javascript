/**
 * Constructs new exception object with a specified exception message.
 *
 * @param {String} msg human readable exception message.
 * @constructor
 *
 * @class
 * General exception class. Every class that extends this class should set
 * a variable {@link qmonix.exceptions.Exception.name name} which
 * indicates exception name. It is used in
 * {@link qmonix.exceptions.Exception.toString toString} method to
 * indicate exception type.
 */
qmonix.exceptions.Exception = function(msg)
{
	/**
	 * Exception class name.
	 * @type {String}
	 * @protected
	 **/
	this.name = 'Exception';
	this.msg = msg;
}

/**
 * Returns exception message.
 *
 * @return {String} exception message.
 */
qmonix.exceptions.Exception.prototype.getMessage = function()
{
	return this.msg;
}

/**
 * Constructs exception describing string.
 *
 * @return {String} string that describes exception.
 */
qmonix.exceptions.Exception.prototype.toString = function()
{
	return this.name + ": " + this.msg;
}

/* export symbols */
qmonix.exceptions['Exception'] = qmonix.exceptions.Exception;
qmonix.exceptions.Exception.prototype['getMessage'] =
	qmonix.exceptions.Exception.prototype.getMessage;
qmonix.exceptions.Exception.prototype['toString'] =
	qmonix.exceptions.Exception.prototype.toString;

