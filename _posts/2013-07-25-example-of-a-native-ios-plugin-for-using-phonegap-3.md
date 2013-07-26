--- 

layout: post
comments: true

group: blog
title: "Example of a native iOS plugin for using PhoneGap 3.0"
tags: 
- PhoneGap
status: publish
type: post
published: true

---

With the latest [release of PhoneGap 3.0](http://phonegap.com/blog/2013/07/19/adobe-phonegap-3.0-released/) a new plugin architecture is available. Now any plugin can be installed
with great tools, such as [PhoneGap's CLI](https://github.com/mwbrooks/phonegap-cli) or [Cordova Plugman](https://github.com/apache/cordova-plugman/).

To benefit from these great new features you may have to consider some important changes, especially for developing custom plugins.

That's why I have created a very simple native iOS plugin for a better understanding of these changes.

<!--more-->

##Source code
[All source](https://github.com/sectore/phonegap3-native-ios-plugin) of this example is is published at GitHub called "[phonegap3-native-ios-plugin](https://github.com/sectore/phonegap3-native-ios-plugin)". There you will find a detailed installation instruction, too.

##Screen shot

[![screen shot](https://raw.github.com/sectore/phonegap3-native-ios-plugin/master/assets/phonegap3-native-ios-plugin-screenshot.png)](https://github.com/sectore/phonegap3-native-ios-plugin)

## Random notes

1) Add a plugin to your project using Cordova CLI.

Example:

{% highlight bash %}
cordova plugin add https://github.com/sectore/phonegap3-native-ios-plugin
{% endhighlight %}

Or using [Phonegap CLI](https://github.com/mwbrooks/phonegap-cli).

Example:

{% highlight bash %}
phonegap local plugin add https://github.com/sectore/phonegap3-native-ios-plugin
{% endhighlight %}

Or using [plugman CLI](https://github.com/apache/cordova-plugman#command-line-usage).

Example:

{% highlight bash %}
plugman --platform ios --project ./platforms/ios --plugin https://github.com/sectore/phonegap3-native-ios-plugin
{% endhighlight %}

2) Add a plugin definition to the `config.xml` of your project as follow:

{% highlight html %}
  <feature name="MyPlugin">
      <param name="ios-package" value="MyPlugin" />
  </feature>
{% endhighlight %}


3) Don't wrap plugin's JS file (located in `your-plugin/www`) with `cordova.define`. It will be wrapped as a AMD module automatically.


4) Use the definition of `clobbers` within the manifest `plugin.xml` to define the plugin object on `window`.

For example:

{% highlight xml %}
<js-module src="www/MyPlugin.js" name="MyPlugin">
   <clobbers target="myPlugin" />
</js-module>
{% endhighlight %}

This will create an Object `window.myPlugin` to access the plugin globally. So you can reference to the plugin from everywhere in your code. In case of the `clobbers` definition of `MyPlugin` example above:

{% highlight html %}
<button onclick="myPlugin.sayHello();">Say Hello to your plugin!</button>
{% endhighlight %}


##Helpfull links

- Example of a native iOS plugin for using PhoneGap 3.0.: [https://github.com/sectore/phonegap3-native-ios-plugin](https://github.com/sectore/phonegap3-native-ios-plugin)
- PhoneGap documentation: "[Plugin Development Guide](http://docs.phonegap.com/en/3.0.0/guide_hybrid_plugins_index.md.html#Plugin%20Development%20Guide)"
- PhoneGap documentation: "[The Command-line Interface](http://docs.phonegap.com/en/3.0.0/guide_cli_index.md.html#The%20Command-line%20Interface)"
- PhoneGap documentation: "[iOS Plugins](http://docs.phonegap.com/en/3.0.0/guide_platforms_ios_plugin.md.html#iOS%20Plugins)"
- Cordova plugman: "[plugin.xml - Manifest Format]( https://github.com/apache/cordova-plugman/blob/master/plugin_spec.md)"
- Raymond Camden: "[PhoneGap 3.0 Released - Things You Should Know](http://www.raymondcamden.com/index.cfm/2013/7/19/PhoneGap-30-Released--Things-You-Should-Know)"
- Repositories of core plugins (updated to PhoneGap 3.0): [https://git-wip-us.apache.org/repos/asf?s=cordova-plugin](https://git-wip-us.apache.org/repos/asf?s=cordova-plugin)

Happy plugin development!

-Jens