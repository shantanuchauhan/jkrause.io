--- 
layout: post
group: blog
title: WebORB for PHP Login Example using Flex 3 and Cairngorm 2.2.1
tags: 
- Flex
- Open Source
status: publish
type: post
published: true
meta: 
  related_id: "35"
  _edit_last: "2"
---


I've been playing around with [WebORB for PHP](http://www.themidnightcoders.com/weborb/php/) for developing Flex remoting services and it's just awesome. WebORB gives you well documented product information including a service browser, tons of examples, code generator etc.

However, one thing I've missed is a WebORB for PHP example using Flex and Cairngorm... So I decided to write it down on my blog. It based on [Alex Uhlmann's](http://www.alex-uhlmann.de/) [CairngormLogin Sample](http://www.alex-uhlmann.de/flash/adobe/blog/cairngormlogin/CairngormLogin.html) [modified](http://www.nwebb.co.uk/blog/?p=63) by [Neil Webb](http://www.nwebb.co.uk/blog).

<!--more-->

## Example

{% swfobject /blog/uploads/2007/08/07/CairngormLoginWebORB.swf width:100% height:450px bgcolor:#000000 menu:false %}
<p>To see this content latest <a href='http://www.adobe.com/go/getflashplayer'>Flash Player Plugin</a> is required.</p>
{% endswfobject %}

## Instruction

You'll need the following sources:

*  [WebORB for PHP](http://www.themidnightcoders.net/downloadcenter/) (v2.0.2)
*  [Cairngorm](http://labs.adobe.com/wiki/index.php/Cairngorm:Cairngorm2.2.1:Download) (2.2.1)
*  Alex Uhlmann's [CairngormLogin Sample](http://www.alex-uhlmann.de/flash/adobe/blog/cairngormlogin/srcview/index.html)
*  Install WebORB as described in "[GETTING STARTED - WEBORB INSTALLATION](http://www.themidnightcoders.com/weborb/php/gettingstarted.htm)".
*  Open Flex Builder and create a new Flex Project called "CairngormLogin". As [Mike Potter pointed out](http://www.riapedia.com/2007/07/10/flex_and_php_together_with_midnight_coders_weborb) you don't need to select Flex Data Service as server type which mentioned by the WebORB documentation, just "Other/None" using a `services-config.xml` as described in step 5.
![](/blog/uploads/2007/08/07/newFlexProject.png)
*  Don't forget to add the `Cairngorm.swc` to your library path.
![](/blog/uploads/2007/08/07/addSwc.png)
* Create `services-config.xml` and modify the value of the `endpoint uri` to `{yourWebORBInstallationFolder}/Weborb/index.php`. Save it into the root of your project folder.
UPDATE (10/06/07): Flex Builder 3 Beta 2 needs a valid port as well. For more information about it read [this thread](http://www.adobe.com/cfusion/webforums/forum/messageview.cfm?forumid=72&catid=651&threadid=1303695&enterthread=y) on Adobes Flex Builder 3 forum.
{% highlight xml linenos %}
<?xml version="1.0" encoding="UTF-8"?>
<services-config>
    <services>
        <service id="amfphp-flashremoting-service"
                 class="flex.messaging.services.RemotingService"
                 messageTypes="flex.messaging.messages.RemotingMessage">
            <destination id="GenericDestination">
                <channels>
                    <channel ref="my-amf"/>
                </channels>
                <properties>
                    <source>*</source>
                </properties>
            </destination>
        </service>
    </services>

    <channels>
        <channel-definition id="my-amf" class="mx.messaging.channels.AMFChannel">
            <endpoint uri="http://localhost:80/weborb/Weborb/index.php" class="flex.messaging.endpoints.AMFEndpoint"/>
        </channel-definition>
    </channels>
</services-config>
{% endhighlight %}

* Open your project properties window with a right mouse click on your project folder within Flex Builder to add the `services-config.xml` as a `-services` argument to the Flex compiler
![](http://www.websector.de/blog/wp-content/uploads/2007/08/07/compilerProps.png)
* Copy all files of [Alex Uhlmann's CairngormLogin Sample](http://www.alex-uhlmann.de/flash/adobe/blog/cairngormlogin/srcview/index.html) into your project folder.
*Update the `LoginDelegate.as`, `LoginCommand.as` and `LoginPanel.mxml` to the latest Cairngorm package (v. 2.2.1 beta) as [Neil Webb described](http://www.nwebb.co.uk/blog/?p=63).
At the end you can check your work with [my files](#download) as well.
* Now you have to create the remoting service called `getUser` adding a `Login.php` to `{yourWebORBInstallationFolder}/Services/com/adobe/cairngorm/samples/login/`.

{% highlight php linenos %}
<?php

require_once("vo/LoginVO.php");

class Login
{

    public function getUser(LoginVO $loginVO)
    {
		if ($loginVO->username == "admin" && $loginVO->password == "admin")
		{
			$adminVO = new LoginVO();
			$adminVO->username = $loginVO->username;
			$adminVO->password = $loginVO->password;
			return $adminVO;
		}
		else
		{
			throw new Exception("Invalid username or password, please try it again.");
		}

    }
}

?>
{% endhighlight %}
* The remoting service needs a Value Object (VO) to transfer the data between the application tier. Therefore create a VO named `LoginVO.php` and put it into `{yourWebORBInstallationFolder}/Services/com/adobe/cairngorm/samples/login/vo/`
{% highlight php linenos %}
<?php
class LoginVO
{
	var $username;
   	var $password;
	var $loginDate;
}
?>
{% endhighlight %}
* Modify the ServiceLocator named `Services.mxml` for adding the remoting service created in step 9. Note: The destination for WebORB is called `GenericDestination`.
{% highlight mxml linenos %}
<?xml version="1.0" encoding="utf-8"?>
<cairngorm:ServiceLocator
	xmlns:mx="http://www.adobe.com/2006/mxml"
	xmlns:cairngorm="com.adobe.cairngorm.business.*">
    <mx:RemoteObject
    	id="loginService"
    	destination="GenericDestination"
    	source="com.adobe.cairngorm.samples.login.Login"
		showBusyCursor="true"
		result="event.token.resultHandler(event);"
		fault="event.token.faultHandler(event);">
    </mx:RemoteObject>
</cairngorm:ServiceLocator>
{% endhighlight %}
* Modify the `LoginDelegate.as` to call the remoting service named `loginService`.
{% highlight as3 linenos %}
package com.adobe.cairngorm.samples.login.business
{
	import com.adobe.cairngorm.business.ServiceLocator;
	import com.adobe.cairngorm.samples.login.vo.LoginVO;

	import mx.rpc.AsyncToken;
	import mx.rpc.IResponder;

	public class LoginDelegate
	{
		private var responder : IResponder;
		private var service : Object;

		public function LoginDelegate( responder : IResponder )
		{
			this.service = ServiceLocator.getInstance().getService( "loginService" );
			this.responder = responder;
		}

		public function login( loginVO : LoginVO ): void
		{
			var token : AsyncToken = service.getUser(loginVO);
			token.resultHandler = responder.result;
			token.faultHandler = responder.fault;
		}

	}
}
{% endhighlight %}
* Modify the `LoginCommand.as` to respond the service call.
{% highlight as3 linenos %}
package com.adobe.cairngorm.samples.login.commands
{
	import com.adobe.cairngorm.commands.Command;
	import com.adobe.cairngorm.control.CairngormEvent;
	import com.adobe.cairngorm.samples.login.business.LoginDelegate;
	import com.adobe.cairngorm.samples.login.control.LoginEvent;
	import com.adobe.cairngorm.samples.login.model.ModelLocator;

	import mx.rpc.IResponder;

	public class LoginCommand implements Command, IResponder
	{
		private var model : ModelLocator = ModelLocator.getInstance();

		public function execute( event : CairngormEvent ) : void
		{
			model.login.isPending = true;

			var delegate : LoginDelegate = new LoginDelegate( this );
			var loginEvent : LoginEvent = event as LoginEvent;
			delegate.login( loginEvent.loginVO );
		}

		public function result( event : Object ) : void
		{
			model.login.loginVO = event.result;
			model.login.loginDate = new Date();
			model.login.isPending = false;

			model.workflowState = ModelLocator.VIEWING_LOGGED_IN_SCREEN;
		}

		public function fault( event : Object ) : void
		{
			model.login.statusMessage = event.fault.faultString;
			model.login.isPending = false;

			model.workflowState = ModelLocator.VIEWING_ERROR_SCREEN;
		}
	}
}
{% endhighlight %}
* One of the big advantage using remoting services is providing well-typed objects over the application tier called "client-server-class mapping". For ensure this you have to correspond your client-side Value Object called `LoginVO.as` to its `RemoteClass` using `[RemoteClass(alias="com.adobe.cairngorm.samples.login.vo.LoginVO")]`
{% highlight as3 linenos %}
package com.adobe.cairngorm.samples.login.vo
{
	import com.adobe.cairngorm.vo.ValueObject;

	[RemoteClass(alias="com.adobe.cairngorm.samples.login.vo.LoginVO")]

	[Bindable]
	public class LoginVO implements ValueObject
	{
		public var username : String;
		public var password : String;
		public var loginDate : Date;
	}
}
{% endhighlight %}

That's all ;-)


## Download

Note: In the following *.zip-file I've changed some more code lines for customizing the appearance of the example which I don't described above. Anyway, have fun ;-)

Source: [CairngormLoginExampleWebORB.zip](/blog/uploads/2007/08/07/CairngormLoginExampleWebORB.zip)


## UPDATE (23/12/07)

The tutorial and [source code](/blog/uploads/2007/08/07/CairngormLoginExampleWebORB.zip) have been updated using Flex Builder 3 Beta 3.