--- 
layout: post
comments: true
group: blog
title: trace() outside the Flash IDE with tail
tags: 
- Debugging
- Flash
- OS X
status: publish
type: post
published: true
meta: {}

---
As [Josh Buhler](http://www.joshbuhler.com/2004/11/20/using-the-trace-method-from-a-browser/ "Using the trace(); method - from a BROWSER!") and [Mark Walters](http://www.digitalflipbook.com/archives/2005/07/trace_from_the.php "Trace from the browser, using standard trace()") described it's simple to log the `trace()` outputs of a SWF file running in Browser. If you familiar with Terminal you can also log the `trace()`-methods by using the Unix command [tail](http://www.computerhope.com/unix/utail.htm "Information about the Linux / Unix tail command tail.").

<!--more-->

`tail` monitors in real time the growth of the logfile named `flashlog.txt` which is being written by the Flash Debug Player.

## Instructions

Check that you installed the Flash Debug Player on your machine successfully.

![](/blog/uploads/2007/02/contextmenuflashdebugplayer.png)

Press CTRL and click on a Flashmovie located in Browser and you'll have a context menu with the "Debugger" option like the image above. If not, [uninstall](http://www.adobe.com/support/flashplayer/downloads.html#uninstaller) the current Player and install the latest version of the [Flash Debug Player](http://www.adobe.com/support/flashplayer/downloads.html).

Add a textfile named `flashlog.txt` in the following folder `/Users/{username}/Library/Preferences/Macromedia/Flash Player/Logs/`

The Flash Debug Player needs a textfile named `mm.cfg`. Typically it's located in `/Library/Application Support/Macromedia/mm.cfg. `

If not, create it and add the following properties:
{% highlight bash %}
TraceOutPutFileName=Macintosh HD:Users:{username}:Library:Preferences:Macromedia:Flash Player:Logs:flashlog.txt
{% endhighlight %}

Note: If you have installed a Flash Debug Player older than version 9.0.28.0 you have to add a path to your `flashlog.txt as well:

{% highlight bash %}
ErrorReportingEnable=0
TraceOutputFileEnable=1
MaxWarnings=0
{% endhighlight %}

Open the Terminal and type
{% highlight bash %}
tail -f /Users/{username}/Library/Preferences/Macromedia/Flash Player/Logs/flashlog.txt
{% endhighlight %}
![screen_terminal.png](/blog/uploads/2007/02/screen_terminal.png)

That's it ;-)

P.S. If you have any trouble with your configuration, check [Mark Walters'](http://www.digitalflipbook.com/archives/2005/07/trace_from_the.php "Trace from the browser, using standard trace()") detailed instructions, too.