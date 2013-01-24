--- 
layout: post
comments: true
group: blog
title: "Issue with skinning ComboBox: Highlight border"
tags: 
- Flash
status: publish
type: post
published: true
meta: {}

---
Today I had an issue with skinning a ComboBox. Within a Flash form a ComboBox should be highlighted with a red border for displaying an error, but I couldn't use ComboBoxes `borderStyle` property to solve this issue.

It took me several minutes to figure out how to do the simplest of things. I've dug out `mx.controls.ComboBox` and its super classes detecting a `TextInput` named `text_mc` located in `mx.controls.ComboBase` which draws the border.

<!--more-->

## Solution

First you have to point to `text_mc`. ComboBox supports this reference with `comboBoxInstance.textField`. Change its default `borderStyle` named `"dropDown"` to `"solid"` for skinning the border. Then just customise the style called `"borderColor"`:

{% highlight actionscript linenos %}
comboBoxInstance.textField.setStyle("borderStyle" , "solid");
comboBoxInstance.textField.setStyle("borderColor" , 0xCC0000);
{% endhighlight%}

## Result

![ComboBox with border](/blog/uploads/2007/03/comboboxborder.png)