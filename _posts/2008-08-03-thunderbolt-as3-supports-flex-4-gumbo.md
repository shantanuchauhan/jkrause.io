--- 

layout: post
comments: true

group: blog
title: ThunderBolt AS3 supports Flex 4 (Gumbo)
tags: 
- Flex
- Open Source
- ThunderBolt
status: publish
type: post
published: true
meta: 
  _edit_last: "2"
---

[ThunderBolt AS3](http://code.google.com/p/flash-thunderbolt/wiki/ThunderBoltAS3) version 2.0 is out now! ThunderBolt AS3 is a lightweight logger extension for logging any ActionScript 3.0 projects based on Flex 2-4, AIR or Flash 9-10 using [Firebug](http://getfirebug.com/) or the new [ThunderBolt AS3 Console](http://code.google.com/p/flash-thunderbolt/wiki/ThunderBoltAS3Console).

After a public beta phase of two months and about 500-1.000 beta testers (1.240 downloads) the doors are open for the new release 2.0. Thanks to all the participants!

One of the [new features](http://code.google.com/p/flash-thunderbolt/) is the support and [Flex 4 (Gumbo)](http://opensource.adobe.com/wiki/display/flexsdk/Gumbo). Check out the following example. Note: [Flash Player 10 beta](http://labs.adobe.com/downloads/flashplayer10.html) will be required.

<!--more-->

## Example

{% swfobject /blog/uploads/2008/08/03/ThunderBoltGumbo.swf width:100% height:150px bgcolor:#FFFFFF menu:false %}
<p>To see this content latest <a href='http://www.adobe.com/go/getflashplayer'>Flash Player Plugin</a> is required.</p>
{% endswfobject %}

## Instruction

1.  For using [Flex 4 SDK beta](http://opensource.adobe.com/wiki/display/flexsdk/Download+Flex+4/) and Flex Builder 3 follow  [the instructions](http://blog.flexexamples.com/2008/08/02/using-the-beta-gumbo-sdk-in-flex-builder-3/) published by Peter deHaan ([blog.flexexamples.com](http://blog.flexexamples.com/)).
2.  Grab `ThunderBoltAS3_Gumbo.swc` for using ThunderBolt AS3 within your Gumbo project. You will find the SWC within `ThunderBoltAS3_v2.0.zip`, which [is available at Google Code](http://code.google.com/p/flash-thunderbolt/downloads/list). Add the SWC to your `lib` folder at your project.
3.  Log your project using ThunderBolt AS3 as usual or as described on its Wiki page at Google Code

## Full source

To download full source of the example above just jump to [ThunderBolt AS3 download list at Google Code](http://code.google.com/p/flash-thunderbolt/downloads/list) and grab the latest `ThunderBoltAS3_v2.0.zip`. Within this *.zip you will find a folder `examples/flex/gumbo`.

Happy logging with Gumbo ;-) !
