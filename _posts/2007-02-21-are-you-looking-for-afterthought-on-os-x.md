--- 
layout: post
group: blog
title: Are you looking for AFTERTHOUGHT on OS X?
tags: 
- Debugging
- Flash
- OS X
status: publish
type: post
published: true
meta: {}

---
[AFTERTHOUGHT](http://broadcast.artificialcolors.com/index.php?title=afterthought_2_1_now_with_search "afterthought_2_1_now_with_search") is an
amazing tool for debugging Flash movies, but it runs only on Windows and it needs .NET runtime.
It seems that a [Mac version](http://broadcast.artificialcolors.com/index.php?title=afterthought_on_osx "afterthought_on_osx") will be available soon
but you won't need it. Because OS X provides a suite of developer tools such as Console which you can view the message logs of your
Flash Debug Player in real time as well. If you are familiar with Terminal, you'll optimize your debugging session
as [Mark Llobrera](http://www.dirtystylus.com/blog/) commented on [Mark Walters' Blog](http://www.digitalflipbook.com/archives/2005/07/trace_from_the.php).

<!--more-->

Configure your system as follows:

*  Install and configure the Flash Debug Player as described in my previous article
["trace() outside the Flash IDE with tail"](/blog/2007/02/20/trace-outside-the-flash-ide-with-tail/).
Follow steps 1 up to 3 from there.
*  Start up a Terminal window and change the directory: `cd  /Users/`
*  Type `pico .bash_profile` to open Pico and add two aliases named `trace` and `cleartrace` inside your `.bash_profile`
located in `/Users/[username]/` as follow:
{% highlight bash %}
# opens "flashlog.txt" in Console
alias trace='open -a /Applications/Utilities/Console.app/ /Users/[username]]/Library/Preferences/Macromedia/Flash\ Player/Logs/flashlog.txt'
# clears "flashlog.txt"
alias cleartrace='cat /dev/null > /Users/[username]/Library/Preferences/Macromedia/Flash\ Player/Logs/flashlog.txt'
{% endhighlight %}
*  Save your `.bash_profile`, close pico and the shell.
*  Open a new shell and type `trace`. The `flashlog.txt` will be opened in Console and will be
logged in run time. For searching log messages type a word or phrase in the Filter field.

![Screen Console](/blog/uploads/2007/02/screen-console.png)`

* For clearing `flashlog.txt` type `cleartrace`.

Happy debugging ;-)
