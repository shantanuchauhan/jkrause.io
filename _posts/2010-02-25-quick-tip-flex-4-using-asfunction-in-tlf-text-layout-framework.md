--- 
layout: post
group: blog
title: "Quick Tip (Flex 4): Using asfunction in TLF (Text Layout Framework)"
tags: 
- Flex
status: publish
type: post
published: true
meta: 
  _edit_last: "2"
---
Do you remember the very old school global function called  `asfunction`? It was used to call custom ActionScript methods clicking an HTML link. The definition in HTML was something like this: `<a href='asfunction:myFunction'>my link</a> `.

<!--more-->

Since ActionScript 3 `asfunction` has [been deprecated](http://www.adobe.com/devnet/actionscript/as3_migration_table.html) and
it was replaced with a new event handling using [`TextEvent.LINK`](http://help.adobe.com/en_US/FlashPlatform/beta/reference/actionscript/3/flash/events/TextEvent.html#LINK) and
`event:myEventType` defined at the HTML link. For example `<a href='event:myEventType'>my link</a>`.
In this case you have to add just one event listener to handle all (!!) events.

## Flex 4 + Text Layout Framework + asfunction?

But what happens if you want to call an ActionScript method clicking an HTML link and using the Text Layout Framework (TLF) in Flex 4?

`RichEditableText` is the TLF component to embed a clickable HTML text, but it does not support an event handler for a `TextEvent.LINK` event.
Today I ran into this issue and I couldn't find any solution (either at official Flex doc or not at Google).

Anyway, the solution it is pretty easy. Just define your HTML links as before in Flex 3 and add an event
listener for every (!!) event to a `TextFlow` of a `RichEditableText`

{% highlight mxml linenos %}
<?xml version="1.0" encoding="utf-8"?>
<s:VGroup
    xmlns:fx="http://ns.adobe.com/mxml/2009"
    xmlns:s="library://ns.adobe.com/flex/spark"
    xmlns:mx="library://ns.adobe.com/flex/halo"
    >
  <fx:Script>
    <![CDATA[
    import flashx.textLayout.conversion.TextConverter;
    import flashx.textLayout.events.FlowElementMouseEvent;

    import mx.events.FlexEvent;

    /**
    * HTML string
    * Note the anchor using 'event:myEventType' to call an ActionScript method
    */
    protected static const HTML: String = 	"<p>Hello, here is a link to "
    + "<a href='event:myEventType'>run my custom method</a>"
    + "</p>";

    /**
    * Adding listener to for event:myEventType defined in HTML
    * at a TextFlow of RichEditableText
    *
    */
    protected function richtext1_initializeHandler(event:FlexEvent):void
    {
      myText.textFlow.addEventListener( 'myEventType', customMethodHandler );
    }

    /**
    * Custom event handler for event:customMethod defined in HTML
    *
    */
    protected function customMethodHandler( event:FlowElementMouseEvent ):void
    {
      result.text += "run custom method\n";
    }

    ]]>
  </fx:Script>


  <s:RichEditableText
      id="myText"
      width="100%"
      selectable="false"
      editable="false"
      initialize="richtext1_initializeHandler(event)"
      textFlow="{ TextConverter.importToFlow( HTML, TextConverter.TEXT_FIELD_HTML_FORMAT ) }"
      />

  <s:TextArea
      id="result"
      />


</s:VGroup>
{% endhighlight %}


## Some notes:

*   To have an clickable HTML link using `RichEditableText`, its property `selectable` and `editable` has to be `false`
*   Anchors defined in HTML will be a `LinkElements` at the TLF
*   All events will be dispatched from this `LinkElement` as a `FlowElementMouseEvent`. Its type is a 'custom' type and will be the same as defined in HTML.
*   Any `asfunction` call has to be defined in HTML using `event:myEventType`. The LinkElement will check itself if the link includes an url or just an `asfunction call.
*   To listen all events you have to add different listeners for each event type to a `TextFlow` of a `RichEditableText`.

-Jens
