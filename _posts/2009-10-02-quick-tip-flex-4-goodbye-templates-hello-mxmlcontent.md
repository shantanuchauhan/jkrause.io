--- 

layout: post
comments: true

group: blog
title: "Quick tip (Flex 4): Goodbye templates - hello mxmlContent"
tags: 
- Flex
status: publish
type: post
published: true
meta: 
  _edit_last: "2"
---

## Back in Flex 3

In Flex 3 is it pretty painful to extend a custom container component for adding children to it using MXML. The following example will throw an error like this:

{% highlight xml %}
_Error: Multiple sets of visual children have been specified for this component (base component definition and derived component definition).
{% endhighlight %}

<!--more-->

{% highlight mxml linenos %}
<?xml version="1.0" encoding="utf-8"?>
<!--

	class hierarchy of MySubContainer:

	Canvas
		|
		MyContainer
			|
			MySubContainer

-->
<local:MyContainer
    xmlns:mx="http://www.adobe.com/2006/mxml"
    xmlns:local="*"
    >
  <mx:Label
      text="subContainer"
      />
</local:MyContainer>
{% endhighlight %}

To avoid this issue in Flex 3 there are already some workarounds using [template components](http://livedocs.adobe.com/flex/3/html/help.html?content=templating_3.html).
For more information check the following posts:

*   Peter Ent: [Template in Flex](http://weblogs.macromedia.com/pent/archives/2006/03/component_templ.cfm)
*   Tony Fendall: [Adding 'Multiple sets of visual children' to custom components](http://www.munkiihouse.com/?p=37)
*   Dirk Eismann: [A simple(r) workaround for the 'Multiple sets of visual children' runtime error](http://www.richinternet.de/blog/index.cfm?entry=CD61A506-00CA-B6DF-802A549E330AFD67)

## Today in Flex 4

Now in Flex 4 this issue has been fixed. There is no need for using custom template component if you extend Sparks [`Group`](http://livedocs.adobe.com/flex/gumbo/langref/spark/components/Group.html)
or [`SkinnableContainer`](http://livedocs.adobe.com/flex/gumbo/langref/spark/components/SkinnableContainer.html)
in multiple levels. That means there is no error using:

{% highlight mxml linenos %}
<?xml version="1.0" encoding="utf-8"?>
<!--
	class hierarchy of MySubContainer:

	Group
		|
		MyContainer
			|
			MySubContainer

-->
<local:MyContainer
    xmlns:fx="http://ns.adobe.com/mxml/2009"
    xmlns:s="library://ns.adobe.com/flex/spark"
    xmlns:mx="library://ns.adobe.com/flex/halo"
    xmlns:local="*"
    >
  <s:Label
      text="subContainer"
      />

</local:MyContainer>
{% endhighlight %}

### Behind the scenes

Every Spark `Group` or `SkinnableContainer` has a property called `mxmlContent`, which handles internal all the needed stuff for organizing children defined by MXML.
Furthermore all container classes has defined a metatag declaration named `DefaultProperty`

*   Group: `[DefaultProperty("mxmlContent")] )`
*   SkinnableContainer: `[DefaultProperty("mxmlContentFactory")]`
which causes the compiler to add all (top) children defined within MXML as an array to the setter method `mxmlConent` or  `mxmlContentFactory`.

###Important note

If you have already defined children within the super class, these will be removed by the subclass by default.
To avoid this, you have to override the setter method `mxmlContent` of the subclass or build your own
[custom template component](http://help.adobe.com/en_US/Flex/4.0/UsingSDK/WS2db454920e96a9e51e63e3d11c0bf69084-7a1e.html).

Happy Flex 4 coding ;)

-Jens
