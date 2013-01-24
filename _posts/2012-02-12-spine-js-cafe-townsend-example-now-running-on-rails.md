--- 

layout: post
comments: true

group: blog
title: "Spine.js - Cafe Townsend example: Now running on Rails"
tags: 
- CoffeeScript
- HTML5
- JavaScript
- Rails
status: publish
type: post
published: true
meta: 
  _edit_last: "2"
---

After porting the ActionScript based application Cafe Townsend to JavaScript by using [Spine](/blog/2011/12/31/spine-js-cafe-townsend-example/) and [Angular](/blog/2012/01/17/fun-with-angularjs-rails-coffeescript-sass-another-cafe-townsend-example/) here is another Spine example, now running on [Rails](http://rubyonrails.org/). Like all the previous examples the JavaScript code is written in [CoffeeScript](http://coffeescript.org/).

<!--more-->

## Screen shot

[![Login](https://github.com/sectore/CafeTownsend-Spine-Rails/raw/master/wiki/cafetownsend-spine-rails-login.png)](http://cafetownsend-spine-rails.herokuapp.com)

## Live demo

Check out the demo at [http://cafetownsend-spine-rails.herokuapp.com](http://cafetownsend-spine-rails.herokuapp.com) using [a modern browser](https://www.google.com/chrome).

## Free source code

[All source code](https://github.com/sectore/CafeTownsend-Spine-Rails) is free and available at [GitHub](https://github.com/sectore/CafeTownsend-Spine-Rails).

## Random notes

Here are some random (and personal) notes about using Spine and Rails:

### Asynchronous view

*   One of the core value of Spine are "[asynchronous interfaces](http://spinejs.com/docs/introduction)". The idea behind is to provide an unblocked user interface without any loading messages or spinners. To ensure this, Spine communicates with the server asynchronously and lets never waits to render views for a response.
*   Anyway, sometimes you have to wait until a response from server is available, e.g. by using an log in interface. In such a case [Spine provides custom Ajax events](http://spinejs.com/docs/ajax) such as `ajaxSuccess` and `ajaxError` to handle server responses "by hand".

### Eco templates

*   Rails 3.1 asset pipeline already supports JST pages. For using [Eco](https://github.com/sstephenson/eco) templates with Rails ([Sprockets](http://rubydoc.info/gems/sprockets/2.3.0/frames)) the file extension of the JavaScript templates has to be `*.jst.eco`.
*   Don't forget to add `gem 'eco'` to your Gemfile.
*   Within a Spine Controller a template can be accessed by using its logical path as a property on the global JST object, e.g. `JST["path/to/template"]`. In this case a common pattern for Spine apps is to add helper methods to a Controller using `Spine.Controller.include`. Check out the `[view.js.coffee](https://github.com/sectore/CafeTownsend-Spine-Rails/blob/master/app/assets/javascripts/app/lib/view.js.coffee)` of the CafeTownsend application as an example.

### Spine.List and Rails

*   Spine provides a great helper class called [Spine.List](https://github.com/maccman/spine/blob/master/src/list.coffee) for creating and rendering list by using [Eco](https://github.com/sstephenson/eco) templates for its items. Anyway, using Spine.List within a Rails app is a special thing: In this case an eco template has to handle all (!!) data of the list, not only the data of the item itself. That means the template has to iterates the pushed data itself, which is all the data of the list and not the data of the item. That is because the behavior of Spine.List seems to be dependent on [Hem](http://spinejs.com/docs/hem), which iterate all data of a list and pushes only the needed data to the template. Unfortunately Hem is not available with Rails. For a better understanding compare the following two eco templates of the CafeTownsend application: `[employee_item.jeco](https://github.com/sectore/CafeTownsend-Spine/blob/master/app/views/employee_item.jeco)` (using Spine and Hem) and `[item.jst.eco](https://github.com/sectore/CafeTownsend-Spine-Rails/blob/master/app/assets/javascripts/app/views/employees/item.jst.eco)` (using Spine and Rails).

Have fun!

-Jens
