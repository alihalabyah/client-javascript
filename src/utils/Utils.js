/**
 * Constructor is not used. This is a global object that has static methods.
 *
 * @constructor
 * @ignore
 *
 * @class
 * This class has some static members that are often used.
 */
qmonix.utils.Utils = new function()
{
	/**
	 * Returns current time in Unix time format. It is the number of
	 * seconds that have elapsed since midnight Coordinated Universal Time
	 * (UTC), 1 January 1970.
	 *
	 * @ignore
	 *
	 * @return {Number} Unix time.
	 */
	this.getUnixTime = function()
	{
		return Math.round(new Date().getTime() / 1000);
	}
}
