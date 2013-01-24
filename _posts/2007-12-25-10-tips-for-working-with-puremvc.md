--- 

layout: post
comments: true

group: blog
title: 10 tips for working with PureMVC
tags: 
- AIR
- Flash
- Flex
- PureMVC
status: publish
type: post
published: true
meta: {}

---

**This post is translated into [German](http://www.flexughh.de/2007/12/27/10-tips-fur-das-arbeiten-mit-puremvc/), [Russian](http://injun.ru/?p=425), [Chinese](http://www.duzengqiang.com/blog/article.asp?id=674) and [French](http://www.polemedia.com/puremvc/10trucs.htm).** Thanks a lot to [Aleksey](http://injun.ru/?author=1), [duzengqiang](http://www.duzengqiang.com) and [Eric](http://www.videotron.com/) for the translations!

[Jesse Wardens](http://www.jessewarden.com/) great article called ["10 Tips For Working With Cairngorm"](http://www.jessewarden.com/2007/08/10-tips-for-working-with-cairngorm.html) has given me the idea to share 10 tips using [PureMVC](http://www.puremvc.org) as well. I've been using PureMVC intensively for about six months now and - that's not a secret - I'm loving it. Anyway, all my following opinions are based on my personal experiences only. ;-)

<!--more-->

## 1) Think in (Pure)MVC

How do I start using PureMVC? Short answer: Just think in (Pure)MVC! As its named says, PureMVC based on the classic [Model-View-Controller](http://en.wikipedia.org/wiki/Model-view-controller) design meta-pattern. Using the [Facade-pattern](http://en.wikipedia.org/wiki/Fa%C3%A7ade_pattern) you don't instantiate the core actors directly, but every member of PureMVC has its own and clear defined role:

* Proxies = Model
* Mediator and its ViewComponents = View
* Commands = Controller

## 2) Create an API for View Components

A View Component might be a standard UI component (e.g. `DataGrid`) or a custom component (e.g. a world within a game) or whatever. Don't use its public methods directly. In order to change its state or behavior create an API.

One of the advantage of PureMVC is to be neutral to the technologies being used. An example: I've built a "pure" Flash application based on PureMVC without using the Flex Framework. The same app will be ported to an AIR application for using AIR's great File system API. The View Components have to be changed using the Flex Framework, but not the Mediators or any other actors of PureMVC.

## 3) Use one Mediator for multiple View Components

To coordinate more than one View Component closely, use one Mediator only. In other words: Not all Views need a Mediator. For example: Assume a `ApplicationControlBar`  containing a `TextInput `, and a `Button` or something else. Then create just one Mediator for the `ApplicationControlBar` called `ApplicationControlBarMediator` and refer to the missing components casted as a second, third, etc. View Component.

## 4) Let's Events bubble up

What happens if you don't want to use multiple View Components within a Mediator? In order to handle user interactions with multiple View Components let's bubble Events from the nested children of a View Component up.

For example: Clicking any Button within a View Component will fired up a custom Event which the Mediator is listen to. So the Mediator don't have to know about the existing Button or about any other child of its View Component, just about the custom Event bubbled up.

## 5) Communicate using Notifications as often as possible

Notifications are the “Events” of PureMVC. For communicating between the three tiers Model, View and Controller use Notifications for the following scenarios as often as possible:

(communication from -&gt; to)
* Mediator -&gt; Proxy (via mapped Commands)
* Proxy -&gt; Mediator
* Proxy -&gt; Command
* Commands -&gt; Mediator

Even if it's possible to retrieve a Proxy from a Mediator, don't change the Proxy from a Mediator directly rather than sending a Notification using a mapped Command. It's a bad practice to change a Proxy (Model) from a Mediator (View) directly without using a Command (Controller).

## 6) Use Commands / MacroCommands as often as possible

Commands are doing the job at the Controller side: Retrieving and interacting Proxies, communicating with Mediators or executing other Commands. Even if a Command used only once or it has only two lines of code, use it as often as possible. To execute a Command once again anywhere or anytime within your application, you have to send just a Notification. In the future it's easy to enlarge the Command with more complex actions. And - that's very important - you always know, who the actor for changing the Proxy (Model) is.

Question: Have you had to execute more than one Command in a particular order? Use MacroCommands to execute multiple SubCommands (which means "simple" Commands) sequentially.

## 7) Use Remote Proxy to send and receive server-side data

To send and receive data between the application tier use Proxies called `Remote Proxies`. That's not a special kind of a PureMVC `Proxy`, just a location based on a `Proxy` to organize the server calls such as `HTTPServices`, `RemoteObjects` or whatever.

For example: To call a server-side `RemoteObject` to login a user create Proxy called `LoginProxy`. The `LoginProxy` does all the job to communicate with the server-side, which means sending and receiving data. Whenever you'll change the server-side implementation for the LoginProcess, you'll have to change one location within your application only - the `LoginProxy`.

## 8) Remove unused Mediators

In some cases you don't use a Mediator and its View Components anymore. Then remove the Mediator using `facade.removeMediator(MyMediator.NAME);` in conjunction with a self created `destroy()` method to remove the ViewComponent including all listeners, timer, references, etc. for a successful [garbage collection](http://www.adobe.com/devnet/flashplayer/articles/garbage_collection.html).

## 9) The Power of VO's (Value Objects)

The place to store data within the Model are the Proxies - that's right. The View Components have no need to know the Facade and the rest of the PureMVC application - that's right, too. This means that the View Component has no access to the Model data directly.

To avoid this issue store within the View Component a reference to the data using [Value Objects](http://home.earthlink.net/~huston2/j2ee/corepatterns.html#valueobject) (VO's). The VO's are not a core actor of PureMVC and in conjunction with the Data Binding feature of Flex are a powerful way to react changes in the Model data without breaking rules.

## 10) Courseware available

[Cliff Hall](http://content.futurescale.com/) has done an awesome job: You'll find not only excellent documentations about the "[Framework Overview](http://puremvc.org/component/option,com_wrapper/Itemid,35/)", "[Best Practices](http://puremvc.org/component/option,com_wrapper/Itemid,30/)" and a "[Conceptual Diagram](http://puremvc.org/component/option,com_wrapper/Itemid,34/)", <strike>also a very, very, very helpful [Courseware](http://puremvc.org/component/option,com_wrapper/Itemid,139/)</strike>. Check it out!

Enjoy PureMVC and Happy Holidays ;-) !
