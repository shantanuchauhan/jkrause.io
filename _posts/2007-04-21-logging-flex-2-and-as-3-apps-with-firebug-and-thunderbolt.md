--- 
layout: post
group: blog
title: Logging Flex 2 and AS 3 apps with Firebug and ThunderBolt
tags: 
- Debugging
- Flash
- Flex
- Open Source
- ThunderBolt
status: publish
type: post
published: true
meta: 
  related_id: "28,29"
  _edit_last: "2"
---
A few weeks ago [Martin Kleppe](http://www.ubilabs.net) started a project on Google Code called [Flash-ThunderBolt](http://code.google.com/p/flash-thunderbolt/). The idea behind based on [Manfred Webers](http://manfred.dschini.org/) blog entry ["Make MTASC talk to Firebug"](http://manfred.dschini.org/2007/03/14/make-mtasc-talk-to-firebug/) which describes a way for logging Flash apps compiled with MTASC using Firebug.

I've already joined the Flash-Thunderbolt project for coding an AS3 version. It won't be a copy of the current AS2 package but rather another approach for using [Firebugs Console API](http://www.getfirebug.com/console.html) as simple as possible. Check it out, here are my first steps:

<!--more-->

## Example

{% swfobject /blog/uploads/2007/04/ThunderBoltAS3Example.swf width:100% height:200px bgcolor:#000000 menu:false %}
<p>To see this content latest <a href='http://www.adobe.com/go/getflashplayer'>Flash Player Plugin</a> is required.</p>
{% endswfobject %}

## Instructions

The ThunderBolt AS3 package contains only one class named `Logger.as`. It supports logging primitive types such as `Number`, `String`, `Boolean`, etc. as well as `Objects`, `Arrays` and `public properties` of all classes. Use short cuts for determing different log levels as [Zeroi](http://osflash.org/zeroi) does: "i" = info, "e" = error, "w" = warn, "d" = debug.

Here is an example:
{% highlight mxml linenos %}
<?xml version="1.0" encoding="utf-8"?>
<mx:Application xmlns:mx="http://www.adobe.com/2006/mxml">
	<mx:Script>
		<![CDATA[
			import org.osflash.thunderbolt.Logger;
			import flash.events.Event;
			private function traceToFirebug(event:Event):void
			{
				var n: int = 5;
				var s: String = "Lorem ipsum";
				var o: Object = {exampleArray: ["firstValue", "secondValue"], y: 10, exampleString: "Hello", nestedObject: {x: 100, y: 200}};
				var a: Array = ["firstValue",{x: 100, y: 200}, "secondValue"];
				var label: String = event.target.label;
				switch (label)
				{
					case "info":
						Logger.trace ("i a simple string", s);
					break;
					case "error":
						Logger.trace ("i a number typed as int", n);
					break;
					case "warn":
						Logger.trace ("e an array with a nested object: ", a);
					break;
					case "debug":
						Logger.trace ("w an object with a nested object and nested array",o);
					break;
					default:
				}
			}
	  ]]>
	</mx:Script>
	<mx:Style source="css/logger.css"/>
	<mx:Text htmlText="Press F12 to open Firebug" paddingBottom="20"/>
	<mx:HBox horizontalGap="10">
		 <mx:Button label="info"
					click="traceToFirebug(event);" id="infoButton" width="100" height="50"/>
		 <mx:Button label="error"
					click="traceToFirebug(event);" id="errorButton" width="100" height="50"/>
		 <mx:Button label="warn"
					click="traceToFirebug(event);" id="warnButton" width="100" height="50"/>
		 <mx:Button label="debug"
					click="traceToFirebug(event);" id="debugButton" width="100" height="50"/>
	</mx:HBox>
</mx:Application>
{% endhighlight %}

## Source

First of all: Feel free to check out the [latest source](http://code.google.com/p/flash-thunderbolt/source) via SVN ;-) .
{% highlight actionscript linenos %}
/**
* Logging Flex and AS3 projects with Firebug
*
* @author   Jens Krause [www.websector.de]
* @date  04/21/07
* @see	http://www.websector.de/blog/2007/04/21/logging-flex-2-and-as-3-apps-with-firebug-and-thunderbolt/
* @source   http://flash-thunderbolt.googlecode.com/svn/trunk/as3/
*
*/
package org.osflash.thunderbolt
{
	import flash.external.ExternalInterface;
	import flash.utils.describeType;
	import flash.utils.getQualifiedClassName;
	import flash.utils.getDefinitionByName;
	/**
	*
	*/
	public class Logger
	{
		public static const LOG: String = "log";
		public static const INFO: String = "info";
		public static const WARN: String = "warn";
		public static const ERROR: String = "error";
		private static const MAX_DEPTH: int = 255;
		private static var depth: int;
		private static var logLevel: String;
		/**
		 * Calls Firebugs command line API to write log information
		 *
		 * @param   msg	  log Message
		 * @param   obj	  log object
		 */
		public static function trace (msg: String = null, obj:Object = null): void
		{
			depth = 0;
			//
			// log description
			logLevel = (msg != null) ? Logger.getLogLevel(msg) : Logger.LOG;
			var txtMessage: String = (msg != null && msg.length>= 3) ? msg.slice(2) : "";
			var logMsg: String = logLevel.toUpperCase() + ": " + txtMessage;
			ExternalInterface.call("console." + logLevel, logMsg);
			//
			// log object
			if (obj) Logger.logProperties(obj);
		}
		/**
		 * Logs nested instances and properties
		 *
		 * @param   logObj	log object
		 * @param   id		short description of log object
		 */
		private static function logProperties (logObj: *, id: String = null): void
		{
			++ depth;
			var propID: String = id || "";
			if (depth <Logger.MAX_DEPTH)
			{
				var description:XML = describeType(logObj);
				var type: String = description.@name;
				if (primitiveType(type))
				{
					var msg: String = (propID.length)   ?	 "[" + type + "] " + propID + " = " + logObj
														:   "[" + type + "] " + logObj;
					ExternalInterface.call("console." + Logger.LOG, msg);
				}
				else if (type == "Object")
				{
					ExternalInterface.call("console.group", "[Object] " + propID);
					for (var element: String in logObj)
					{
					  logProperties(logObj[element], element);
					}
					ExternalInterface.call("console.groupEnd");
				}
				else if (type == "Array")
				{
					ExternalInterface.call("console.group", "[Array] " + propID);
					for (var i: int = 0; i <logObj.length; i++)
					{
					  logProperties(logObj[i]);
					}
					ExternalInterface.call("console.groupEnd");
				}
				else
				{
					var list: XMLList = description..variable;
					if (list.length())
					{
						for each(var item: XML in list)
						{
							var propItem: String = item.@name;
							var typeItem: String = item.@type;
							// var ClassReference: Class = getDefinitionByName(typeItem) as Class;
							var valueItem: * = logObj[propItem];
							logProperties(valueItem, propItem);
						}
					}
					else
					{
						logProperties(logObj, type);
					}
				}
			}
			else
			{
				ExternalInterface.call("console." + Logger.WARN, "STOP LOGGING: More than " + depth + " nested objects or properties");
			}
		}
		/**
		 * Checking for primitive types
		 *
		 * @param   type		type of object
		 * @return  isPrimitiveType  isPrimitiveType
		 *
		 */
		private static function primitiveType (type: String): Boolean
		{
			var isPrimitiveType: Boolean;
			switch (type)
			{
				case "Boolean":
					isPrimitiveType = true;
				break;
				case "void":
					isPrimitiveType = true;
				break;
				case "int":
					isPrimitiveType = true;
				break;
				case "uint":
					isPrimitiveType = true;
				break;
				case "Number":
					isPrimitiveType = true;
				break;
				case "String":
					isPrimitiveType = true;
				break;
				case "undefined":
					isPrimitiveType = true;
				break;
				case "null":
					isPrimitiveType = true;
				break;
				default:
					isPrimitiveType = false;
			}
			return isPrimitiveType;
		}
		/**
		 * Translates log keys to Firebug log levels,
		 * which based on zeroi's key mapping
		 * @see	 http://www.osflash.org/zeroi/
		 *
		 * @param   msg
		 * @return  level description
		 *
		 */
		private static function getLogLevel (msg: String): String
		{
			var firstChar: String = (msg.charAt(1) == " ") ? msg.charAt(0).toLowerCase() : "d";
			var level: String;
			switch (firstChar)
			{
				case "i":
					level = Logger.INFO;
				break;
				case "w":
					level = Logger.WARN;
				break;
				case "e":
					level = Logger.ERROR;
				break;
				case "d":
					level = Logger.LOG;
				break;
				default:
					level = Logger.LOG;
			}
			return level;
		}
	}
}
{% endhighlight %}

## Feedback

Feedback and suggestions for improvement are welcome ;-) If you'd like to join the [Flash-ThunderBolt project](http://code.google.com/p/flash-thunderbolt/) just drop [me an email](mailto:sectore@gmail.com) or feel free to post a comment.