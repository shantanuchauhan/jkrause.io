--- 

layout: post
comments: true

group: blog
title: "Jekyll Plugin: SWFObject Tag"
tags: 
- Jekyll
- Ruby
status: publish
type: post
published: true

---

To migrate all my previous posts from [Wordpress](http://wordpress.com/) to [Jekyll](http://jekyllrb.com/)
I needed an alternative for [Kimili Flash Embed](http://kimili.com/plugins/kml_flashembed),
which is a Wordpress plugin to embed Flash files using [SWFObject](http://code.google.com/p/swfobject/).

Because I could not found anything I have built a Jekyll plugin called "[SWFObject Tag](https://github.com/sectore/jekyll-swfobject)"

<!--more-->

## Usage

The plugin is easy to use:

1) Grab the plugin file `[swfobject_tag.rb](https://github.com/sectore/jekyll-swfobject/blob/master/_plugins/swfobject_tag.rb)`
from [Github](https://github.com/sectore/jekyll-swfobject/)

2) Copy `swfobject_tag.rb` into `<your-jekyll-project>/_plugins` folder.

3) Link SWFObject in your layout template or page within `<head>` or before `{% raw %}{% swfobject %}{% endraw %}`:
{% highlight bash %}
<script src="//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js"></script>
{% endhighlight %}

4) Use the `swfobject` tag within your template like this:
{% highlight bash %}
{% raw %}
{% swfobject path/to/any.swf %}
  <p>To see this content latest <a href='http://www.adobe.com/go/getflashplayer'>Flash Player Plugin</a> is required.</p>
{% endswfobject %}
{% endraw %}
{% endhighlight %}

There are a lot of [optional parameters](https://github.com/sectore/jekyll-swfobject#optional-parameters) available. For detailed information check out the [wiki at Github](https://github.com/sectore/jekyll-swfobject), please.

## Source code

All [source of SWFObject Tag](https://github.com/sectore/jekyll-swfobject) are available at [GitHub](https://github.com/sectore/jekyll-swfobject).

Have fun!

