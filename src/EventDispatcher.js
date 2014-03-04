/**
 * This is interface that every event dispatcher must match. Constructor is not
 * used.
 * @constructor
 *
 * @class
 * Event dispatcher interface which is responsible for dispatching events to
 * the server. Exact behaviour depends on specific implementation, which can
 * store event locally or send them to the server.
 * <p>
 * Dispatcher interface has a single method
 * {@link qmonix.EventDispatcher.dispatch submit} which accepts event
 * object for further processing.
 *
 * @see qmonix.Event
 */
qmonix.EventDispatcher = function()
{
}

/**
 * Passes a specified event object to the dispatcher.
 *
 * @param {qmonix.Event} e event object to dispatch.
 */
qmonix.EventDispatcher.prototype.submit = function (e){}

