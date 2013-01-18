--- 
layout: post
group: blog
title: "Quick tip (Flex Mobile): Run BlackBerry's Tablet OS SDK for AIR using Flash Builder Burrito plug-in version (not standalone)"
tags: 
- AIR
- Flex
status: publish
type: post
published: true
meta: 
  _edit_last: "2"
  _wp_old_slug: ""
---
[Renaun Erickson](http://renaun.com/blog/) did a great job to [describe the usage](http://renaun.com/blog/2010/12/update-to-playbook-sdk-provides-flash-builder-burrito-plugin/)
of the Flash Builder Burrito plugin for BlackBerry Tablet OS SDK for Adobe AIR.

However, if you have already used Burrito as a plug-in version for Eclipse (and not as a standalone version),
it will not find the new installed PlayBook SDK by default. Therefore you have to do a further step "by hand".

<!--more-->

First of all: If you have not already installed Flash Builder Burrito as a plug-in for Eclipse (and again - not as a standalone version ;) ) follow the simple and great description by Jason here: ["Burrito Feature: Plug-in Installer"](http://blogs.adobe.com/jasonsj/2010/11/burrito-feature-plug-in-installer.html). To get more details of installing the PlayBook SDK and its Flash Builder 4 plug-in check the post ["Install the BlackBerry Tablet OS SDK for Adobe AIR"](http://docs.blackberry.com/en/developers/deliverables/21878/Installing_the_SDK_1347128_11.jsp) at the BlackBarry Documentation as well.

After that just copy `blackberry-tablet-sdk.link` located in folder named "dropins" of Burritos standalone version to the folder "dropins" of your eclipse installation folder. That's all ;)

![Screen shot](/blog/uploads/2010/12/07/screenshot_dropin_folder.png)