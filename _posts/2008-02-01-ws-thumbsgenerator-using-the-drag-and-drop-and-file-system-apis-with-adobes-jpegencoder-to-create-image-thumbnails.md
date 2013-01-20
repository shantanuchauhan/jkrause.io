--- 
layout: post
group: blog
title: "WS-ThumbsGenerator: Using the drag-and-drop and file system APIs with Adobes JPEGEncoder to create image thumbnails"
tags: 
- Flash
status: publish
type: post
published: true
meta: 
  _edit_last: "2"
---
For a current project called "[WS-Slideshow](http://www.ws-slideshow.com/)" I've started to develop a tool, which allows the user to customize its own "WS-Slideshow" pretty easy. It based on <span style="text-decoration: line-through;">Adobes AIR Beta 3</span> [Adobes AIR 1.0](http://www.adobe.com/products/air/).
<!--more-->
The current prototype implements the drag-and-drop and file system API's using [Adobes JPEGEncoder](http://code.google.com/p/as3corelib/) to create image thumbnails quick and easy. Therefore the prototype is called "WS-ThumbsGenerator" .

The code behind based on [Tom Bray's](http://www.tombray.com/) [easyMVC concept](http://www.tombray.com/category/easymvc/), which is the first choice for such prototypes like "WS-ThumbsGenerator". Fore more information about easyMVC check out [the excellent tutorial](http://www.clockobj.co.uk/2007/10/17/simplified-cairngorm-easy-mvc-for-adobe-flex) of [Jon Baker](http://clockobj.co.uk/) as well.

Anyway, I've decided to share the [full source of the prototype](#download) for the community, it may be helpful for anyone.

BTW: The "[WS-Slideshow](http://www.ws-slideshow.com/)" is a free Flash based slide show developed in AS3 using [PureMVC](http://www.puremvc.org). A desktop version based on Adobes AIR is in process. [Check it out!](http://www.ws-slideshow.com/)

## Screen shots

{% swfobject /assets/swf/ws-slideshow.swf content_id:screenshots height:400px bgcolor:#FFFFFF flashvars:XMLPath=/blog/uploads/2008/02/01/screenshots.xml allowfullscreen:true menu:false allowscriptaccess:sameDomain %}
<p>To see this content latest <a href='http://www.adobe.com/go/getflashplayer'>Flash Player Plugin</a> is required.</p>
{% endswfobject %}

## Install now!

{% swfobject /assets/swf/AIRInstallBadge.swf content_id:airbadge width:100% height:180px bgcolor:#000000 menu:false flashvars:airversion=1.1&appname=WS-ThumbsGenerator&appurl=/blog/uploads/2008/02/01/WS-ThumbsGenerator.air&appid=WS-ThumbsGenerator&pubid=8C9D6A6C4DE1A2413839F81087EB2593CEE4D162.1&appversion=0.1&imageurl=/blog/uploads/2008/02/01/air_ws_tg.jpg %}
<p>To see this content latest <a href='http://www.adobe.com/go/getflashplayer'>Flash Player Plugin</a> is required.</p>
{% endswfobject %}

## Downloads

AIR file: [WS-ThumbsGenerator.air](/blog/uploads/2008/02/01/WS-ThumbsGenerator.air)

Full source: [WS-ThumbsGenerator.zip](/blog/uploads/2008/02/01/WS-ThumbsGenerator.zip)

Files are open source and licensed under the [Mozilla Public License 1.1.](http://www.mozilla.org/MPL/MPL-1.1.html)


## UPDATE 03/02/08

[The source](/blog/uploads/2008/02/01/WS-ThumbsGenerator.zip) has been updated using Adobes AIR 1.0.

Have fun! ;)

-Jens
