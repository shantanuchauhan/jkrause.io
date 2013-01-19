--- 
layout: post
group: blog
title: "[Update - Part 1] Logging Flex 2 applications with Firebug and ThunderBolt using the Flex 2 Logging Framework"
tags: 
- Flex
- Open Source
- ThunderBolt
status: publish
type: post
published: true
meta: 
  related_id: "40,29,27"
  _edit_last: "2"
---
Today I have updated the [ThunderBolt](http://code.google.com/p/flash-thunderbolt/) AS 3 package for logging Flex 2 applications with [Firebug](http://www.getfirebug.com/) using the Flex 2 Logging Framework. For this reason I have added a common way for using log levels as well - you'll get more information about it on my next blog entry next week ;-) .

However, ThunderBolt includes now a custom target class called [ThunderBoltTarget](http://flash-thunderbolt.googlecode.com/svn/trunk/as3/source/org/osflash/thunderbolt/ThunderBoltTarget.as) extending the Flex 2 [AbstractTarget class](http://livedocs.adobe.com/flex/2/langref/mx/logging/AbstractTarget.html) for using default behaviors and properties of the Flex 2 Logging Framework such as [filters](http://livedocs.adobe.com/flex/2/langref/mx/logging/AbstractTarget.html#filters) or common [log levels](http://livedocs.adobe.com/flex/2/langref/mx/logging/AbstractTarget.html#level). For more information about custom targets check out the Flex 2 LiveDocs: "[Using the Logging API](http://livedocs.adobe.com/flex/2/docs/wwhelp/wwhimpl/js/html/wwhelp.htm?href=00001533.html)"

<!--more-->

## Example

{% swfobject /blog/uploads/2007/06/ThunderBoltTargetExample.swf width:100% height:220px bgcolor:#000000 menu:false %}
<p>To see this content latest <a href='http://www.adobe.com/go/getflashplayer'>Flash Player Plugin</a> is required.</p>
{% endswfobject %}

## Using ThunderBoltTarget

1) Create an instance of ThunderBoltTarget

{% highlight actionscript %}
_target = new ThunderBoltTarget();
{% endhighlight %}

2) Optionally you can hide the output of time, log levels and category...
{% highlight actionscript linenos %}
_target.includeTime = false;
_target.includeLevel = false;
_target.includeCategory = false;
{% endhighlight %}

3) ...or filter the message using wildcards, e.g. only messages for the classes in the de.websector.* package.
{% highlight actionscript %}
_target.filters = ["de.websector.*"];
{% endhighlight %}

4) Add the ThunderBoltTarget as a custom target for the Flex Log instance
{% highlight actionscript %}
Log.addTarget(_target);
{% endhighlight %}

5) Call the Flex Log instance to send an info message to ThunderBolt. The _getLogger()_ method defines a specified category, which describes an ID for mapping log messages as described above via __target.filters_
{% highlight actionscript %}
Log.getLogger("de.websector.playground.ThunderBoltTargetExample").info("Just an info message.");
{% endhighlight %}

6) Flex Logging Framework supports logging of multiple objects using flags such as {0}, {1}, etc. Note: The outputs of these objects are only Strings, not a complex hierarchy of all properties and methods.
{% highlight actionscript %}
Log.getLogger("de.websector.playground.ThunderBoltTargetExample").error("Calling two objects, a number named myNumber and a array called myArray: {0}, {1}", myNumber, myArray);
{% endhighlight %}

7) All code of the example above.
{% highlight mxml linenos %}
<?xml version="1.0" encoding="utf-8"?>
<mx:Application xmlns:mx="http://www.adobe.com/2006/mxml"
	initialize="initializeHandler( )">

	<mx:Script>
        <![CDATA[
        	import org.osflash.thunderbolt.Logger;
            import flash.events.Event;

            private function traceToFirebug(event:Event):void
            {
				var myNumber: int = 5;
				var myString: String = "Lorem ipsum";
				var myArray: Array = ["firstValue",{x: 100, y: 200}, "secondValue"];

				var label: String = event.target.label;

				switch (label)
				{
					case "info":
						Log.getLogger("de.websector.playground.ThunderBoltTargetExample").info("Just an info message.");
					break;
					case "warn":
						Log.getLogger("de.websector.playground.ThunderBoltTargetExample").warn("Here is the value of the String named myString: {0}", myString);
					break;
					case "error":
						Log.getLogger("de.websector.playground.ThunderBoltTargetExample").error("Calling two objects, a number myNumber and a nested array called myArray: {0}, {1}", myNumber, myArray);
					break;
					case "debug":
						Log.getLogger("de.websector.playground.ThunderBoltTargetExample").debug("Just a info message.");
					break;
					default:

				}
            }

            import mx.logging.Log;
            import org.osflash.thunderbolt.ThunderBoltTarget;

            private var _target: ThunderBoltTarget;

            private function initializeHandler( ):void
            {
                _target = new ThunderBoltTarget();
				/*
				You can disable the time, level or category as follow
	            _target.includeTime = false;
	            _target.includeLevel = false;
	            _target.includeCategory = false;
	            */
                _target.filters = ["de.websector.playground.ThunderBoltTargetExample"];
                Log.addTarget(_target);
            }


            private function getFireBug( ):void
            {
             	var url:URLRequest = new URLRequest( "http://www.getfirebug.com/" );
                navigateToURL( url );
            }

      ]]>
    </mx:Script>
	<mx:Style source="css/logger.css"/>
    <mx:Text htmlText="Using ThunderBoltTarget based on the Flex 2.0 Logging Framework"  paddingBottom="15" />
    <mx:HBox horizontalGap="10">
		 <mx:Button label="info"
					click="traceToFirebug(event);" id="infoButton" width="100" height="50"/>
		 <mx:Button label="warn"
					click="traceToFirebug(event);" id="warnButton" width="100" height="50"/>
		 <mx:Button label="error"
					click="traceToFirebug(event);" id="errorButton" width="100" height="50"/>
		 <mx:Button label="debug"
					click="traceToFirebug(event);" id="logButton" width="100" height="50"/>
    </mx:HBox>
	<mx:Text htmlText="Press F12 to open Firebug"
			paddingTop="15" paddingBottom="5"/>
	<mx:LinkButton label="(Who the fuck is Firebug?)" id="getFirebug" click="getFireBug();" />
</mx:Application>
{% endhighlight %}

## Source

You'll find [the latest source](http://flash-thunderbolt.googlecode.com/svn/trunk/as3/) of [ThunderBolt](http://code.google.com/p/flash-thunderbolt/), its custom target called [ThunderBoldTarget.as](http://flash-thunderbolt.googlecode.com/svn/trunk/as3/source/org/osflash/thunderbolt/ThunderBoltTarget.as) and [all examples](http://flash-thunderbolt.googlecode.com/svn/trunk/as3/example/) on Google Code or [check it out](http://code.google.com/p/flash-thunderbolt/source) via SVN.