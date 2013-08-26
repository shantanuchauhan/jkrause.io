--- 

layout: post
comments: true

group: blog
title: "DatePicker iOS plugin updated to work with Cordova / PhoneGap 3.0"
tags: 
- PhoneGap
status: publish
type: post
published: true

---

For the PhoneGap app ["HOAY"](https://github.com/sectore/hoay) I'm working on I do need a DatePicker iOS plugin, which is running with latest version of PhoneGap 3.0.
  Fortunately there is already a [DatePicker plugin](https://github.com/phonegap/phonegap-plugins/tree/master/iOS/DatePicker) at [PhoneGap's plugin repository](https://github.com/phonegap/phonegap-plugins/),
  but it does not work with the new plugin architecture of PhoneGap 3.0. So I decided <strike>to port</strike> to re-write it to support PhoneGap 3.0.

<!--more-->

##Source code

[All source](https://github.com/sectore/phonegap3-ios-datepicker-plugin) of the migration is published to [GitHub](https://github.com/sectore/phonegap3-ios-datepicker-plugin),
including a [pull request](https://github.com/phonegap/phonegap-plugins/pull/1227) to [PhoneGap's plugin repository](https://github.com/phonegap/phonegap-plugins/).


##Screen shots (updated)

### iPhone

[![screen shot iphone](https://raw.github.com/sectore/phonegap3-ios-datepicker-plugin/master/assets/screenshot.jpg)](https://github.com/sectore/phonegap3-ios-datepicker-plugin)

### iPad

[![screen shot ipad](https://raw.github.com/sectore/phonegap3-ios-datepicker-plugin/master/assets/screenshot_ipad.jpg)](https://github.com/sectore/phonegap3-ios-datepicker-plugin)


## Changes

To migrate the plugin to PhoneGap 3.0 I have done following changes:

1) New plugin directory structure ([recommended](https://github.com/apache/cordova-plugman#plugin-directory-structure) by Cordova plugman)

2) Providing a manifest file [`plugin.xml`](https://github.com/sectore/phonegap3-ios-datepicker-plugin/blob/master/plugin.xml) (needed for using [command-line interface](http://docs.phonegap.com/en/3.0.0/guide_cli_index.md.html#The%20Command-line%20Interface))

3) Calling function `exec` with the new method signature on JavaScript side (needed by Cordova / PhoneGap 3)

{% highlight js %}
exec(<successFunction>, <failFunction>, <service>, <action>, [<args>]);
{% endhighlight %}

4) Updating on Objective-C side the action method `show` with the new method signature (needed by Cordova / PhoneGap 3)

{% highlight objc %}
- (void)show:(CDVInvokedUrlCommand*)command;
{% endhighlight %}

5) Adding AMD support to [DatePicker.JS](https://github.com/sectore/phonegap3-ios-datepicker-plugin/blob/master/www/DatePicker.js) (needed by Cordova / PhoneGap 3)

6) Removing all counting / releasing of objects (needed for using Xcode 4.2 with its feature called "[Automatic Reference Counting](http://developer.apple.com/library/ios/#documentation/DeveloperTools/Conceptual/WhatsNewXcode/Articles/xcode_4_2.html)")

7) <strike>To get a detailed overview of all changes just check out [this diff stats at Github](https://github.com/sectore/phonegap3-ios-datepicker-plugin/commit/5b16b8199525291aa03a44efbc7cc9404fe6e767)</strike>

8) New features: Maximum and minimum date

9) New features: Adding `done` and `cancel` buttons incl. customized labels

10) New feature: iPad support

-Jens