--- 
layout: post
group: blog
title: Custom ApplicationUpdaterUI for using AIR Update Framework in Flex 4
tags: 
- AIR
- Flex
- Open Source
status: publish
type: post
published: true
meta: 
  _edit_last: "2"
---
Flex 4 is Rock 'n' Roll! However, Flex 4 is still beta and it can't be perfect right now.
Today one of the [most missing feature for me](http://twitter.com/sectore/status/3513712009)
is using the ApplicationUpdaterUI of the [Adobe AIR Update Framework](http://labs.adobe.com/wiki/index.php/Adobe_AIR_Update_Framework)
in Flex 4. [This bug](http://bugs.adobe.com/jira/browse/SDK-22886?rc=1) is already documented.
(BTW: [Please vote here](http://bugs.adobe.com/jira/browse/SDK-22886?rc=1) to fix this issue! )

Anyway, I can't wait for the final release of Flex 4, so I decided to build a
[custom ApplicationUpdaterUI component](http://github.com/sectore/applicationupdaterui/) based
on the new [Spark skinning architecture](http://opensource.adobe.com/wiki/display/flexsdk/Gumbo+Skinning).
The custom  ApplicationUpdaterUI is built on the top of the current version of Adobes AIR Update Framework
and most of the current features are available (e.g. auto check, localization etc.) The component is full
skinnable using it as an external window (as before) or as an embedded view component in an application
(without the need of a popup window).

<!--more-->

## Usage

{% highlight actionscript linenos %}
//
// [1] Using ApplicationUpdaterUI as a popup window using ActionScript
var updater: ApplicationUpdaterUI = new ApplicationUpdaterUI(	new File ( 'pathToYourUpdaterXML' ), true, true );
// Optional: setting skin
updater.setStyle('skinClass', de.websector.utils.updater.ui.skins.silver.AppUpdaterUISilverSkin);
// Optional:  change the height and width of the window
updater.windowHeight = 300;
updater.windowWidth = 500;
// check for updates
updater.checkNow();
{% endhighlight %}

{% highlight mxml linenos %}
//
// [2] Using ApplicationUpdaterUI as an embedded view within your application
// Important: Avoid using popup window: useWindow=false (default is true)
// Optional: setting skin class via "skinClass"
// Optional: If the view should be visible only if an update available set invisibleCheck="true" (default is false)
<ws:ApplicationUpdaterUI
    xmlns:ws="http://websector.de"
    id="updater"
    width="100%" height="50"
    configurationFile="{ new File ( Constants.UPDATE_FILE ) }"
    skinClass="de.websector.utils.updater.ui.skins.firefox.AppUpdaterUIFirefoxSkin"
    invisibleCheck="true"
    useWindow="false"
    />
{% endhighlight %}

## Skin examples

It's pretty easy to create your own skin and add it to the component!
Check out the 3 different skins and feel free to use these as an example for your custom skins.

1.  `AppUpdaterUIStandardSkin:` Cloned interface of the Flex 3 based ApplicationUpdaterUI
2.  `AppUpdaterUISilverSkin:` Inspired from Adobes shiny XD components
3.  `AppUpdaterUIFirefoxSkin:` That's my favorite ;). Do you know the status bar on the top of a HTML page in Firefox 3.0 if a popup is trying to open? This skin a clone of such a bar to inform the user, if an update available. No need for an extra popup window.

{% swfobject /blog/uploads/2009/09/09/FlexUpdaterUIExample.swf width:100% height:500px bgcolor:#FFFFFF menu:false %}
<p>To see this content latest <a href='http://www.adobe.com/go/getflashplayer'>Flash Player Plugin</a> is required.</p>
{% endswfobject %}

## Download full source

Full source is available at GitHub: [http://github.com/sectore/applicationupdaterui/](http://github.com/sectore/applicationupdaterui/)

All source of ApplicationUpdaterUI  is open source licensed under
[Mozilla Public License 1.1.](http://www.mozilla.org/MPL/MPL-1.1.html)

## Personal TODOs

*   Documenting / commenting code base
*   It's not a "most wanted feature" right now, but handling of an update using files (events: StatusFileUpdateEvent.FILE_UPDATE_STATUS and StatusFileUpdateErrorEvent.FILE_UPDATE_ERROR) would be nice. If I have the time, I'm going to implement it.

Happy updating ;) !

-Jens
