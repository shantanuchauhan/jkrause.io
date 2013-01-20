--- 
layout: post
group: blog
title: ThunderBolt AS3 1.0 released - A lightweight logging tool for Flex 2 and Flash CS3 applications
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
  related_id: "27,28,29"
  _edit_last: "2"
---
[ThunderBolt AS3](http://code.google.com/p/flash-thunderbolt/wiki/ThunderBoltAS3) is a lightweight logging tool for Flex 2 and Flash CS3 applications using [Firebug](http://www.getfirebug.com/) as its logging console. It's open source based on the [Mozilla Public License 1.1.](http://www.mozilla.org/MPL/MPL-1.1.html)

<!--more-->

## Features based on ThunderBolt AS3 v.1.0

*   Log levels: INFO, WARN, ERROR, DEBUG (FATAL, ALL)
*   Tree view for complex object structures such as class identifier and its properties
*   Custom LogTarget based on Flex Logging API including filters
*   Memory snapshot
*   SWC components for logging using Flex 2 or Flash CS3. Only 4kB for the Flash based SWC and 24kB for Flex one using the Flex 2 Logging Framework.

For more information check the [Wiki](http://code.google.com/p/flash-thunderbolt/wiki/ThunderBoltAS3) on [Google Code](http://code.google.com/p/flash-thunderbolt/).

## Live examples

**Note:** Press F12 to open Firebug within Firefox to receive all logging messages.
Any questions...? What the fuck is [Firebug](http://www.getfirebug.com/)...? ;-)

### Pure Flex 2 example

{% swfobject /blog/uploads/2007/10/14/ThunderBoltFlexExample.swf content_id:exampleOne width:100% height:150px bgcolor:#FFFFFF menu:false %}
<p>To see this content latest <a href='http://www.adobe.com/go/getflashplayer'>Flash Player Plugin</a> is required.</p>
{% endswfobject %}

### Flex 2 example using the Flex 2 Logging Framework

{% swfobject /blog/uploads/2007/10/14/ThunderBoltTargetExample.swf content_id:exampleTwo width:100% height:150px bgcolor:#FFFFFF menu:false %}
<p>To see this content latest <a href='http://www.adobe.com/go/getflashplayer'>Flash Player Plugin</a> is required.</p>
{% endswfobject %}

### Pure Flash CS3 example

<!-- #START example 3 -->

{% swfobject /blog/uploads/2007/10/14/flashThunderBoltAS3Example.swf content_id=exampleC width:100% height:200px bgcolor:#FFFFFF menu:false %}
<p>To see this content latest <a href='http://www.adobe.com/go/getflashplayer'>Flash Player Plugin</a> is required.</p>
{% endswfobject %}

## Free download

Full source of ThunderBolt AS3 including all examples and libraries as SWC's:
[ThunderBoltAS3_v1.0.zip](http://code.google.com/p/flash-thunderbolt/downloads/list)

Happy logging ;-) !