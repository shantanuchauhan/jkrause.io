--- 

layout: post
comments: true

group: blog
title: "Quick Tip (Node): How to downgrade Node.js on OS X"
tags: 
- JavaScript
- Node
status: publish
type: post
published: true
meta: 
  _edit_last: "2"
---
It's a good idea to run [Node.js](http://nodejs.org/) using the latest (stable) version. However, there might be some reasons to downgrade Node.js to a previous version. In my case I needed an older version to test and deploy [a simple web app](http://nodejs-coffeescript-login.herokuapp.com/) to [Heroku](http://heroku.com) (where Node.js v.0.4.7 is running, not the latest v.0.6.5).

<!--more-->

## How-to

The best way to downgrade any Node.js version is using the make file which is delivered by any Node release. In case you have Node installed by an installer (e.g. Macintosh Installer) you have to re-build your current version "by hand" (steps #3-#5). It seems that is not possible to run the make file targeting to a Node version, which has been installed by an installer.

*  Open Terminal
*  Check version you are running on your machine: `node --version`
*  Download the version you are using at the moment from [Node.js release files list](http://nodejs.org/dist/)
*  Extract downloaded file: `tar -zxf node-v{your-current-version-number}.tar.gz`
*  If you already build Node without an installer you can skip this step: Build and install this version
{% highlight bash %}cd node-v{your-current-version-number}
./configure
make
sudo make install{% endhighlight %}
*  Uninstall current version: `sudo make uninstall`
*  Download the version you want to upgrade from [Node.js release files list](http://nodejs.org/dist/)
*  Extract downloaded file: `tar -zxf node-v{downgrade-version-number}.tar.gz`
*  Build and install this version:
{% highlight bash %}
cd node-v{downgrade-version-number}
./configure
make
sudo make install{% endhighlight %}

That's all ;)

## Acknowledge

  *  [Building and Installing Node.js](https://github.com/joyent/node/wiki/Installation)

-Jens

