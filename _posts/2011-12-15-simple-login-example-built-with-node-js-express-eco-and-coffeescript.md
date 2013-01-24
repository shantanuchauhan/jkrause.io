--- 

layout: post
comments: true

group: blog
title: Simple Login Example built with Node.js (Express), Eco and CoffeeScript
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
After [deciding to port an ActionScript Cafe Townsend example into JavaScript](https://plus.google.com/111160856985577256573/posts/St3JmmXfcaT) the first step was to build [a simple login example](http://nodejs-coffeescript-login.herokuapp.com/).

It is built with [Node.js](http://nodejs.org/) ([Express](http://expressjs.com/)) on server-side and it uses [Eco](https://github.com/sstephenson/eco) templates to render views on client-side. [Most of code](https://github.com/sectore/nodejs-coffeescript-login) is written in [CoffeeScript](http://http//jashkenas.github.com/coffee-script/).

<!--more-->

## Screen shot

[![Screen shot of simple login example](https://github.com/sectore/nodejs-coffeescript-login/raw/master/wiki/screenshot-nodejs-coffeescript-login.png)](http://nodejs-coffeescript-login.herokuapp.com/)

## Random notes

Here are some notes or tips based on issues I ran into writing this app:

### CoffeeScript + Express

*   Use [cupcake](https://github.com/twilson63/cupcake) to build a skeleton of your CoffeeScript / Express app as easy as possible

### Eco templates

*   Don't forget to declare any value sent from server using a `@` within the Eco template, e.g `{% raw %}<%- @user.name %>{% endraw %}` It took me some time to find and fix such a typo.

### Deploying to Heroku

*   To run an app written in CoffeeScript on Heroku you have to point the `app.coffee` and not `app.js` as a command to the [Procfile](http://devcenter.heroku.com/articles/procfile) as follow: `web: coffee app.coffee`
*   Run `heroku ps` to check if the app has been crashed or not.
*   In case of crashing check `heroku logs` for very helpful detailes
*   Heroku may not run the version of Node.js you have installed on your local machine. At the moment of writing this post Heroku is running v.0.4.7., not the latest version of Node.js v.0.6.5. If you have to downgrade your local version you will find [here a short instruction](/blog/2011/12/15/quick-tip-node-how-to-downgrade-node-js-on-os-x/).
*   To rename your subdomain using by Heroku you have to rename the app itself as follow: `heroku rename newname --app oldname`. After that you may have to repoint your git repository as well: `git remote rm heroku` and `git remote add heroku git@heroku.com:newname.git`
*   Instead of using an hardcoded value for a port check the PORT environment variable in your app.coffee as well `port = process.env.PORT or 9294` Because Heroku tells the app which port is listen to.*   Last but not least: Heroku has published an excellent article: "[Getting Started with Node.js on Heroku/Cedar](http://devcenter.heroku.com/articles/node-js)"

## Source code

You will find all [source code](https://github.com/sectore/nodejs-coffeescript-login) and its build instruction at [GitHub](https://github.com/sectore/nodejs-coffeescript-login)

Have fun!

-Jens