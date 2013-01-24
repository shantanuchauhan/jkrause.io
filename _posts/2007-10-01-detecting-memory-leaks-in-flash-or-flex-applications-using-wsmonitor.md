--- 

layout: post
comments: true

group: blog
title: Detecting memory leaks in Flash or Flex applications using WSMonitor
tags: 
- Debugging
- Flash
- Flex
- Open Source
status: publish
type: post
published: true
meta: 
  related_id: "40"
  _edit_last: "2"
---
WSMonitor is a handy tool based on AS3 to detect memory issues in Flash or Flex applications. It's simple to use and it's free - including full source.

<!--more-->

## Example

Press start button to run WSMonitor. All Flash movies running within this Browser are monitored, such as the maps.amung.us plugin located on right hand.

{% swfobject /blog/uploads/2007/10/01/WSMonitor.swf width:100% height:220px bgcolor:#FFFFFF menu:false %}
<p>To see this content latest <a href='http://www.adobe.com/go/getflashplayer'>Flash Player Plugin</a> is required.</p>
{% endswfobject %}

## Instruction

Just open your Flash or Flex app within Browser or Flash Standalone Player and start WSMonitor using `WSMonitor.html` or `WSMonitor.swf` located in folder named "deploy".

Note: WSMonitor and your app have to run with the same Flash Player.

## Free download

[WSMonitor.zip](/blog/uploads/2007/10/01/WSMonitor.zip)

WSMonitor is open source licensed under the [Mozilla Public License 1.1.](http://www.mozilla.org/MPL/MPL-1.1.html)

## Full source

Update on 08/29/09: Source code is moved to GitHub [http://github.com/sectore/wsmonitor/](http://github.com/sectore/wsmonitor/)

## Acknowledgment

Thanks to Artjom Tarassov, who is one of the smartes Flash programmer I've ever met, for the active exchange of ideas during the last weeks ;-) .