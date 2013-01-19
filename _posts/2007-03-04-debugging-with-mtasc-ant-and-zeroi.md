--- 
layout: post
group: blog
title: Debugging with MTASC, Ant and Zeroi
tags: 
- Debugging
- Flash
- MTASC
status: publish
type: post
published: true
meta: 
  _edit_last: "2"
---
In my previous posts ["trace() outside the Flash IDE with tail"](/blog/2007/02/21/are-you-looking-for-afterthought-on-os-x/)
and ["Are you looking for AFTERTHOUGHT on OS X?"](/blog/2007/02/21/are-you-looking-for-afterthought-on-os-x/) I described
two similar ways for debugging Flash movies outside the Flash IDE. In fact, it's relatively simple
to use the Flash Debug Player in connection with the logging file called `flashlog.txt` but
it has only got one big disadvantage: Instead of outputting structured data in predetermined
levels you'll get tons of unstructured lines.

<!--more-->

## Introduction

A couple of weeks ago, I did [this project](http://www.bmw.com/com/en/index_highend.html?prm_content=../../com/en/newvehicles/x5/x5/2006/experience/phase_3/_highend/xml/experience.xml) on a team with [Sönke Rohde](http://soenkerohde.com/). He showed me a better way for debugging Flash movies using [Zeroi](http://osflash.org/zeroi) developed by himself and [Ralf Bokelberg](http://www.helpqlodhelp.com/blog/). Zeroi is a package of classes that supports MTASC's option for [customizing trace() functions](http://www.mtasc.org/#trace) and the implementation of different log levels without changing code of your Flash application. You can use it with different debugging tools such as [SOS](http://sos.powerflasher.de/), [X-Ray](http://osflash.org/xray) or [LuminicBox.Log](http://www.luminicbox.com/blog/default.aspx?page=post&id=2). One of the most important feature is its ability to broadcast debug messages including additional information about class name, method name, line number and a error level with a standard `trace()` method.

For example: `trace("i This is my message");` will be displayed as `MyClass::myMethod Line>> This is my message`. Additionally, you can add a character for an error level `d = debug, i = info, w = warn, e = error, f = fatal`.

## Example

Click the buttons below to view the different debug messages.

{% swfobject /blog/uploads/2007/03/zeroiExample.swf content_id:zeroi-example width=100% height:45px menu:false %}
<p>To see this content latest <a href='http://www.adobe.com/go/getflashplayer'>Flash Player Plugin</a> is required.</p>
{% endswfobject %}

In this example the [LuminicBox.Log](http://www.luminicbox.com/blog/default.aspx?page=post&id=2) is used as a debugger console. Open the LuminicBox.Log only once.

{% swfobject /blog/uploads/2007/03/FlashInspector.swf content_id:luminic-box-example bgcolor:#06324D width=100% height:300px menu:false %}
<p>To see this content latest <a href='http://www.adobe.com/go/getflashplayer'>Flash Player Plugin</a> is required.</p>
{% endswfobject %}

Have a look inside the main class named `ZeroiExample.as`. It includes only standard `trace()` methods.

{% highlight actionscript linenos %}
/**
* ZeroiExample
* @author Jens Krause [www.websector.de]
*/
import mx.utils.Delegate;
class ZeroiExample
{
	private static var example: ZeroiExample = null;
	private var __timeline: MovieClip;
	function ZeroiExample(t: MovieClip)
	{
		trace ("i instance of ZeroiExample created");
		__timeline = t;
		initButtons();
	}
	private function initButtons (): Void
	{
		var labels: Array = ["debug", "info", "warn", "error", "fatal"];
		for (var i : Number = 0; i <labels.length; i++)
		{
			var button: MovieClip = __timeline.attachMovie("button", "button" + i, __timeline.getNextHighestDepth(), {id: i, _x: i*100, _y: 30});
			button.label.text = labels[i];
			button.onPress = function () { ZeroiExample.instance.traceExamples(this.id); };
		}
	};
	private function traceExamples ($id: Number): Void
	{
		switch ($id)
		{
			case 0:
				// this is a debug message
				trace ("d buttons id => " + $id);
			break;
			case 1:
				// this is an info message
				trace ("i buttons id => " + $id);
			break;
			case 2:
				// this is a warn message
				trace ("w buttons id => " + $id);
			break;
			case 3:
				// this is an error message
				trace ("e buttons id => " + $id);
			break;
			case 4:
				// this is an fatal message
				trace ("f buttons id => " + $id);
			break;
			default:
				trace ("w $id has'nt defined");
		};
	};
	public static function main (t: MovieClip) : Void
	{
		if (ZeroiExample.example == null) ZeroiExample.example = new ZeroiExample(t);
	}
}
{% endhighlight %}

For creating the example above I've used the following Ant script. In the next chapter I'll give you detailed instructions to use Zeroi with Ant.

{% highlight xml linenos %}
<?xml version='1.0' encoding="utf-8"?>
<project name="zeroi example" default="run" basedir=".">
	<description>
		buildfile for zeroi's example
	</description>
	<target name="deploy" description="Compiles an existing SWF file with MTASC for debugging">
		<!-- defines ant properties, you'll find more properties in "build.jk.properties" -->
		<property name="targetswf" value="zeroiExample.swf"/>
		<property name="mainclass" value="ZeroiExample.as"/>
		<property name="classframe" value="1"/>
		<property name="version" value="7"/>
			<exec executable="${mtasc}" failonerror="true">
				<!-- runs mtasc adding following arguments -->
				<arg value="-version"/>
				<arg value="${version}"/>
				<arg value="-cp"/>
				<arg value="${content.classpath}"/>
				<arg value="-cp"/>
				<arg value="${zeroi.classpath}"/>
				<arg value="-cp"/>
				<arg value="${core.classpath}"/>
				<arg value="-swf"/>
				<arg value="${deploy.folder}/${targetswf}"/>
				<arg value="-frame"/>
				<arg value="${classframe}"/>
				<arg value="-main"/>
				<arg value="${content.classpath}/${mainclass}"/>
				<!-- adds zeroi's trace functions -->
				<arg value="-trace"/>
				<arg value="org.osflash.zeroi.logging.LoggerClass.log"/>
				<arg value="org/osflash/zeroi/logging/LoggerClass"/>
				<arg value="org/osflash/zeroi/logging/publisher/LuminicPublisher"/>
			</exec>
		</target>
	<target name="run" depends="deploy" description="opens SWF">
		<!-- opens the *.swf with the Flash Player (Standalone) -->
		<!-- Note: The following command is for OS X users only, it won't run on windows -->
		<exec executable="open" dir=".">
			<arg line="-a ${flashplayer.v9} ${deploy.folder}/${targetswf}" />
		</exec>
	</target>
</project>
{% endhighlight %}


## Instructions

All you need are [MTASC](http://www.mtasc.org/), a debugger tool described above, [Ant](http://ant.apache.org/) and the [Zeroi package](http://osflash.org/zeroi#download). It's recommend to use [Eclipse](http://www.eclipse.org) and [FDT](http://fdt.powerflasher.com) as well.

*  [Download the Zeroi example]([download(zeroiExample)]) and unzip the file.
*  Grab the latest [Zeroi package](http://osflash.org/zeroi#download) and unzip the file.
*  For this example you'll need the LuminicBox.Log, too. [Download](http://www.luminicbox.com/blog/default.aspx?page=post&id=2) and open it.
Note: Open the LuminicBox.Log only once.
*  Make sure, that you have installed MTASC successfully as described on [mtasc.org](http://www.mtasc.org/#install). If you're on a Mac (PPC or Intel), you'll find the latest binaries (v.1.13) on [MTASC's mailing list](http://lists.motion-twin.com/pipermail/mtasc/2007-February/030170.html).
*  Open Eclipse, create a new Flash Project `File -> New -> New Flash Project` and
link it to the folder "Zeroi example": First you have to uncheck `use default location`.
Secondly, browse to the folder where the downloaded example is located.
*  Customize the property values in `build.jk.properties` and add this file to Ant's Preferences on Eclipse: `Preferences -> Type "Runtime" in the search field -> Properties -> Add Files`
Note: Windows users have to change the target called "run" located in the `build.xml` as well. At present, it only runs on OS X. If there's anyone out there who's familiar with Ant on windows, feel free to post a comment for this issue.
*  On Eclipse open the Ant view `Window -> Show view -> Ant`,
drag the `build.xml` located in the Flash Explorer to its Ant view and
press the green button to run the script.

![Eclipse Ant View](http://www.websector.de/blog/wp-content/uploads/2007/03/eclipse-ant-view.png)

*  If you use other debugger tools, you'll only have to change one line located in `build.xml`
{% highlight xml linenos %}
<!-- using XRay -->
<arg value="org/osflash/zeroi/logging/publisher/XRayPublisher"/>
<!-- OR -->
<!-- using SOS -->
<arg value="org/osflash/zeroi/logging/publisher/SOSPublisher"/>
{% endhighlight %}

Happy debugging ;-)
