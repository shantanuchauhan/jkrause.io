--- 

layout: post
comments: true

group: blog
title: Swiz example based on Adobe AIR and SQLite
tags: 
- AIR
- Open Source
status: publish
type: post
published: true
meta: 
  _edit_last: "2"
---
About two months ago [Sönke Rohde](http://soenkerohde.com/), a good friend of me and a very active contributor of the [Swiz framework](http://code.google.com/p/swizframework/), told me about his experiences using Swiz and [he recommended highly](http://soenkerohde.com/2008/09/swiz-framework-brutally-simple/) Swiz as a framework which seems brutally simple to use. For all the people out there who are not familiar with Swiz: Swiz is an [IoC](http://en.wikipedia.org/wiki/Inversion_of_Control) framework created by [Chris Scott](http://cdscott.blogspot.com/) to simplify the development of [Flex](http://www.adobe.com/products/flex/) based RIAs.

<!--more-->

After [diving into Objective-C for the last two weeks](/blog/2009/01/02/wspluginswitcher-cocoa-based-tool-for-switching-flash-plug-in-on-os-x/) I have now the time to dive into Swiz. So I ported my [latest published example using Mate](/blog/2008/10/04/new-mate-extensions-for-using-air-and-sqlite-sqlservice-sqlserviceinvoker/) into Swiz.

The following example is a tiny AIR based application for storing user names into a SQLite database. It includes Eric Feminellas awesome [AIR SQL Framework](http://www.ericfeminella.com/blog/2008/09/29/air-sql-framework/) and a way to use the [Presentation Model pattern](http://weblogs.macromedia.com/paulw/archives/2007/10/presentation_pa_3.html) within an AIR application as well.

## Screen shot

[![Click to download source code](/blog/uploads/2009/01/07/screen_app.png)](/blog/uploads/2009/01/07/SwizAIRSQLiteExample.zip)

## View source code

Check out the source code: [View source code](/blog/uploads/2009/01/07/index.html)

## Download full source

Full source of the example: [SwizAIRSQLiteExample.zip](/blog/uploads/2009/01/07/SwizAIRSQLiteExample.zip)

## Acknowledge

*   Video - 360|Flex, San Jose 2008 - Chris Scott: [Introduction to the Swiz Framework for Flex](http://www.onflex.org/ted/2008/09/360flex-sj-2008-introduction-to-swiz.php)
*   Sönke Rohde: [Mock Business Delegates with Swiz](http://soenkerohde.com/2008/11/mock-business-delegates-with-swiz/)
*   Tony Hillerson: [FrameworkQuest 2008 Part 4: IoC With Swiz](http://www.insideria.com/2008/12/frameworkquest-2008-part-4-ioc.html)
*   [Swiz wiki pages at Google Code](http://code.google.com/p/swizframework/w/list)
