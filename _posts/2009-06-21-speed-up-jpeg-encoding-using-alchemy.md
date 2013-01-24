--- 

layout: post
comments: true

group: blog
title: Speed up JPEG encoding using Alchemy
tags: 
- Alchemy
- Flash
- Flex
- Open Source
status: publish
type: post
published: true
meta: 
  _edit_last: "2"
---
Few weeks ago [Thibault Imbert](http://www.bytearray.org/) published an [optimized version](http://www.bytearray.org/?p=775) of [Adobes JPGEncoder](http://code.google.com/p/as3corelib/). And it rocks! However, if you may have very big-size bitmaps it takes too much time to encode images. For example: A bitmap with a size of 2000px x 1500px takes 22 sec. (BTW: Adobes version 30 sec.!!)

Today I came across to a [post by Manfred Weber](http://manfred.dschini.org/2008/11/21/alchemy-jpeg-encoder/), which points to a discussion at [Adobes Alchemy forum](http://forums.adobe.com/community/labs/alchemy). There you will find [a great solution](http://forums.adobe.com/message/987186) published by [metalbot](http://metal.hurlant.com/blog/) for encoding JPEGs using [Alchemy](http://labs.adobe.com/technologies/alchemy/). It's based on a [C library](http://www.ijg.org/files/) for JPEG image compression by [IJG](http://www.ijg.org/) and it's pretty fast (2,7 sec. for 2000 px x 1500px ) !!! Check out the example:

<!--more-->

## Example

Click the image to see the live example. Feel free to post a comment about your your results!

[![Screen shot](/blog/uploads/2009/06/21/screen_testAlchemyJPEGEncoder.jpg)](/blog/uploads/2009/06/21/AlchemyJPEGEncoder.html)

## Download Full Source

I have changed  the [original C code](http://hurlant.com/as3_encoder_jpeg.tgz ) a little bit
for manipulating the quality of an encoded image as well. It's just one line added to `as3_jpeg_wrapper.gg`

{% highlight c++ %}
// line 78
jpeg_set_quality(&cinfo, quality, TRUE /* limit to baseline-JPEG values */);
{% endhighlight %}

Therefore the
`as3_jpeg_wrapper.swc` located within the `*.zip` is recompiled for using this feature in
your Flex project via

{% highlight actionscript %}
as3_jpeg_wrapper.write_jpeg_file(baSource, WIDTH, HEIGHT, 3, 2, quality);
{% endhighlight %}

Full source of the Flex based example above: [AlchemyJPEGEncoderFlexExample.zip](/blog/uploads/2009/06/21/AlchemyJPEGEncoderFlexExample.zip)

BTW: You will find the original source of all C based classes published by metalbot [here](http://forums.adobe.com/message/987186#987186).

## Tips

I struggled around to set up Alchemy and to recompile the IJG library and the "as3_jpeg_wrapper.swc". To avoid this, here are some tips:

*   [Instruction for set up Alchemy](http://www.zeropointnine.com/wiki/index.php?n=FlashPlatform.Alchemy) by [Lee Felarca](http://www.zeropointnine.com/blog/)   (zeropointnine). Best instruction I've found so far for set up Alchemy.
*   Recompiling the SWC of metalbot's source following its "README.txt" and using its "Makefile" failed: To avoid this issue, after compiling the C library of jpegsrc you have to move the following files to $ALCHEMY_HOME/jpeg/ as well: "jconfig.h", "jmorecfg.h" and "jpeglib.h". Check out [the comment by notnick here](http://forums.adobe.com/message/1059134#1059134)

## UPDATE (06/22/09)

There is another great test for encoding images using Alchemy by [Mateusz Malczak](http://segfaultlabs.com/), which includes an asynchrounous example as well: [Alchemy - asynchronous jpeg encoding](http://segfaultlabs.com/blog/post/asynchronous-jpeg-encoding) Thanks to [xoestudio](http://twitter.com/xoestudio) for pointing to this via twitter! **[UPDATE] **

Have fun ;)

-Jens
