--- 

layout: post
comments: true

group: blog
title: Modular TodoMVC app with CanJS and RequireJS
tags: 
- CoffeeScript
- HTML5
- JavaScript
status: publish
type: post
published: true
meta: 
  _edit_last: "2"
  dsq_thread_id: "987375752"
---

To build modular JavaScript applications with [CanJS](http://canjs.us) and [RequireJS](http://requirejs.org/) is <strike>not</strike> as easy as it sounds. <strike>Because CanJS <a href="https://github.com/jupiterjs/canjs/issues/46">seems to have an incomplete support of AMD</a>.</strike> <strike>To find a way to solve this issue</strike> [I have refactored](https://github.com/sectore/todomvc-canjs-requirejs-coffeescript) the official [CanJS TodoMVC app](https://github.com/addyosmani/todomvc/tree/master/labs/architecture-examples/canjs) for using CanJS and RequireJS.

<!--more-->

## Source code

Feel free to check out all [source code](https://github.com/sectore/todomvc-canjs-requirejs-coffeescript), which is available at [GitHub](https://github.com/sectore/todomvc-canjs-requirejs-coffeescript). Most of the code is written in [CoffeeScript](http://coffeescript.org/) - just for fun.

## Random notes

*   &nbsp; <strike>Because CanJS does not express dependencies via define() you have to use <a href="http://requirejs.org/docs/api.html#config-shim">RequireJS' shim config</a>.</strike> The downside of the shim config is, that you can not mix CDN loading with it in a build. Check the ["Important optimizer notes for shim config"](http://requirejs.org/docs/api.html#config-shim) at the RequireJS API.
*   I had some issues with CanJS [templated event handling](http://canjs.us/#can_control-templated_event_handlers_pt_2). Event handler defined by using `{anyObject}` seems not work with modules. So I added manual bindings, e.g. `Todo.bind('created', function(ev, todo){ ... })` to solve this issue.
*   Let's have [Grunt](http://gruntjs.com) does all the work for you. There are great Grunt tasks out there, e.g. for [RequireJS](https://github.com/asciidisco/grunt-requirejs). [Here](https://github.com/sectore/todomvc-canjs-requirejs-coffeescript/blob/master/build/grunt.js) you will find [the build script for the app](https://github.com/sectore/todomvc-canjs-requirejs-coffeescript/blob/master/build/grunt.js).

## Helpfull links

*   Addy Osmani: [Writing Modular JavaScript With AMD, CommonJS & ES Harmony](http://addyosmani.com/writing-modular-js/)
*   [RequireJS API ](http://requirejs.org/docs/api.html)
*   [CanJS Doc](http://donejs.com/docs.html#!canjs)

## Update

Latest build of CanJS supports AMD - Thanks to @CanJS for [the hint](https://twitter.com/canjsus/status/240141706740236288). The source has been updated.