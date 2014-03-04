/**
 * This file defines debugging function console.log if one is not provided
 * natively by the browser.
 */

var alert_log = true;

if (typeof console === "undefined" || typeof console.log === "undefined")
{
	console = {};
	if (alert_log)
	{
		console.log = function(msg)
		{
			alert(msg);
		};
	}
	else
	{
		console.log = function() {};
	}
}
