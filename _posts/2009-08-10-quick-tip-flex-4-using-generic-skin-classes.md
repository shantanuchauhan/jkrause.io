--- 
layout: post
group: blog
title: "Quick tip (Flex 4): Using generic skin classes"
tags: 
- Flex
status: publish
type: post
published: true
meta: 
  _edit_last: "2"
---
For skinning Flex 4 components you have a [lot of great options](http://opensource.adobe.com/wiki/display/flexsdk/Gumbo+Skinning).
One way is using a custom skin class, which extends a [`Skin`](http://livedocs.adobe.com/flex/gumbo/langref/spark/components/supportClasses/Skin.html) or a [`SparkSkin`](http://livedocs.adobe.com/flex/gumbo/langref/spark/skins/SparkSkin.html) class and defines all needed style properties by itself.

Imagine a custom button skin, which is more complex than the standard [Spark `ButtonSkin](http://livedocs.adobe.com/flex/gumbo/langref/mx/skins/spark/ButtonSkin.html). It declares additional gradients, rectangles, transitions etc. If you code all needed values for any style properties within this skin class, you may have to create another button skin class for using only one or two different style properties. Doing this, the amount of skin classes can be increased rapidly!

<!--more-->

A better approach is creating generic skin classes. Such a skin class gets most of its properties from CSS declarations of its host component. So all needed styles can be defined using plain CSS and won't be hard-coded anymore, even custom style declarations. That's very simple to do and saves a lot of extra skin classes.

## Example

Code is worth a thousand words, so check out the following example. It uses only one generic skin class for all different styled buttons (right mouse click to view source code):

{% swfobject /blog/uploads/2009/08/10/GumboGenericSkinExample.swf width:100% height:70px bgcolor:#FFFFFF menu:false %}
<p>To see this content latest <a href='http://www.adobe.com/go/getflashplayer'>Flash Player Plugin</a> is required.</p>
{% endswfobject %}

## Source code

Check out the [source code here](/blog/uploads/2009/08/10/srcview/).

## Helpful links

*   Flex SDK - Confluence: "[Gumbo Skinning (including SkinnableComponent) - Functional and Design Specification](http://opensource.adobe.com/wiki/display/flexsdk/Gumbo+Skinning)"
*   Adobe Flex 4 Help: "[Skinning Spark components - Accessing the host component from inside the skin](http://livedocs.adobe.com/flex/gumbo/html/WSA95C9644-B650-4783-B5C0-D2C7F95A23E3.html#WS92BB2602-2FD3-47c4-81BE-18209D77EDD0)"
*   "[Advanced FXG Spark Icon Buttons with one generic skin in Flex4 (Gumbo)](http://www.hulstkamp.com/2009/06/20/advanced-fxg-spark-icon-buttons-with-one-generic-skin-in-flex4-gumbo)" by Andy Hulstkamp

Happy Gumbo skinning ;)

-Jens




