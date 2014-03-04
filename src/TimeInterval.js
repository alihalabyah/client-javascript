/**
 * Constructs time interval with specified start and stop time values.
 *
 * @param {Number} start	time interval start time.
 * @param {Number} stop		time interval stop time.
 * @throws {qmonix.exceptions.TimeIntervalException} if time interval
 * 	stop stamp is bigger than start stamp.
 *
 * @constructor
 * @ignore
 *
 * @class
 * This class deals with time interval which has start and stop time stamps.
 * Time stamps that were not set are called uninitialized. They are marked
 * with a constant {@link qmonix.TimeInterval.UNINITIALIZED_TIME}.
 */
qmonix.TimeInterval = function(start, stop)
{
	/**
	 * @ignore
	 * @constant
	 * @type {Number}
	 * @default -1
	 */
	this.UNINITIALIZED_TIME = -1;

	this.exceptions = qmonix.exceptions;

	this.start = typeof start !== 'undefined' ? start :
		this.UNINITIALIZED_TIME;
	this.stop = typeof stop !== 'undefined' ? stop :
		this.UNINITIALIZED_TIME;

	if ((this.stop != this.UNINITIALIZED_TIME) && (this.stop < this.start))
	{
		var msg = "time interval stop stamp is bigger than start stamp";
		throw new this.exceptions.TimeIntervalException(msg);
	}
}

/**
 * @ignore
 * @return {Number} time interval start.
 */
qmonix.TimeInterval.prototype.getStart = function()
{
	return this.start;
};

/**
 * Calculates time interval length when start point is included and stop
 * point is not. E.g. time interval - [15-26); size = 26 - 15 = 12.
 *
 * @ignore
 *
 * @return {Number} time interval size.
 * @throws {qmonix.exceptions.TimeIntervalException} exception, if one or
 * 	both of time stamps were not set.
 */
qmonix.TimeInterval.prototype.size = function ()
{
	if ((this.stop == this.UNINITIALIZED_TIME) ||
		(this.start == this.UNINITIALIZED_TIME))
	{
		var msg = "one of time interval time stamps was not initialized";
		throw new this.exceptions.TimeIntervalException(msg);
	}

	if ((this.stop != this.UNINITIALIZED_TIME) && (this.stop < this.start))
	{
		var msg = "time interval stop stamp is bigger than start stamp";
		throw new this.exceptions.TimeIntervalException(msg);
	}

	return this.stop - this.start;
}

/**
 * Sets time interval stop stamp.
 *
 * @ignore
 *
 * @param {Number} stop	time interval stop stamp.
 * @throws {qmonix.exceptions.TimeIntervalException} exception, if time
 * 	interval stop stamp is bigger than start stamp.
 */
qmonix.TimeInterval.prototype.setStop = function(stop)
{
	if (stop < this.start)
	{
		var msg = "time interval stop stamp is bigger than start stamp";
		throw new this.exceptions.TimeIntervalException(msg);
	}

	this.stop = stop;
};

/* static TimeInterval object used to get UNINITIALIZED_TIME constant */
qmonix.STimeInterval = new qmonix.TimeInterval();

