--- 
layout: post
group: blog
title: Testing states of skin classes in Flex 4 using WSSkinStatesTester
tags: 
- Flex
- Open Source
status: publish
type: post
published: true
meta: 
  _edit_last: "2"
---
WSSkinStatesTester is a handy tool to test visually all states of any skin classes in Flex 4 (Gumbo).

<!--more-->

Imagine you as a Flex developer or a designer have been created a lot of skins for your application, e.g. using Flash Catalyst. Now you want to check the behavior of these skins changing its states. Therefore you will run your application to change different states of components or you open Flash Catalyst to check all the states of a skin. Or you could use Flash Builders design view for this issue, but unfortunately it is unable to show transitions switching between states.

Anyway, how about switching between skin classes and all its states (incl. transitions) using only one (test-) view?

## Live example

_(Right mouse click to view source of example)_

{% swfobject /blog/uploads/2009/09/06/GumboTestSkinExample.swf width:100% height:400px bgcolor:#FFFFFF menu:false %}
<p>To see this content latest <a href='http://www.adobe.com/go/getflashplayer'>Flash Player Plugin</a> is required.</p>
{% endswfobject %}


## Usage

### Step one: Create an instance of WSSkinStatesTester

{% highlight mxml linenos %}
// Create an instance of WSSkinStatesTester using MXML
<ws:WSSkinStatesTester
    xmlns:ws="http://websector.de"
    id="skinTester"
    width="100%" height="100%"
    />
{% endhighlight %}

### Step two: Add all skins which have to be checked

{% highlight actionscript linenos %}
// Add an instance of a skin to WSSkinStatesTester.
var skin: PanelSkin = new PanelSkin();
skin.width = 250;
skin.height =250;
skinTester.addSkin( skin );
{% endhighlight %}

{% highlight actionscript linenos %}
//
// Step 2a  [ ALTERNATIVE ]
// Alternative you can add an array of skins to WSSkinStatesTester using ActionScript.
// BTW: This usage is recommend if you want test a bunch of skins and have to set properties before!
var skin0: ButtonSkin = new ButtonSkin();
skin0.width = 150;
skin0.height = 50;
skin0.labelDisplay.text = "ButtonSkin (Spark)";

var skin2: ComboBoxSkin = new ComboBoxSkin();
var skin3: MyButtonSkin = new MyButtonSkin();

skinTester.skins = [ skin1, skin2, skin3  ];
{% endhighlight %}

{% highlight mxml linenos %}
//
// Step 2b [ ALTERNATIVE ]
// Or add an array of skins to WSSkinStatesTester using MXML
<ws:WSSkinStatesTester
    xmlns:ws="http://websector.de"
    id="skinTester"
    width="100%" height="100%"
    skins="{ [
				new CheckBoxSkin(),
				new VideoPlayerSkin(),
				new ButtonSkin()
			] }"
    />
{% endhighlight %}

## Full source available

**Note:** To run all code [Flex SDK 4.0.0.9948 or higher](http://opensource.adobe.com/wiki/display/flexsdk/Download+Flex+4) is required.

*   SWC of WSSkinStatesTester and example posted above: [GumboTestSkinExample.zip](/blog/uploads/2009/09/06/srcview/GumboTestSkinExample.zip)
*   Full source code of WSSkinStatesTester is hosted at Github: [http://github.com/sectore/WSSkinStatesTester/](http://github.com/sectore/WSSkinStatesTester)

WSSkinStatesTester is open source licensed under [Mozilla Public License 1.1.](http://www.mozilla.org/MPL/MPL-1.1.html)

Happy skin states testing ;)

-Jens





