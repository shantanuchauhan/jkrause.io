--- 
layout: post
group: blog
title: "AsUnit (AS3): RemoteTestCase for testing asynchronous data using Flash Remoting"
tags: 
- Debugging
- Flash
- Open Source
status: publish
type: post
published: true
meta: 
  _edit_last: "2"
---
[AsUnit](http://www.asunit.org/) is the first choice for [Test-Driven Development](http://en.wikipedia.org/wiki/Test-driven_development) using pure Flash applications. However, currently you find only one test case for asynchronous data using an instance of the `flash.net.URLLoader` class, but it seems neither for calling methods based on [Flash Remoting](http://www.adobe.com/products/flashremoting/) using the `flash.net.NetConnection` class. So I decided to add a new test case called `asunit.framework.RemotingTestCase`" to the AsUnit Framework and hope it would be helpful for the community - check it out ;-)

<!--more-->

## Examples

### Successfully asynchronous tests

![](/blog/uploads/2007/11/29/AsUnitTestSuccessfull.png)

### Unsuccessfully asynchronous tests

![](/blog/uploads/2007/11/29/AsUnitTestUnSuccessfull.png)

## Source

For more information check out the comments within the code, too ;-)

{% highlight as3 linenos %}
package asunit.framework
{
	import flash.errors.IllegalOperationError;
	import flash.events.IOErrorEvent;
	import flash.events.NetStatusEvent;
	import flash.events.SecurityErrorEvent;
	import flash.net.NetConnection;
	import flash.net.ObjectEncoding;
	import flash.net.Responder;

	import asunit.framework.TestCase;
	import asunit.util.ArrayIterator;

	/**
	 * RemotingTestCase
	 * @author 	Jens Krause [www.websector.de]
	 * @date 	11/29/07
	 *
	 */
	public class RemotingTestCase extends TestCase
	{

		protected var connection: NetConnection;
		/**
		* Constructor
		* @param testMethod		String		Name of the test case
		*
		*/
		public function RemotingTestCase(testMethod: String = null)
		{
			super(testMethod);
		}

		/**
		* Inits a netConnection instance and add all necessary event listeners
		*
		*/
		protected function initConnection():void
		{
			if (connection == null)
			{
				connection = new NetConnection();

				connection.addEventListener(NetStatusEvent.NET_STATUS, connectionStatusHandler);
				connection.addEventListener(IOErrorEvent.IO_ERROR, connectionIOErrorHandler);
				connection.addEventListener(SecurityErrorEvent.SECURITY_ERROR , connectionSecurityErrorHandler);
			}
		}

		/**
		* Dispose the netConnection instance
		*
		*/
		protected function disposeConnection():void
		{
			if (connection != null)
			{
				connection.removeEventListener(NetStatusEvent.NET_STATUS, connectionStatusHandler);
				connection.removeEventListener(IOErrorEvent.IO_ERROR, connectionIOErrorHandler);
				connection.removeEventListener(SecurityErrorEvent.SECURITY_ERROR , connectionSecurityErrorHandler);

				connection = null;
			}
		}

		/**
		* Callback handler for receiving SecurityErrorEvent
		* @param event		SecurityErrorEvent
		*
		*/
		protected function connectionSecurityErrorHandler(event: SecurityErrorEvent): void
		{
			result.addError(this, new IllegalOperationError(event.toString()));
			isComplete = true;
		}

		/**
		* Callback handler for receiving IOErrorEvent
		* @param event		IOErrorEvent
		*
		*/
		protected function connectionIOErrorHandler(event: IOErrorEvent): void
		{
			result.addError(this, new IllegalOperationError(event.toString()));
			isComplete = true;
		}

		/**
		* Callback handler for receiving NetStatusEvent
		* @param event		NetStatusEvent
		*
		*/
		protected function connectionStatusHandler(event: NetStatusEvent): void
		{

		}

		/**
		* Connects the gateway
		*
		* @param $gateway		String		Remote gateway
		* @param $encoding		uint		Object encoding using either AMF0 or AMF3
		*
		*/
		protected function connect ($gateway: String = null, $encoding: uint = 0): void
		{
			initConnection();

       		connection.objectEncoding = ($encoding > ObjectEncoding.AMF0) ? $encoding : ObjectEncoding.AMF0;

       		try {
       			connection.connect($gateway);
       		}
       		catch(error: Error)
       		{
	       		result.addError(this, error);
       		}
		};

		/**
		* Calls a remote service method and test it
		*
		* @param $method		String		Remote service
		* @param $responder		Responder	Responder to handle remoting calls
		* @param $arguments		Array		Rest paramaters (optional)
		*
		*/
		protected function call ($method: String = null, $responder: Responder = null, ...$arguments): void
		{
			var hasReferenceError: Boolean = false;

			// parameters for calling connection.call();
			// To avoid using the type unsafe ...rest operator I decided to use type safe parameters within RemotingTestCase.call()
			// and apply these later to connection.call();
			var params: Array = [];

			// check remote method
			if ($method != null)
			{
				params.push($method);
			}
			else
			{
				result.addError(this, new ReferenceError("RemotingTestCase.call() has to defined a remote method."));
				hasReferenceError = true;
			}

			// check responder
			if ($responder != null)
			{
				params.push($responder);
			}
			else
			{
				result.addError(this, new ReferenceError("RemotingTestCase.call() has to defined a responder to handling its results."));
				hasReferenceError = true;
			}

			// In case of a reference error invoke test running instantly
			// to show the errors created above and return
			if (hasReferenceError)
			{
				super.run();
				return;
			}


			var arrIterator: ArrayIterator = new ArrayIterator($arguments);
			while (arrIterator.hasNext())
			{
				params.push(arrIterator.next());
			}

			// call remote service
       		try {
				connection.call.apply(null, params);
       		}
       		catch(error: Error)
       		{
	       		result.addError(this, error);
       		}


		};
	}
}
{% endhighlight %}

The following test example based on my Flash Remoting example using [OpenAMF](http://www.openamf.com/) described at the previous article called ["Best practices: Custom class mapping using OpenAMF and AS3 (Flash CS3 - not Flex)"](/blog/2007/09/23/best-practices-custom-class-mapping-using-openamf-and-as3-flash-cs3-not-flex/)

{% highlight as3 linenos %}
package tests
{
	import flash.net.ObjectEncoding;
	import flash.net.Responder;

	import asunit.framework.RemotingTestCase;

	/**
	 * RemotingTestCaseExample
	 * @author 	Jens Krause [www.websector.de]
	 * @date	11/29/97
	 */
	public class RemotingTestCaseExample extends RemotingTestCase
	{
		private var _result: Object;
		private var _userVO: UserVO;

		/**
		* Constructor
		* @param testMethod		String		Name of the test case
		*
		*/
		public function RemotingTestCaseExample(testMethod: String = null)
		{
			super(testMethod);

		}

		/**
		* After a test is executed the tearDown method is called
		* and removed all references to test objects
		*
		*/
		override protected function tearDown():void
		{
			_userVO = null;
		}

		/**
		* Before a test is executed the setUp method is called
		* which instantiate all necessary test objects
		*
		*/

		 override protected function setUp(): void
		 {
		  	_userVO = _result as UserVO;
		 }

		/**
		* Runs the test
		*
		*/
		public override function run():void
		{
			UserVO.register();

			_result = new Object();

			var gateway: String = "http://localhost:8080/mappingExample/gateway";
			var encoding: uint = ObjectEncoding.AMF0;

			var method: String = "de.websector.blog.openamf.mapping.services.UserServices.getUserByName";
			var responder:Responder = new Responder(onResult, onFault);

			super.connect(gateway, encoding);

			super.call(method, responder, "Luke Skywalker");

		}

		/**
		* Callback handler for receiving a fault
		* @param $result		Object
		*
		*/
		private function onFault($result: Object):void
		{
			result.addError(this, new Error($result.toString()));
			// call super.run() to execute test methods
			super.run();
		}

		/**
		* Callback handler for receiving a result
		* @param $result		Object
		*
		*/
		private function onResult($result: Object):void
		{
			_result = $result;

			super.disposeConnection();
			// call super.run() to execute test methods
			super.run();
		}

		/**
		* Tests the userVO
		*/
		public function testUserVO():void
		{
			assertTrue("result is instance of ", _result is UserVO);
		}

		/**
		* Tests the userName
		*/
		public function testUserName():void
		{
			assertEquals("UserName Luke Skywalker", _userVO.userName, "Luke Skywalker");
		}

		/**
		* Tests the registerDate
		*/
		public function testRegisterDate():void
		{
			assertTrue("Register date ", _userVO.registerDate is Date);
		}
//
//		/**
//	 	 * Test that is born to lose.
//	 	 */
//	 	public function testFail():void
//		{
//	 		assertFalse("failing test", true);
//	 	}
{% endhighlight %}

## Download

Source including test example files:
[RemotingTestCaseExample.zip](/blog/uploads/2007/11/29/RemotingTestCaseExample.zip)

Happy (asynchronous) testing! ;-)

## Acknowledge

*   **[AS3]** Jonathan Marston: [asunit testing with flash cs3 and actionscript 3](http://marstonstudio.com/index.php/2007/07/28/asunit-testing-with-flash-cs3-and-actionscript-3/)
*   **[AS2]** Tim Beynart - FlashCodersNY: [ASUnit Step-By-Step: Part One](http://www.flashcodersny.org/wordpress/?p=103)
*   **[AS2]** Tim Beynart - FlashCodersNY: [Unit testing for ActionScript 2.0, Part 2](http://www.flashcodersny.org/wordpress/?p=124)

## UPDATE (12/05/07)

[Luke Bayes](http://www.asserttrue.com/) has added the `RemotingTestCase` to [AsUnits repository](http://asunit.svn.sourceforge.net/viewvc/asunit/). Thanks Luke!