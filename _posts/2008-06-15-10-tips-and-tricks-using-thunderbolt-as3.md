--- 
layout: post
group: blog
title: 10 tips and tricks using ThunderBolt AS3
tags: 
- AIR
- Flash
- Flex
- ThunderBolt
status: publish
type: post
published: true
meta: 
  _edit_last: "2"
---
[Almost one year ago](/blog/2007/04/21/logging-flex-2-and-as-3-apps-with-firebug-and-thunderbolt/) I started to develop a small extension called [ThunderBolt AS3](http://code.google.com/p/flash-thunderbolt/wiki/ThunderBoltAS3) for logging ActionScript 3 applications using [Firebug](http://www.getfirebug.com/) as simple as possible. Today its nice to see that the community [uses](http://www.flashcomguru.com/index.cfm/2008/6/6/thunderbolt-air) [and](http://www.flex888.com/2008/06/14/debugging-flex-with-thunderbolt.html) [supports](http://blog.digitalbackcountry.com/?p=1452) this extension as well.

For all those who not familiar with it: [ThunderBolt AS3](http://code.google.com/p/flash-thunderbolt/wiki/ThunderBoltAS3) is a lightweight logger extension for any ActionScript 3 applications based on [Flash CS3](http://www.adobe.com/products/flash/), [Flex](http://www.adobe.com/products/flex/) or [Adobe AIR](http://www.adobe.com/products/air/) using [Firebug](http://www.getfirebug.com/) or its own [ThunderBolt AS3 Console](/blog/2008/06/01/the-new-thunderbolt-as3-console-is-based-on-adobe-air/).

Here are some tips and tricks using ThunderBolt AS3:

<!--more-->

## 1) Using different log levels

ThunderBolt AS3 supports different log levels, which based on the supported levels by Firebug, such as "info", "warn", "error" or "debug". It's pretty simple to use it:

{% highlight as3 linenos %}
import org.osflash.thunderbolt.Logger;

//
// some log objects
var myNumber: int = 5;
var myString: String = "Lorem ipsum";

// INFO log level
Logger.info ("Just an info message");
//
// DEBUG log level
Logger.debug ("A debug log ", myString);
//
// WARN log level
Logger.warn ("A warn message", myNumber);
//
// ERROR log level
Logger.error ("An error log ", myString);
{% endhighlight %}

### Screen shot using Firebug

![](http://www.websector.de/blog/wp-content/uploads/2008/06/15/loglevels.png)

### Screen shot using ThunderBolt AS3 Console

![](http://www.websector.de/blog/wp-content/uploads/2008/06/15/loglevels2.png)

## 2) Logging one or more objects at once

ThunderBolt AS3 logs more than one objects at once. It could be primitive types (`int`, `uint`, `Number`, `Boolean`, ...) or more complex data such as an instance of any classes or nested objects. Here an example:

{% highlight as3 linenos %}
import org.osflash.thunderbolt.Logger;

//
// some log objects
var myNumber: int = 5;
var myString: String = "Lorem ipsum";

var myObject: Object = {	exampleArray: ["firstValue", "secondValue"],
							y: 10,
							exampleString: "Hello",
							nestedObject: {	x: 100,
											y: 200}
						};

// Logging an object with nested items
Logger.info ("Logging an object with nested items ", myObject);
//
// Logging more objects at once
Logger.info ("Logging more objects at once ", myString, myNumber, myObject);
{% endhighlight %}

### Screen shot using Firebug

![](http://www.websector.de/blog/wp-content/uploads/2008/06/15/objects.png)

### Screen shot using ThunderBolt AS3 Console

![](http://www.websector.de/blog/wp-content/uploads/2008/06/15/objects2.png)

## 3) Using the Flex Logging API

ThunderBolt AS3 supports the [Flex Logging API](http://livedocs.adobe.com/flex/3/html/logging_09.html#178687) using its own log target called `ThunderBoltTarget`. To use it you will need to use and import the [ThunderBoltTarget.as](http://code.google.com/p/flash-thunderbolt/source/browse/trunk/as3/source/org/osflash/thunderbolt/ThunderBoltTarget.as) as well:

{% highlight as3 linenos %}
import mx.logging.Log;
import org.osflash.thunderbolt.ThunderBoltTarget;

// init ThunderBoltTarget
_target = new ThunderBoltTarget();

/*
 You can disable the time, level or category as well
 _target.includeTime = false;
 _target.includeLevel = false;
 _target.includeCategory = false;
*/

_target.filters = ["de.websector.playground.ThunderBoltTargetExample"];
Log.addTarget(_target);

// start logging
Log.getLogger("de.websector.playground.ThunderBoltTargetExample").info("Just an info message.");
{% endhighlight %}

### Screen shot using Firebug

![](http://www.websector.de/blog/wp-content/uploads/2008/06/15/flexapi.png)

### Screen shot using ThunderBolt AS3 Console

![](http://www.websector.de/blog/wp-content/uploads/2008/06/15/flexapi2.png)

## 4) Stop and hide logging

To release your project you might to disable all logging data. Then put the following line into your code.

{% highlight as3 %}
Logger.hide = true;
{% endhighlight %}

## 5) Show a memory snapshot

Make a memory snapshot whenever you want:

{% highlight as3 %}
Logger.memorySnapshot();
{% endhighlight %}

## 6) Show or hide a time stamp

Lets make a time stamp. The default value is "true". To hide the time stamp use this:

{% highlight as3 %}
Logger.includeTime = false;
{% endhighlight %}

## 7) Using the new ThunderBolt AS3 <strike>v.2.1beta</strike> v.2.0 and its Console

[The new version of ThunderBolt AS3](http://code.google.com/p/flash-thunderbolt/downloads/list) (<strike>v.2.1beta</strike> v.2.0) detects either Firebug is installed or not. If not, then it uses the well known `trace()` method to log all data into "flashlog.txt". You can enforce this process using:

{% highlight as3 %}
Logger.console = true;
{% endhighlight %}

To show all information in a well defined structure I'd recommend to use the new [ThunderBolt AS3 Console](http://code.google.com/p/flash-thunderbolt/wiki/ThunderBoltAS3Console). It's a handy tool to log any AIR application as well ;-)

## 8) Using the ThunderBolt AS3 Console for logging ActionScript 1 or 2 projects

As described above [ThunderBolt AS3 Console](http://code.google.com/p/flash-thunderbolt/wiki/ThunderBoltAS3Console) follows a simple principle: It reads just all information logged by the ThunderBolt AS3 Logger (<strike>v.2.1beta</strike> v.2.0) into "flashlog.txt" and shows it in a hierarchal order based on different log levels.
That means you can use ThunderBolt AS3 Console for logging any AS 1 or 2 projects too ;-) . Just call a `trace()` method as follows. Note the prefixes named "info", "error", "warn" or "debug" followed by a whitespace at the beginning:

{% highlight as3 linenos %}
//
// tracing an info log level
trace ("info Here is an info message to display using ThunderBolt AS3 Console");
//
// tracing an error log level
var myString: String = "hello console";
trace ("error Here is an error message" + myString);
//
// tracing an debug log level
trace ("debug Here is a debug message" + myString);
//
// tracing a warn log level
trace ("warn Here is a warn message");
{% endhighlight %}


### Screen shot using ThunderBolt AS3 Console

![](http://www.websector.de/blog/wp-content/uploads/2008/06/15/trace.png)

## 9) Any issues with the Flash Player security sandbox using Firebug?

If you have any security issues with the Flash Player security sandbox using ThunderBolt AS3 and Firebug set within your HTML template the value of the parameter named "allowScriptAccess" to "always". For more information check Adobes Flex 3 Help: ["About ExternalInterface API security in Flex"](http://livedocs.adobe.com/flex/3/html/passingarguments_6.html)

## 10) Issues using ThunderBolt AS3 Console on Windows?

What a pretty sh...y thing: The ThunderBolt AS3 Console is currently available for OS X only. There are some issues using an opened AIR app and "flashlog.txt" at the same time on Windows. Check out [this entry at Adobes AIR forum](http://www.adobe.com/cfusion/webforums/forum/messageview.cfm?forumid=75&catid=697&amp;threadid=1368880) for more information. Hoping that Adobe will fix this issue in the future. So long, sorry for all the Windows user out there :-( .
BTW: Feel free to post [here](http://www.adobe.com/cfusion/webforums/forum/messageview.cfm?forumid=75&catid=697&amp;threadid=1368880) your request to Adobes AIR team as well ;-)

## Open source!

ThunderBolt AS3 and its console is open source! [Grab the source](http://code.google.com/p/flash-thunderbolt/source/checkout), change and adapt it. Or do whatever you want ;-)

Happy logging!