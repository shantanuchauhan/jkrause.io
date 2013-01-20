--- 
layout: post
group: blog
title: The new ThunderBolt AS3 Console based on Adobe AIR
tags: 
- AIR
- Debugging
- Flash
- Flex
- Open Source
- ThunderBolt
status: publish
type: post
published: true
meta: 
  related_id: "40,29,28,27"
  _edit_last: "2"
---
[ThunderBolt AS3](http://code.google.com/p/flash-thunderbolt/wiki/ThunderBoltAS3) is a lightweight logger extension for Flex or Flash application using [Firebug](http://www.firebug.org). With its new tool called [ThunderBolt AS3 Console](http://code.google.com/p/flash-thunderbolt/wiki/ThunderBoltAS3Console), which based on [Adobe AIR](http://www.adobe.com/products/air/), it's independent on Firebug. That's incredible helpful for logging AIR applications using ThunderBolt AS3.

<!--more-->

## Screen shots

{% swfobject /assets/swf/ws-slideshow.swf content_id:screenshots height:400px bgcolor:#FFFFFF flashvars:XMLPath=/blog/uploads/2008/06/01/screenshots.xml allowfullscreen:true menu:false allowscriptaccess:sameDomain %}
<p>To see this content latest <a href='http://www.adobe.com/go/getflashplayer'>Flash Player Plugin</a> is required.</p>
{% endswfobject %}

## Behind the scenes

For logging without Firebug, ThunderBolt AS3 uses the well-known `trace()` method in a special manner, which are stored in the [flashlog.txt](http://livedocs.adobe.com/flex/3/html/logging_04.html). ThunderBolt AS3 Console reads this file and displays all information using different log views in a same way as Firebug it does.

The architecture behind this AIR application based on [Tom Bray's easyMVC concept](http://www.tombray.com/category/easymvc/), which helps to build a well structured application as quick as possible using the MVC pattern.

ThunderBolt AS3 Console uses the following libraries as well:

*   [Yahoo! UI Library TreeView](http://developer.yahoo.com/yui/treeview/) for the logging tree. It's great to use this library within [the AIR based HTML component](http://livedocs.adobe.com/flex/3/langref/mx/controls/HTML.html) for manipulating the HTML DOM using pure ActionScript :-) .
*   The awesome [Degrafa](http://www.degrafa.com/) library for all the skinning stuff.

## Full source available

Download the [ThunderBolt AS3 Console at Google Code](http://code.google.com/p/flash-thunderbolt/downloads/list) or check out the full source using [its repository](http://flash-thunderbolt.googlecode.com/svn/trunk/as3console/).

## Wiki pages at Google Code

*   [ThunderBolt AS3 project page](http://code.google.com/p/flash-thunderbolt/wiki/ThunderBoltAS3)
*   [ThunderBolt AS3 Console](http://code.google.com/p/flash-thunderbolt/wiki/ThunderBoltAS3Console)

Happy logging! ;-)
