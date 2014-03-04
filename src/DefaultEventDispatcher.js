/**
 * Constructs new default event dispatcher with a specified Server address and
 * port number.
 *
 * @param {String} serverUrl Server url.
 *
 * @constructor
 * @augments qmonix.EventDispatcher
 * @this {qmonix.DefaultEventDispatcher}
 *
 * @class
 * Default event dispatcher which collects events and sends them to the
 * Server. Server address name and port are specified in constructor.
 * <p>
 * Server address must conform to generic URL syntax (RFC3986). E.g.
 * http://example.com:8081.
 * <p>
 * Before sending events out
 * {@link qmonix.DefaultEventDispatcher DefaultEventDispatcher}
 * encodes current time to the message that is going to bet sent to the server.
 * Using this time stamp server is able to ajust collected events time
 * with server time. All events are eventually registered using server time.
 * <p>
 * {@link qmonix.DefaultEventDispatcher.submit submit} inserts new event
 * to the collected event list. It accepts {@link qmonix.Event Event}
 * object which describes specific event.
 * {@link qmonix.DefaultEventDispatcher.submit sendToServer} sends
 * those collected events to the Server and clears event list.
 * {@link qmonix.DefaultEventDispatcher.dropEvents dropEvents} clears
 * collected event list without dispatching them to the Server.
 * <p>
 *
 * @see qmonix.EventDispatcher
 * @see qmonix.Event
 */
qmonix.DefaultEventDispatcher = function(serverUrl)
{
	this.exceptions = qmonix.exceptions;

	this.eventMessage = new qmonix.EventMessage();
	this.serverUrl = serverUrl;

	this.onError = function() {};
	this.onSuccess = function() {};
};

qmonix.DefaultEventDispatcher.prototype = new qmonix.EventDispatcher();

/**
 * {@link DefaultEventDispatcher} asynchronously sends collected events to
 * the server. This function sets a callback function that is called whenever
 * dispatcher fails to send data to the server.
 *
 * @param {function} callback function that will be called when dispatcher
 *	fails to send messages to the server.
 */
qmonix.DefaultEventDispatcher.prototype.setOnError = function(callback)
{
	this.onError = callback;
};

/**
 * {@link DefaultEventDispatcher} asynchronously sends collected events to
 * the server. This function sets a callback function that is called after
 * dispatcher successfully sends data to the server.
 *
 * @param {function} callback function that will be called after dispatcher
 *	successfully sends messages to the server.
 */
qmonix.DefaultEventDispatcher.prototype.setOnSuccess = function(callback)
{
	this.onSuccess = callback;
};

/**
 * Adds event to the collected event list. Does not send events to the server.
 * To send collected events use
 * {@link qmonix.DefaultEventDispatcher.submit submit}.
 *
 * @param {qmonix.Event} e event object.
 * @throws {qmonix.exceptions.BadArgumentException} exception, if
 * 	specified parameter is not {@link qmonix.Event} object.
 */
qmonix.DefaultEventDispatcher.prototype.submit = function(e)
{
	if (!(e instanceof qmonix.Event))
	{
		var msg = "Provided argument is not Event object";
		throw new this.exceptions.BadArgumentException(msg);
	}

	this.eventMessage.addEvent(e);
};

/**
 * Passed to {qmonix.DefaultEventDispatcher.sendToServer sendToServer} method
 * to send XMLHttpRequest asynchronously.
 *
 * @const
 * @type {boolean}
 */
qmonix.DefaultEventDispatcher.SEND_ASYNC = true;

/**
 * Passed to {qmonix.DefaultEventDispatcher.sendToServer sendToServer} method
 * to send XMLHttpRequest synchronously.
 *
 * @const
 * @type {boolean}
 */
qmonix.DefaultEventDispatcher.SEND_SYNC = false;

/**
 * Sends all events to the Server, clears dispatcher event list. On
 * failure calls onError callback. In such case events are not cleared, but one
 * can do it manually with
 * {@link qmonix.DefaultEventDispatcher.dropEvents dropEvents}.
 *
 * @param {boolean} async true if events are sent asynchronous, false -
 *	otherwise. If not specified, default is true - events are sent
 *	asynchronous.
 */
qmonix.DefaultEventDispatcher.prototype.sendToServer = function(async)
{
	async = typeof async !== "undefined" ? async : true;

	var eventMsg = this.eventMessage.toJson();

	var http = undefined;
	if (window.XMLHttpRequest)
	{
		http = new XMLHttpRequest();
	}
	else
	{
		/* IE6 and 5 support */
		http = new ActiveXObject("Microsoft.XMLHTTP");
	}

	var me = this;
	http.onreadystatechange = function()
	{
		if (http.readyState == 4)
		{
			if (http.status == 200)
			{
				me.dropEvents();
				me.onSuccess();
			}
			else
			{
				me.onError();
			}
		}
	}

	http.open("POST", this.serverUrl, async);
	http.send(eventMsg);
};

/**
 * Clears collected event list. In no case collected events are sent to the
 * server. So {@link qmonix.DefaultEventDispatcher.submit submit} is not
 * invoked.
 */
qmonix.DefaultEventDispatcher.prototype.dropEvents = function()
{
	this.eventMessage = new qmonix.EventMessage();
};

/* export symbols */
qmonix['DefaultEventDispatcher'] = qmonix.DefaultEventDispatcher;
qmonix.DefaultEventDispatcher.prototype['submit'] =
	qmonix.DefaultEventDispatcher.prototype.submit;
qmonix.DefaultEventDispatcher.prototype['sendToServer'] =
	qmonix.DefaultEventDispatcher.prototype.sendToServer;
qmonix.DefaultEventDispatcher.prototype['setOnError'] =
	qmonix.DefaultEventDispatcher.prototype.setOnError;
qmonix.DefaultEventDispatcher.prototype['setOnSuccess'] =
	qmonix.DefaultEventDispatcher.prototype.setOnSuccess;
