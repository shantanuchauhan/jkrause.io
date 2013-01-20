--- 
layout: post
group: blog
title: "Quick tip: Avoid issues using Adobes AutoComplete Input component using Flex 3"
tags: 
- Flex
status: publish
type: post
published: true
meta: 
  _edit_last: "2"
---
There are several Flex components for handling auto completion out there, for example components called [CompletionInput](http://kuwamoto.org/2006/05/11/example-code-updated-for-beta-3/), [Autocomplete TextInput](http://labs.flexcoders.nl/2007/01/30/another-autocomplete-textinput-001/) or [Adobes AutoComplete Input](http://www.adobe.com/cfusion/exchange/index.cfm?event=extensionDetail&amp;extid=1047291). For a current Flex 3 based project I decided to use [Adobes component](http://www.adobe.com/cfusion/exchange/index.cfm?event=extensionDetail&amp;extid=1047291) and had the following issue:

<!--more-->

If you select the **first item** of the results pressing ENTER or just clicking by mouse, you will "lost" the value of the selected item. That means, it won't be shown at the `TextInput` located on the top.
It seems, that this issues appears using Flex 3 only (not Flex 2).

## Example

For testing both components:

1) Type just a "b" in one of the TextFields

2a) Press ENTER

2b) Or select just the **first item** clicking by mouse.

3) Compare the behavior of both components.

{% swfobject /blog/uploads/2008/04/30/AutoCompleteSample.swf height:230px bgcolor:#000000 %}
<p>To see this content latest <a href='http://www.adobe.com/go/getflashplayer'>Flash Player Plugin</a> is required.</p>
{% endswfobject %}

## Solution

To show the label of the selected item within the `TextField` just override the method called `close` of the `com.adobe.flex.extras.controls.AutoComplete` which extends the `mx.controls.ComboBox`.

{% highlight as3 linenos %}
/**
 *  Closes the combox and set the selection which is lost using Flex 3
 *
 *  @event	Event	Trigger event to close the combobox
 */
override public function close(event:Event = null):void
{
	super.close(event);

	if(selectedIndex == 0)
	{
		// set the text using the selected label
    	textInput.text = selectedLabel;
    	// select the text from typed text position to texts length
		textInput.setSelection(cursorPosition, textInput.text.length);
	}

}
{% endhighlight %}

## Download full source

Full source of the example above: [AutoCompleteSample.zip](/blog/uploads/2008/04/30/AutoCompleteSample.zip)