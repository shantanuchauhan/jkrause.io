--- 
layout: post
group: blog
title: Pushing (binary) image data using Node.js and Socket.IO
tags: 
- CoffeeScript
- HTML5
- JavaScript
- Node
status: publish
type: post
published: true
meta: 
  _edit_last: "2"
---
These days I'm playing around with [Node.js](http://nodejs.org) and [Socket.IO](http://socket.io). One of my goal was to push (binary) image data to clients (browser) in real time using WebSockets.

<!--more-->

## Demo (Video on Vimeo)

{% oembed http://vimeo.com/34076718 %}

## Behind the scenes

The simple demo runs with [Node.js](http://nodejs.org) ([Express](http://expressjs.com/)) and [Socket.IO](http://expressjs.com/). It generates its HTML code using [Jade](https://github.com/visionmedia/jade) templates and [Stylus](http://learnboost.github.com/stylus/) (CSS). The code is written in [CoffeeScript](http://jashkenas.github.com/coffee-script/).

## Limitation of pushing binary data

At the time of writing this post sending and receiving binary data using WebSockets [are very limited by current browser](http://en.wikipedia.org/wiki/Comparison_of_WebSocket_implementations).

To avoid lack of supporting binary messages by browser all image data have to be encoded in base64 before emitting the message. To do that just draw the image within a Canvas and send the data using Canvas' [toDataURL()](http://www.w3.org/TR/html5/the-canvas-element.html#dom-canvas-todataurl ) over the wire.

Here is a simple roundtrip on client-side (You will find all code of this demo here: [https://github.com/sectore/node-socket.io-push-image-demo](https://github.com/sectore/node-socket.io-push-image-demo)):

{% highlight coffeescript linenos %}

###

1 SENDING DATA

1.1 get original image data clicking on it
1.2 get its base64-encoded data
1.3 emit the data by Socket.IO to server (Node.js)

###
$(".my-image").click (event) =>
	# get image which was clicked
	img = event.target
	# create base64 encoded image
	imgdata = @getBase64Image(img)
	# emit data to clients
	@socket.emit 'onimgdata', {  width: img.width, height: img.height, source:imgdata }


###
Helper method to get a base64 encoded image data
Based on http://stackoverflow.com/questions/934012/get-image-data-in-javascript
###
getBase64Image:(img) ->
	# create canvas
	canvas = document.createElement "canvas"
	canvas.width = img.width
	canvas.height = img.height
	context = canvas.getContext "2d"
	# draw image into canvas
	context.drawImage   img,
		0,
		0

	###
	Get the data-URL formatted image
	using jpeg format as the type of the image to be returned
	@see: http://www.w3.org/TR/html5/the-canvas-element.html
	###
	data = canvas.toDataURL "image/jpeg"

	#return data
	data

###

2 RECEIVING DATA + DISPLAY IMAGE
2.1 listen to "showimgdata" event sent from server (Node.js)
2.2 push data to HTML image

###

@socket.on 'showimgdata', (data) ->
	#get image
	img = $('#show-img').get 0
	message
	try
		# set data for image
		img.width = data.width;
		img.height = data.height;
		img.src = data.source;

		message = ''

	catch error
		console.log error
		message = 'error receiving image data...'

{% endhighlight %}

The disadvantage of this solution is that "[Base64 encoding adds ~30%+ of size to the image](http://www.html5rocks.com/en/mobile/mobifying.html#toc-optimizations-requests)" (Quote by Eric Bidelman / Developer Relations, Google: ["Mobifying" Your HTML5 Site](http://www.html5rocks.com/en/mobile/mobifying.html)).

## Source code

[All source code](https://github.com/sectore/node-socket.io-push-image-demo) and its installation instruction available at [GitHub](https://github.com/sectore/node-socket.io-push-image-demo).

Have fun!

-Jens
