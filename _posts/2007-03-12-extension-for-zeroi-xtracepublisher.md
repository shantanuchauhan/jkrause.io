--- 
layout: post
group: blog
title: "Extension for Zeroi: XTracePublisher"
tags: 
- Debugging
- Flash
- MTASC
- Open Source
- OS X
status: publish
type: post
published: true
meta: 
  related_id: "16"
  _edit_last: "2"
---
[Xtrace](http://developer.mabwebdesign.com/xtrace.html) is a popular debugger console on OS X for logging your `trace()` data outside the Flash IDE. For easier handling I decided to write an extension for [Zeroi](http://osflash.org/Zeroi) that keeps your standard `trace()` methods in your code.

<!--more-->

Here is a screen of a XTrace window receiving Zerois debug messages:

![XTrace Window](/blog/uploads/2007/03/xtrace-window.png)

## Instructions

*  Grab the latest source of Zeroi from its [Subversion Repository](http://code.google.com/p/zeroi/source). You will find there the new extension for XTrace, too.
*  Download and install [XTrace](http://developer.mabwebdesign.com/xtrace.html). For enjoying the latest features (e.g. text highlighting) it's recommended to use the [XTrace SVN Repository](http://svn.mabwebdesign.com/xtrace).
*  Download the [Zeroi example](/blog/uploads/2007/03/04/zeroiExample.zip) and follow the steps 4 up to 7 described in my previous post called ["Debugging with MTASC, Ant and Zeroi"](/blog/2007/03/04/debugging-with-mtasc-ant-and-zeroi/).
*  Add `XTracePublisher` as Zerois publisher to MTASC `-trace` flag. For this purpose you have to change only one line in the Ant script located in my example:
{% highlight xml %}
<arg value="-trace"/>
<arg value="org.osflash.Zeroi.logging.LoggerClass.log"/>
<arg value="org/osflash/Zeroi/logging/LoggerClass"/>
<!-- point this argument to XTracePublisher -->
<arg value="org/osflash/Zeroi/logging/publisher/XTracePublisher"/>
{% endhighlight %}
*  If you familiar with Terminal you can also create a small shell script to run MTASC instead using Ant. Open Terminal, change directory`cd {path/to/downloaded/zeroiExample}`and create a new file named _build_`pico ./build` Type then the following line for running MTASC:
{% highlight bash linenos %}
{path/to/mtasc} -cp {path/to/your/own/core/classes} -cp {path/to/MM/core/classes} -cp {path/to/zeroi/class/package} -cp ./source/ -swf ./deploy/zeroiExample.swf ./ZeroiExample.as -trace org.osflash.Zeroi.logging.LoggerClass.log org/osflash/Zeroi/logging/LoggerClass org/osflash/Zeroi/logging/publisher/XTracePublisher -frame 1 -version 7 -v -main
{% endhighlight %}
For opening the *.swf with the FlashPlayer type additionally:
{% highlight bash %}
open -a SAFlashPlayer ./deploy/zeroiExample.swf
{% endhighlight %}

Save the file, close pico and run the script typing `./build`

## Wish list

*   Adding more log levels, such as "INFO" and "FATAL". I've got in contact with [Michael Bianco](http://developer.mabwebdesign.com/about.html) ;-) .