--- 

layout: post
comments: true

group: blog
title: How to setup Flex Builder 3 Eclipse plugin for using Adobe AIR 1.1
tags: 
- AIR
status: publish
type: post
published: true
meta: {}

---

[Adobe AIR 1.1](http://www.adobe.com/products/air/) is out of the door right now. But it seems that there is no integrated update mechanism for Flex Builder 3 Eclipse Plug-In using the new version of Adobe AIR. Anyway, its pretty easy to setup it manually.

Here a step by step tutorial on OS X:

<!--more-->

1) Install the [latest Adobe AIR runtime](http://get.adobe.com/air/) and download the latest [Flex 3 SDK version 3.0.2](http://opensource.adobe.com/wiki/display/flexsdk/Download+Flex+3).

2) Create a new subfolder for the new SDK within your Flex Builder Plugin installation called "3.0.2"

![](/blog/uploads/2008/06/17/finder.png)

3) Unzip the downloaded SDK and copy all its content to the subfolder mentioned above.

4) Open Eclipse and add the new SDK to the list of all installed Flex SDKs:Preferences -> Flex -> Installed Flex SDK -> Add

![](/blog/uploads/2008/06/17/add.png)

![](/blog/uploads/2008/06/17/default.png)

5) Create a new AIR project as usual: File -> New -> Flex project

![](/blog/uploads/2008/06/17/project.png)

6) The following step is very important: Modify within the application descriptor file called `[yourAppName]-app.xml` the root node named `application` the version `1.0` to `1.1`

![](/blog/uploads/2008/06/17/description.png)

7) Don't forget to set the the new SDK for the Flex Compiler settings as well: Project -> Properties -> Flex Compiler -> Flex SDK version -> Flex 3.0.2

![](/blog/uploads/2008/06/17/compiler.png)

8) Run the application: Run -> Run as -> Adobe AIR application

![](/blog/uploads/2008/06/17/window.png)

That's all ;-)

**P.S.:** For all the Flex Builder Pro user out there, who uses automated testing etc.: As Matt Chotin mentioned you have to copy a few needed SWC's form the 3.0 SDK to the new 3.0.2 SDK folder as well. For more information check his article at ADC: ["Developing Flex applications for AIR 1.1"](http://www.adobe.com/devnet/flex/articles/flex_air1.1.html)

## Acknowledge

*   Matt Chotin: ["Developing Flex applications for AIR 1.1"](http://www.adobe.com/devnet/flex/articles/flex_air1.1.html)
*   Flex 3 Builder documentation: ["Advanced build options"](http://livedocs.adobe.com/flex/3/html/build_6.html)
*   Adobe: [AIR 1.1 FAQ](http://www.adobe.com/go/air1-1faq)