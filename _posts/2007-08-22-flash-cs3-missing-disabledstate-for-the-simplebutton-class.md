--- 

layout: post
comments: true

group: blog
title: "Flash CS3: Missing \"disabledState\" for the SimpleButton class"
tags: 
- Flash
status: publish
type: post
published: true
meta: 
  _edit_last: "2"
---
The `flash.display.SimpleButton` class provides only four states for specifying display objects these are used as visual objects for the following states: [upState](http://livedocs.adobe.com/flash/9.0/ActionScriptLangRefV3/flash/display/SimpleButton.html#upState), [overState](http://livedocs.adobe.com/flash/9.0/ActionScriptLangRefV3/flash/display/SimpleButton.html#overState) [downState](http://livedocs.adobe.com/flash/9.0/ActionScriptLangRefV3/flash/display/SimpleButton.html#downState) and [hitTestState](http://livedocs.adobe.com/flash/9.0/ActionScriptLangRefV3/flash/display/SimpleButton.html#hitTestState). But I've missed a disabled state for an inactive Button.

<!--more-->

Anyway, overriding the setter method of its [enabled](http://livedocs.adobe.com/flash/9.0/ActionScriptLangRefV3/flash/display/SimpleButton.html#enabled) property is a good way to solve this problem (thanks to [Roman Wache](http://www.cececepe.de/) aka [mascha](http://www.flashforum.de/forum/member.php?u=25166) for [his hint](http://www.flashforum.de/forum/showthread.php?t=237643)). Note the comments within the code located below for more information ;-) .

## Example

{% swfobject /blog/uploads/2007/08/22/DisabledSimpleButtonExample.swf width:100% height:120px bgcolor:#000000 menu:false %}
<p>To see this content latest <a href='http://www.adobe.com/go/getflashplayer'>Flash Player Plugin</a> is required.</p>
{% endswfobject %}

## Source code

{% highlight as3 linenos %}
/**
* Flash CS3: Missing “disabledState” for the SimpleButton class
*
* @author	Jens Krause [www.websector.de]
* @date		08/22/07
* @see		http://www.websector.de/blog/2007/08/22/flash-cs3-missing-disabledstate-for-the-simplebutton-class/
*
*/

package
{
	import flash.display.DisplayObject;
	import flash.display.SimpleButton;

	public class CustomSimpleButton extends SimpleButton
	{

		protected var enabledState: DisplayObject;
		protected var disabledState: DisplayObject;

		/**
		 * Constructor of CustomSimpleButton
		 * Declares all states including additional states called "enabledState" or "disabledState"
		 *
		 * @param  txt	String of its label
		 */
		public function CustomSimpleButton(txt: String)
		{
			//
			// states
			enabledState = new ButtonDisplayState(txt, ButtonDisplayState.STATE_NORMAL);
			disabledState = new ButtonDisplayState(txt, ButtonDisplayState.STATE_DISABLED);
			overState = new ButtonDisplayState(txt, ButtonDisplayState.STATE_OVER);
			downState = new ButtonDisplayState(txt, ButtonDisplayState.STATE_DOWN);
			upState = enabledState;
			hitTestState = upState;
		}

		/**
		 * Overides the setter method of its enabled property
		 * @param  value	Boolean true or false
		 */
		override public function set enabled(value: Boolean):void
		{
			super.enabled = value;
			// hide or enable mouse events
			this.mouseEnabled = enabled;
			// With mouseEnabled = false you'll have only one state named "upState".
			// Use this state for setting the new states called "enabledState" or "disabledState" ;-)
			upState = (enabled) ? enabledState : disabledState;
		}
	}
}
{% endhighlight %}

{% highlight as3 linenos %}
/**
* Flash CS3: Missing “disabledState” for the SimpleButton class
*
* @author	Jens Krause [www.websector.de]
* @date		08/22/07
* @see		http://www.websector.de/blog/2007/08/22/flash-cs3-missing-disabledstate-for-the-simplebutton-class/
*
*/
package
{
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.display.Sprite;
	import flash.text.TextField;
	import flash.text.TextFieldAutoSize;
	import flash.text.TextFormat;

	class ButtonDisplayState extends Sprite
	{
		public static var STATE_NORMAL: uint = 0;
		public static var STATE_OVER: uint = 1;
		public static var STATE_DOWN: uint = 2;
		public static var STATE_DISABLED: uint = 3;

		/**
		 * Constructor of ButtonDisplayState
		 * Adds a background image and a label
		 *
		 * @param  txt		String of its label
		 * @param  stateID	Identifier of its state
		 */
    	public function ButtonDisplayState(txt: String, stateID:uint)
		{
			var bgImage: BitmapData;
			//
			// Using bitmaps located in the library for background.
			// Note: Flash IDE creates associated classes for these bitmaps called "BGNormal", etc.
			// Check the "Automatically declare stage instances" box in the publish settings ;-)
			switch (stateID)
			{
				case STATE_NORMAL:
					bgImage = new BGNormal(108, 37);
				break;
				case STATE_OVER:
				case STATE_DOWN:
					bgImage = new BGOver(108, 37);
				break;
				case STATE_DISABLED:
					bgImage = new BGDisabled(108, 37);
				break;
				default:
					bgImage = new BGNormal(108, 37);

			}

			//
			// add bitmap
			var bg: Bitmap = new Bitmap(bgImage);
			this.addChild(bg);

			//
			// and add a label as well
			var format: TextFormat = new TextFormat();
			format.font = "Arial";
			format.color = 0xFFFFFF;
			format.size = 15;

            var label: TextField = new TextField();
            label.autoSize = TextFieldAutoSize.CENTER;
			label.defaultTextFormat = format;
            label.text = txt;
            label.x = 0;
            label.y = 5;
            label.width = bg.width;

            this.addChild(label);

		}
	}
}
{% endhighlight %}

## Download full source

[DisabledSimpleButtonExample.zip](/blog/uploads/2007/08/22/DisabledSimpleButtonExample.zip)