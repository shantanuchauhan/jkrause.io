--- 

layout: post
comments: true

group: blog
title: "Mate: Cafe Townsend example updated for using Flex 4"
tags: 
- Flex
- Open Source
status: publish
type: post
published: true
meta: 
  _edit_last: "2"
---
For an upcoming Flex 4 training I do need a good example for using [Mate framework](http://mate.asfusion.com). At the moment you will find [a lot of examples on Mate's official website](http://mate.asfusion.com/page/examples) or at the project called "[mate-examples](http://code.google.com/p/mate-examples/)" at  Google Code. But it seems that there is not any Flex 4 example available.

Anyway, I just ported the [current Cafe Townsend example (Flex 3)](http://mate.asfusion.com/page/examples/cafe-townsend) created by [Laura Arguello](http://www.asfusion.com) to Flex 4.

<!--more-->

It was not a big deal, because Mate supports already Flex 4. Only few changes was necessary for using new Spark components.

Also I did some little modifications in `[MainEventMap.mxml](http://code.google.com/p/mate-examples/source/browse/trunk/examples/cafeTownsendFlex4/src/com/cafetownsend/maps/MainEventMap.mxml)` to start all Inject properties for any views as soon as possible listening to `FlexEvent.PREINITIALIZE`. Furthermore all presentation models now are not created before its view will be added. But that is what we called "cosmetic" ;) , because Laura has already done an awesome job building the Flex 3 example of Cafe Townsend!

## Live example

(To view source code just a right mouse click on the app)
{% swfobject /blog/uploads/2010/03/12/CafeTownsend.swf width:100% height:530px bgcolor:#FFFFFF menu:false %}
<p>To see this content latest <a href='http://www.adobe.com/go/getflashplayer'>Flash Player Plugin</a> is required.</p>
{% endswfobject %}

## Update

For a better use case of Flex 4 I have refactored the original code of the app. Now it based on a new layout and uses some effects. Last but not least the code implement a LocalEventMap to encapsulate the handling of employes, which is important if you want to use a modular app with Flex-Modules

## Source code available

You will find the full source of Mate's Cafe Townsend Flex 4 example [at the project called 'mate-examples'](http://code.google.com/p/mate-examples/source/browse/trunk/examples/cafeTownsendFlex4/src/) on Google Code.

Have fun!

-Jens
