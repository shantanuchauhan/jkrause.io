--- 
layout: post
group: blog
title: "New Mate extensions for using AIR and SQLite: \"SQLService + SQLServiceInvoker\""
tags: 
- AIR
- Open Source
status: publish
type: post
published: true
meta: 
  _edit_last: "2"
---

If you are using [Mate](http://mate.asfusion.com/) for application development based on [Adobe AIR](http://www.adobe.com/products/air/) you may need an extension for using [SQLite](http://sqlite.org/), because its in Mate currently not built in. It seems that only [one extension](http://www.freewebtown.com/mloncaric/mate/SQLServiceInvoker.as) by [Miran Loncaric](http://miran.nonlogic.org/) available, which depends on [Eric Feminellas](http://www.ericfeminella.com/blog/) [SQLService](http://www.ericfeminella.com/blog/actionscript-3-apis). Unfortunately this Mate extension lacks for using result or fault handlers, using prepared SQLStatements, parameters etc.

<!--more-->

Therefore I've started to develop new extensions called `SQLService` and `SQLServiceInvoker` with all the needed stuff such as result and fault handling within an EventMap, (re-)using prepared statements, "simple" SQL texts, named parameters etc.

BTW: [Theo Hultberg](http://blog.iconara.net) has already opened a [very cool project on Google Code](http://code.google.com/p/mate-examples/) for free examples based on Mate, so I hope that the new extensions will be added as well.

## Screen shot of the AIR example

![](http://www.websector.de/blog/wp-content/uploads/2008/10/04/mateAIRSQLiteExample.png)

## Code example for using the extensions

Here is the most important part – the MainEventMap which is an [EventMap](http://mate.asfusion.com/page/documentation/tags/eventmap) for handling all SQLite services.

{% highlight mxml linenos %}
<?xml version="1.0" encoding="utf-8"?>
<!--
*
* Mate extensions called "SQLService" and "SQLServiceInvoker" for using AIR and SQLite
*
* @author	Jens Krause [ www.websector.de/blog ]
*
-->
<EventMap
	xmlns:mx="http://www.adobe.com/2006/mxml"
	xmlns="http://mate.asfusion.com/"
	xmlns:air="de.websector.mate.extensions.air.*"
	xmlns:manager="example.models.manager.*"
	xmlns:data="flash.data.*">
	<mx:Script>
		<![CDATA[
			import example.models.presentation.MainViewModel;
			import example.views.MainView;
			import example.models.domain.MainModel;
			import example.views.GenericFaultHandler;
			import example.events.UserEvent;
			import example.models.vo.UserVO;
			import com.asfusion.mate.events.UnhandledFaultEvent;
			import mx.events.FlexEvent;

		]]>
	</mx:Script>

	<Debugger
		level="{ Debugger.ALL }"
		/>

	<air:SQLService id="sqlService"
	 	databasePath="{ SQLManager.DB_PATH }"
		/>

	<manager:SQLManager id="sqlManager" />

	<!--
		Flex Events
	-->

	<EventHandlers type="{FlexEvent.PREINITIALIZE}">
		<ObjectBuilder generator="{ MainModel }" />
	</EventHandlers>



	<!--
		Create a table using SQLServiceInvokers attribute called sql to set a SQL text
	-->
	<EventHandlers type="{FlexEvent.APPLICATION_COMPLETE}">
			<air:SQLServiceInvoker
				instance="{ sqlService }"
				sql="CREATE TABLE IF NOT EXISTS users (userId INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT)"
				 >
				 <air:resultHandlers>
				 	<EventAnnouncer
						generator="{ UserEvent}"
						type="{ UserEvent.GET_ALL }"
						/>
				 </air:resultHandlers>
			</air:SQLServiceInvoker>
	</EventHandlers>

	<!--
		Get all stored user from database using a prepared SQLStatement, which is created by SQLManager.
	-->
	<EventHandlers type="{ UserEvent.GET_ALL }">
			<air:SQLServiceInvoker
				instance="{ sqlService }"
				statement="{ sqlManager.getAllUsers }"
				 >
				<air:resultHandlers>
					<MethodInvoker
						generator="{ MainModel }"
						method="setUserData"
						arguments="{ resultObject }"
						/>
	        	</air:resultHandlers>
			</air:SQLServiceInvoker>
	</EventHandlers>

	<!--
		Delete selected user from database using a prepared SQLStatement, which is created by SQLManager.
	-->
	<EventHandlers type="{ UserEvent.DELETE }">
			<air:SQLServiceInvoker
				instance="{ sqlService }"
				statement="{ sqlManager.deleteUser }"
				parameters="{[ event.userId ]}"
				 >
				<air:resultHandlers>
					<EventAnnouncer
						generator="{ UserEvent}"
						type="{ UserEvent.GET_ALL}"
						/>
	        	</air:resultHandlers>
			</air:SQLServiceInvoker>
	</EventHandlers>

	<!--
		Add new user to database using a prepared SQLStatement, which is created by SQLManager.
	-->
	<EventHandlers type="{ UserEvent.ADD }">
			<air:SQLServiceInvoker
				instance="{ sqlService }"
				statement="{ sqlManager.addUser }"
				parameters="{[ event.userVO.firstName, event.userVO.lastName ]}"
				 >
				<air:resultHandlers>
					<EventAnnouncer
						generator="{ UserEvent}"
						type="{ UserEvent.GET_ALL }"
						/>
	        	</air:resultHandlers>
			</air:SQLServiceInvoker>
	</EventHandlers>

	<!--
		Update selected user from database using a prepared SQLStatement, which is created by SQLManager.
	-->
	<EventHandlers type="{ UserEvent.UPDATE }">
			<air:SQLServiceInvoker
				instance="{ sqlService }"
				statement="{ sqlManager.updateUser }"
				parameters="{[ event.userVO.firstName, event.userVO.lastName, event.userVO.userId ]}"
				 >
				<air:resultHandlers>
					<EventAnnouncer
						generator="{ UserEvent}"
						type="{ UserEvent.GET_ALL }"
						/>
	        	</air:resultHandlers>
			</air:SQLServiceInvoker>
	</EventHandlers>


	<!--
		Handling for fault event may dispatched by SQLServiceInvoker or other services
	-->
	<EventHandlers type="{ UnhandledFaultEvent.FAULT }">
		<MethodInvoker generator="{ GenericFaultHandler }"
			method="handleFault"
			arguments="{event.fault}" />
	</EventHandlers>
</EventMap>
{% endhighlight %}

I'm a big fan of using [presentation models](http://martinfowler.com/eaaDev/PresentationModel.html), so you will have a further example for using it as well ;-) . For using presentation models within Mate check out the [great example called 'document based'](http://blog.iconara.net/2008/09/30/creating-a-document-based-application-with-mate/) by Theo Hultberg  and his [very detailed post](http://code.google.com/p/mate-examples/wiki/PresentationModel) on Google Code.

## To-dos

*   Using transactions for batch INSERT/UPDATE/DELETE operations based on the [great tips using AIR and SQLite](http://probertson.com/articles/2008/08/22/360flex-slides-for-air-sqlite-optimization-conversation/) by [Paul Robertson](http://probertson.com/)!

## Download full source

<strike>Full source of the AIR example above including the new extensions called `SQLService` and `SQLServiceInvoker` "MateAIRSQLiteExample.zip"</strike>

[UPDATE] Full source of the extensions and the example as well has been moved to the project called ['mate-examples' on Google Code](http://code.google.com/p/mate-examples/) [/UPDATE]

## Acknowledge

*   Eric Feminella: [AIR SQL Framework](http://www.ericfeminella.com/blog/2008/09/29/air-sql-framework/)
*   Peter Elst: [SQLite wrapper classes](http://www.peterelst.com/blog/2008/04/07/introduction-to-sqlite-in-adobe-air/)
*   AIR doku on Adobe: "[Working with local SQL databases](http://help.adobe.com/en_US/AIR/1.1/devappshtml/WS5b3ccc516d4fbf351e63e3d118676a5497-7fb4.html)"
*   H. Paul Robertson: "[360|Flex slides for 'AIR SQLite: An optimization conversation](http://probertson.com/articles/2008/08/22/360flex-slides-for-air-sqlite-optimization-conversation/)"

## Update (10/26/08):

Source of the extensions and the example as well has been moved to the project called ['mate-examples' on Google Code](http://code.google.com/p/mate-examples/).