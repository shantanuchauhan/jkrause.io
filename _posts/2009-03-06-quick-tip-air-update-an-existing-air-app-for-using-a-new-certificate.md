--- 

layout: post
comments: true

group: blog
title: "Quick tip (AIR): Updating an existing AIR app for using a new certificate"
tags: 
- AIR
status: publish
type: post
published: true
meta: 
  _edit_last: "2"
---
First of all thanks Adobe for sponsoring a [Thawte](http://www.thawte.com) certificate after adding [ThunderBolt AS3 Console](http://code.google.com/p/flash-thunderbolt/wiki/ThunderBoltAS3Console) to the [new Adobe Marketplace](http://www.adobe.com/cfusion/marketplace/index.cfm?event=marketplace.offering&offeringid=10762)!

If you will ever certificate an existing AIR app with a new certificate, such as a [Thawte](http://www.thawte.com) certificate, you have to migrate it.

<!--more-->

## Migration

What does "migrate" mean? It's like an injection for an AIR app with all needed information about old and new certificate. You have to do it to avoid any troubles updating an existing AIR app by users. Just follow the next steps:

*  Build your AIR app as always using Flex Builder and signing it up with the new certificate ( Project -> Export Release Build )
*  Open Terminal and go to project folder typing `cd {pathToYourProject}` &nbsp;
*  Migrate your new AIR app with the old certificate using `-migrate` command. Note: To run this command make sure that you have added the bin folder of Flex SDK as a PATH environment variable before.
   {% highlight bash %}
   adt -migrate -storetype {fileTypeOfOldCertificate} -keystore {pathToOldCertificate} {appJustCreated}.air {newMigratedApp}.air
   {% endhighlight %}
*  Type password of the old certificate and that's it!
*  For updating ThunderBoltAS3 Console I did it as follow:

{% highlight bash %}
adt -migrate -storetype pkcs12 -keystore air_websector_certificate.p12 ThunderBoltAS3Console.air ThunderBoltAS3Console_v2.2.air
{% endhighlight %}

## Some notes:
* `pkcs12`_ - store type of the old certificate (such as JKS, PKCS12, PKCS11, KeychainStore, Windows-MY or Windows-ROOT)
* `air_websector_certificate.p12` - path to the old certificate
* `ThunderBoltAS3Console.air` - app which has been built before with a new certificate
* `ThunderBoltAS3Console_v2.2.air` - app which has to migrate5.  For more information check "[Changing certificates](http://help.adobe.com/en_US/AIR/1.5/devappsflex/WS5b3ccc516d4fbf351e63e3d118666ade46-7ff0.html#WSFAB6E5EB-316A-42b0-81A3-0BC232ACD99A)" and "[Signing an AIR file to change the application certificate](http://help.adobe.com/en_US/AIR/1.5/devappsflex/WS13ACB483-1711-43c0-9049-0A7251630A7D.html)" at [LiveDocs for Adobe AIR](http://help.adobe.com/en_US/AIR/1.5/).

-Jens

