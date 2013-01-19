--- 
layout: post
group: blog
title: "Using TextMate for building Apollo applications: Setting up"
tags: 
- Apollo
status: publish
type: post
published: true
meta: 
  _edit_last: "2"
---
In my previous entry I described ["5 reasons for building Apollo applications as a Flash Developer"](http://www.websector.de/blog/2007/03/23/5-reasons-for-building-apollo-applications-as-a-flash-developer/). Today I'll give you an introduction for building an Apollo application without Flex Builder 2 using [Apollo SDK](http://www.adobe.com/go/getapollo) (Alpha) and [TextMate](http://macromates.com/).

<!--more-->

## Instruction

*  Download [Flex 2.0.1 SDK](http://www.adobe.com/devnet/flex/?tab:downloads=1) and the [Apollo SDK](http://www.adobe.com/go/getapollo).
*  Open Terminal and create a new folder typing `mkdir /Applications/flex_sdk2`.
*  Unzip both downloaded files. Type in your opened Terminal window `unzip /{downloadFolder}/flex_sdk_2.zip -d /Applications/flex_sdk2` and `unzip /{downloadFolder}/apollo_sdk_alpha1_031907.zip -d /Applications/flex_sdk2`. Accept the replacing of `"Version.as"` and `"mxmlc.jar"` twice. Note: Don't unzip the files using Stuffit Expander.
*  For installing the Apollo runtime open the `/Applications/flex_sdk2/runtime` in Finder and double-click the `Adobe Apollo.dmg` file. Drag the `Adobe Apollo.frameworkfolder` contained in the *.dmg file to the `/Applications/flex_sdk2/runtime` directory.
*  Configure the [environment variable](http://developer.apple.com/documentation/MacOSX/Conceptual/OSX_Technology_Overview/CommandLine/chapter_8_section_4.html) `$PATH` in your `.bash_profile` with `pico`. Type in Terminal `pico .profile` and add the following line `export PATH=$PATH:/Applications/flex_sdk2/bin/`. Save and close pico. Refresh `.bash_profile` typing (Note the double points with space) `. .bash_profile` and check it with `echo $PATH`.
*  Open TextMate and create a new project named `textMateMeetsApollo.tmproj`.
*  Place a root content for Apollo creating a new file `HelloWorld.mxml` including following code:
{% highlight mxml linenos %}
<?xml version="1.0" encoding="utf-8"?>
<mx:ApolloApplication xmlns:mx="http://www.adobe.com/2006/mxml"
  layout="absolute"
  title="TextMate meets Apollo"
  backgroundColor="0x000000">
  <mx:Label htmlText="TextMate meets Apollo"
    fontSize="28"
 	color="0xFFFFFF"
    horizontalCenter="0"
    verticalCenter="0"/>
</mx:ApolloApplication>
{% endhighlight %}
In this case it's a simple Flex file including a Label component.

*  Then add a XML file called `HelloWorldApp.xml` which defines the properties for your Apollo application:
{% highlight xml linenos %}
<?xml version="1.0" encoding="UTF-8"?>
<application xmlns="http://ns.adobe.com/apollo/application/1.0.M3"
	version="1.0"
	appId="HelloWorld">
	<properties>
		<name>Example for building an Apollo Application with TextMate</name>
		<publisher>sectore [www.websector.de]</publisher>
		<description>A sample Apollo application</description>
	</properties>
	<rootContent systemChrome="standard" transparent="false">HelloWorld.swf</rootContent>
</application>
{% endhighlight %}
*  For easier handling define a TextMate command to compile your Apollo application. Open the project information panel and add two shell variables named `APOLLO_APP` and `APOLLO_DESCRIPTOR.
![](/blog/uploads/2007/03/tm_projectInfo.png)
*  Finally create a command opening the command panel. Add a new bundle named `Apollo` and a new command called `"build"` as well. For running the compiler I've chosen `STRG+ENTER`.
![](/blog/uploads/2007/03/tm_bundleEditor.png)

Source of TextMates build command:

{% highlight bash linenos %}
# Source some support functions we need.
. "${TM_SUPPORT_PATH}/lib/html.sh"
. "${TM_SUPPORT_PATH}/lib/webpreview.sh"

html_header "TextMate meets Apollo"

echo '<h2>Building Apollo App"'
echo $APOLLO_APP
echo '"</h2>'
echo '<p>'
amxmlc $TM_PROJECT_DIRECTORY/$APOLLO_APP
echo '</p>'

echo '<h2>Test Apollo App "'
echo $APOLLO_DESCRIPTOR
echo '"</h2>'
echo '<p>'
adl $TM_PROJECT_DIRECTORY/$APOLLO_DESCRIPTOR
echo '</p>'

html_footer
{% endhighlight %}

## Screen shots

###TextMates output window

![](/blog/uploads/2007/03/tm_outputWindow.png)

###Apollo window

![](/blog/uploads/2007/03/apollo_window.png)

## Download

Source: [textMateApolloExample.zip](/blog/uploads/2007/03/31/textMateApolloExample.zip)

## Links

*   Open book: ["Apollo for Flex Developer"](http://labs.adobe.com/wiki/index.php/Apollo:Books:Apollo_for_Adobe_Flex_Developers_Pocket_Guide)
*   Adobe Labs: [ Installing and configuring the Apollo SDK](http://labs.adobe.com/wiki/index.php/Apollo:Documentation:Set_up_instructions_for_Flex_SDK_users#Installing_and_configuring_the_Apollo_SDK) and [Creating an Apollo application using the command line tools](http://labs.adobe.com/wiki/index.php/Apollo:Documentation:Creating_an_Apollo_application_using_the_command_line_tools)
*   Adobe Apollo Forum: [Can not unzip the SDK on a Mac](http://www.adobe.com/cfusion/webforums/forum/messageview.cfm?forumid=72&catid=641&threadid=1252936&highlight_key=y&keyword1=sdk)

## Feedback and suggestions

Feedback and suggestions for improvement are welcome, especially smarter commands for TextMate ;-) .

<strike>And is there anyone out there to create an Apollo bundle script for TextMate feel free to drop a comment, too.</strike>

## Update (04/04/07)

I've just found that [Tyler Hall](http://www.sitening.com/blog/) has already build an Apollo bundle for TextMate. [Check it out](http://www.sitening.com/blog/2007/03/23/adobe-apollo-bundle-for-textmate/)!