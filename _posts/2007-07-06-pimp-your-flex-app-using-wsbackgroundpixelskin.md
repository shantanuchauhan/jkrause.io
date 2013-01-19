--- 
layout: post
group: blog
title: Pimp your Flex app using WSBackgroundPixelSkin
tags: 
- Flex
- Open Source
status: publish
type: post
published: true
meta: 
  related_id: "31,33"
  dsq_thread_id: "987383228"
---

`WSBackgroundPixelSkin` is a free Flex component for creating patterns within Flex containers such as `Application`, `Canvas`, `HBox`, `VBox`, `Form` etc. It based on pure CSS and ActionScript without any images. It creates pretty patterns using the powerful `BitmapData` classes of Flex.

<!--more-->

For determining complex patterns I've written a small Flex app, which loads images reading colors based on its pixels and prints this pattern as CSS code. Let me know if there anyone out there who is interested in this app. Then I'll publish it including source, too.

Note: Programmatic skins used to extends `mx.skins.Border` or `mx.skins.ProgrammaticSkin` classes, but in this case `WSBackgroundPixelSkin` needs the `addChild()` method for adding instances of `DisplayObjects` and therefore it extends the `UIComponent`.

## Screen shot

[![](/blog/uploads/2007/07/06/screenShotWSGPixelSkin.png)](/blog/uploads/2007/07/06/WSBackgroundPixelSkinExample.html)

## Instructions

1) Define the style properties of your pattern as follow. This example describes a simple pattern based on blue and white columns
{% highlight mxml linenos %}
<mx:Style>
	.bg
	{
		// point WSBackgroundPixelSkin as a borderSkin
		borderSkin: ClassReference("skins.WSBackgroundPixelSkin");
		// define a pixelbased pattern
		// which uses the indexes of the bgColors array	below
		bgPattern: 	"001010001",
					"001010001";
		// bgColors defines color using by its pattern definition
		bgColors: #3399CC, #FFF;
		// measure of all pixels,
		// the default value is 1
		bgPixelMeasure: 12;
		//
		background-color: #3399CC;
	}
</mx:Style>
{% endhighlight %}

2) Point the pixel based style to a container, e.g. `Canvas`:
{% highlight mxml linenos %}
<mx:Canvas id="standardCanvas"
	styleName="bg" />
{% endhighlight %}

That's all ;)

## Example (incl. source code)

Have a look on [these examples](/blog/uploads/2007/07/06/WSBackgroundPixelSkinExample.html) including [the source code](blog/uploads/2007/07/06/srcview/index.html). Feel free to use it, `WSBackgroundPixelSkin` is open source licensed under the [Mozilla Public License 1.1.](http://www.mozilla.org/MPL/MPL-1.1.html)

Have fun! ;-)

## Update (07/10/07)

The [source code](/blog/uploads/2007/07/06/srcview/index.html) has been updated. Check out the "[WSPatternStyleGenerator](/blog/2007/07/10/wspatternstylegenerator-for-using-wsbackgroundpixelskin/)" to simplify the creation of its CSS patterns, too.