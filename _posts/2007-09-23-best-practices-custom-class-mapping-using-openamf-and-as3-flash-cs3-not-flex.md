--- 

layout: post
comments: true

group: blog
title: "Best practices: Custom class mapping using OpenAMF and AS3 (Flash CS3 - not Flex)"
tags: 
- Flash
- Open Source
status: publish
type: post
published: true
meta: 
  _edit_last: "2"
---
[OpenAMF](http://www.openamf.com) is a free open-source alternative to Adobe's (formely Macromedia's) Java [Flash Remoting](http://www.adobe.com/products/flashremoting/). It's difficult to find any [tutorials](http://www.flash-db.com/Tutorials/helloAS3/) or [posts](http://flexiness.blogspot.com/2006/10/sending-custom-class-object-thru.html) about OpenAMF using AS3, because it seems that the OpenAMF project has stopped since 2006.

Anyway, at a current project we are using OpenAMF with AS3 (Flash CS3) and it works like a charm. But there are some important differences between AS2 and AS3 Flash Remoting using Flash CS3. To avoid running into any issues - particulary mapping custom classes - follow the following tips. But first of all thanks to [Marc Schachtel](http://www.esnake.de/) for his great support on server-side ;-) .

<!--more-->

## Best practices

1) Create on the server- and Flash-side identical simple objects using the [Value Object pattern](http://home.earthlink.net/~huston2/j2ee/corepatterns.html#valueobject) to send and receive custom objects over the wire. Assuming a `UserVO` would be created on server-side as follows:
{% highlight java linenos %}
package de.websector.blog.openamf.mapping.vo;

import java.util.Date;

public class UserVO
{
	private String userName;
	private Date registerDate;

	public UserVO() {}

	public String getUserName()
	{
		return this.userName;
	}

	public void setUserName(String value)
	{
		this.userName = value;
	}

	public Date getRegisterDate()
	{
		return this.registerDate;
	}

	public void setRegisterDate(Date value)
	{
		this.registerDate = value;
	}
}
{% endhighlight %}

2) On the Flash-side you have to point the VO to its server-side "antagonist" <strike>using `[RemoteClass(alias="de.websector.blog.openamf.mapping.vo.UserVO")]` and </strike> - that's important for class mapping on Flash-side - `registerClassAlias("UserVO", UserVO);` to register the VO within Flash. Here an example:
{% highlight as3 linenos %}
package
{

	[RemoteClass(alias="de.websector.blog.openamf.mapping.vo.UserVO")]

	import flash.net.registerClassAlias;

	public class UserVO
	{
		private var _userName: String;
		private var _registerDate: Date;

		public function UserVO():void {}

		public function get userName(): String
		{
			return this._userName;
		}

		public function set userName(value: String): void
		{
			this._userName = value;
		}

		public function get registerDate(): Date
		{
			return this._registerDate;
		}

		public function set registerDate(value: Date): void
		{
			this._registerDate = value;
		}

		static public function register():void
		{
			registerClassAlias("UserVO", UserVO);
		}
	}
}
{% endhighlight %}

3) Within the OpenAMF config file named `openamf-config.xml` you have to configure the behavior of outgoing AMF messages setting the `forceLowerCaseKeys`-tag to `false` to avoid converting all keys to lower case.
{% highlight xml linenos %}
 <amf-serializer>
 		<force-lower-case-keys>false</force-lower-case-keys>
 </amf-serializer>
{% endhighlight %}

4) Map within the same `openamf-config.xml` file all Value Objects located on the server- and Flash-side as follows:
{% highlight xml linenos %}
<custom-class-mapping>
	<java-class>de.websector.blog.openamf.mapping.vo.UserVO</java-class>
	<custom-class>UserVO</custom-class>
</custom-class-mapping>
{% endhighlight %}

5) To connect the OpenAMF gateway within Flash you have to create an instance of `flash.net.NetConnection;` calling `myNetConnectionInst.connect("http://mysite/openamf/gateway");`. To listen to results or faults create a `flash.net.Responder;` instance and use it for calling server-side services using `myNetConnectionInst.call("com.yoursite.YourService.serviceMethod", youResponder, parameters);`.
OpenAMF use the AMF0 protocol so you have to point it using `myNetConnectionInst.objectEncoding = ObjectEncoding.AMF0;`.
Don't forget to register the VO with its static `register()` method.

Here is an example:

{% highlight xml linenos %}
package {

	import flash.net.Responder;
	import flash.net.NetConnection;
 	import flash.net.ObjectEncoding;

	import flash.display.Sprite;

	public class OpenAMFMapping extends Sprite {

		private var _nc: NetConnection;

		public function OpenAMFMapping() {

			UserVO.register();

			_nc = new NetConnection();
       		_nc.objectEncoding = ObjectEncoding.AMF0;

			_nc.connect("http://localhost:8080/mappingExample/gateway");

			var responder:Responder = new Responder(onResult, onFault);

			_nc.call("de.websector.blog.openamf.mapping.services.UserServices.getUserByName", responder, "Luke Skywalker");
		}


		private function onFault(result:Object):void {
			trace("onFault: " + result.toString());
		}

		private function onResult(result:Object):void {

			trace("onResult: " +  result);


			try {
				var user: UserVO = result as UserVO;
				trace("userName: " + user.userName);
				trace("userRegisterDate: " + user.registerDate);
			}
			catch(error: Error) {
				trace ("onResult ERROR " + error.message);
			}
		}

	}

}
{% endhighlight %}

6.  Tip: For better remoting calls check out Danny Pattersons "[AS3 Lightweight Remoting Framework](http://osflash.org/as3lrf)" **[UPDATE 10/17/07]** or Aaron Smith's [SSR: Super Simple Remoting](http://osflash.org/projects/ssr)**[/UPDATE]** as well.

## Screen shot

Mapped results within Flash CS3 debugger calling server-side service `getUserByName(String userName)`:
![](/blog/uploads/2007/09/23/screenflashDebugger.png)

## Download example files

[OpenAMFMappingExampleFiles.zip](/blog/uploads/2007/09/23/OpenAMFMappingExampleFiles.zip)

## Helpful links

*   [AS3]
Jorge Solis: [Hello World with Openamf](http://www.flash-db.com/Tutorials/helloOpenamf/index.php)
Vishwajit: [Sending custom class object thru remoting using OpenAmf](http://flexiness.blogspot.com/2006/10/sending-custom-class-object-thru.html)
*   [AS2]
Ginormous Blog: [Custom class mapping with openAMF](http://theresidentalien.typepad.com/ginormous/2005/08/custom_class_ma.html)
Darron Schall: [Some notes about using OpenAMF](http://www.darronschall.com/weblog/archives/000186.cfm)
*   [OS X]
Apple Developer Connection: [Java and Tomcat on Mac OS X, Part I](http://developer.apple.com/internet/java/tomcat1.html)