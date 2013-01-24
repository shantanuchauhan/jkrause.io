--- 

layout: post
comments: true

group: blog
title: "Fun with AngularJS + Rails + CoffeeScript + Sass: Another Cafe Townsend example"
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
Here is an another demo of a Cafe Townsend app using [AngularJS](http://angularjs.org) and [Rails](http://rubyonrails.org/). All JavaScript code is written in [CoffeeScript](http://coffeescript.org/), the CSS code using [Sass](http://sass-lang.com/). That's just fun-fun-fun!

<!--more-->

## Screen shots

[![Login](https://github.com/sectore/CafeTownsend-Angular-Rails/raw/master/wiki/cafetownsend-angular-rails-login.png)](http://cafetownsend-angular-rails.herokuapp.com)
[![Overview](https://github.com/sectore/CafeTownsend-Angular-Rails/raw/master/wiki/cafetownsend-angular-rails-overview.png)](http://cafetownsend-angular-rails.herokuapp.com)
[![Editing](https://github.com/sectore/CafeTownsend-Angular-Rails/raw/master/wiki/cafetownsend-angular-rails-edit.png)](http://cafetownsend-angular-rails.herokuapp.com)

## Live demo

Run the demo at [http://cafetownsend-angular-rails.herokuapp.com](http://cafetownsend-angular-rails.herokuapp.com) using [a modern browser](https://www.google.com/chrome).

## Source code

[All source code](https://github.com/sectore/CafeTownsend-Angular-Rails) is available at [GitHub](https://github.com/sectore/CafeTownsend-Angular-Rails).

## Random notes

Here are some notes and tips based on issues I ran into:

### Rails and AngularJS

*   The best way to communicate between Angular and Rails is using JSON. To ensure this your Rails controllers have to declare `respond_to :json`. Within your AngularJS controllers you have to declare `this.$xhr.defaults.headers.post['Content-Type'] = 'application/json';` and `this.$xhr.defaults.headers.put['Content-Type'] = 'application/json';` for any XHR requests. The library "[angle-up](https://github.com/ludicast/angle-up)" will help you to simplify this.
*   Angular services provide a [angular.service.$resource](http://docs.angularjs.org/#!/api/angular.service.$resource) object for using RESTful APIs. It includes almost all CRUD operations `(create, read, delete)` by default with the exception of `update`. To call an update operation your service has to define this action based on a PUT method call.
*   You can use `*.erb` files for your client-side html templates. That can be very handy, especially if you want to use ruby code within HTML. For example to refer to the asset path just write `{% raw %}<%= asset_path("my-template.html") %>{% endraw %}`
*   It seems that there are some issues to compress AngularJS while pre-compiling on Rails. The only way to avoid it seems to be disabling compression of JavaScript `config.assets.compress = false` in `config/environments/production.rb`. Please let me know if you have another solution.

### Heroku

*   Deploying your rails app to Heroku is pretty easy. The only thing you should have in mind is that Heroku does not support SQLite. It provides PostgreSQL database only. Just replace within your Gemfile `gem 'sqlite3'` with `gem 'pg'`.
*   [Heroku recommands](http://devcenter.heroku.com/articles/rails3#webserver) using a more robust webserver, e.g. Thin. In this case just add to your Gemfile `gem 'thin'` for using Thin (and not Webrick).

## Acknowledge

*   Vimeo: [Angular.js + Rails: Part 1](http://vimeo.com/30328747) by Daniel Nelson*   Vimeo: [Angular.js + Rails: Part 2](http://vimeo.com/30329977) by Daniel Nelson*   [AngularJS Rails demo](https://github.com/centresource/angularjs_rails_demo) by Daniel Nelson
*   RailsCasts: [Authentication in Rails 3.1](http://railscasts.com/episodes/270-authentication-in-rails-3-1)
*   Heroku: [Getting Started with Rails 3.0 on Heroku/Cedar](http://devcenter.heroku.com/articles/rails3)
*   [Rails 3.1 on Heroku](http://railsapps.github.com/rails-heroku-tutorial.html) by Daniel Kehoe

Have fun!

-Jens
