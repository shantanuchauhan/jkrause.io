--- 
layout: post
comments: true
group: blog
title: Skinning Flex containers using WSDoubleBorderSkin
tags: 
- Flex
- Open Source
status: publish
type: post
published: true
meta: 
  related_id: "32"
---
`WSDoubleBorderSkin` is a programmatic skin extending `mx.skins.Border` for adding double borders on Flex containers such as `Canvas`, `HBox`, `VBox`, `Form` etc. It supports properties for different border positions such as `borderTop` or `borderBottom`, colors and thicknesses using CSS. It's designed for using Flex states based on `mx.states.Transition`. The WSDoubleBorderSkin is tested under Flex 2 and 3 (Moxie).

<!--more-->

## Screen shot

[![](/blog/uploads/2007/07/03/screenShot_doubleBorderSkin.png)](/blog/uploads/2007/07/03/WSDoubleBorderSkinExample.html)

## Instructions

1) Define style properties
{% highlight mxml linenos %}
<mx:Style>
	.wsDoubleBorder
	{
		borderSkin: ClassReference("skins.WSDoubleBorderSkin");
		borderTopThickness: 3;
		borderTopColor: #3ad2ed;
		borderRightThickness: 3;
		borderRightColor: #3399CC;
		borderBottomThickness: 3;
		borderBottomColor: #FF6600;
		borderLeftThickness: 3;
		borderLeftColor: #99CC00;
		backgroundColor: #FFFFFF;
		backgroundAlpha: 90;
		/* 	Optionally: using one border only
		doubleBorder: false;
		*/
	}
</mx:Style>
{% endhighlight %}

2) Point these styles to a container, e.g. Canvas:
{% highlight mxml linenos %}
<mx:Canvas id="standardCanvas"
	styleName="wsDoubleBorder" />
{% endhighlight %}

2b) Optionally: Using common properties `borderThickness` and `borderColor` for using one color or one thickness without any style definitions within `<mx:Style>`:
{% highlight mxml linenos %}
<mx:Canvas id="standardCanvas"
	width="300" height="200"
	borderSkin="skins.WSDoubleBorderSkin"
	borderThickness="3" borderColor="#99CC00" backgroundColor:"#FFFFFF" />
{% endhighlight %}

That's all ;)



## Example (incl. source code)

[Here you'll find an example](/blog/uploads/2007/07/03/WSDoubleBorderSkinExample.html) including [the source code](/blog/uploads/2007/07/03/srcview/index.html). `WSDoubleBorderSkin` is open source licensed under the [Mozilla Public License 1.1.](http://www.mozilla.org/MPL/MPL-1.1.html)

Have fun! ;-)