--- 

layout: post
comments: true

group: blog
title: "Quick tip (AIR): Signing an ANE (ActionScript Native Extension)"
tags: 
- AIR
status: publish
type: post
published: true
meta: 
  _edit_last: "2"
  _wp_old_slug: ""
  dsq_thread_id: "987386988"
---
If you package an [Native Extensions](http://www.adobe.com/devnet/air/native-extensions-for-air.html) for latest [Adobe AIR 3.0](http://www.adobe.com/products/air.html) you will have an option for signing it with a certificate as well.

The packaging process of creating ANE (ActionScript Native Extension) files is already well documented (check "[Packaging a native extension](http://help.adobe.com/en_US/air/extensions/WSf00ab63af761f170-168f6f2a129378b935d-8000.html)" at Adobes AIR documentation). However, it's not easy to find a detailed instruction for signing an ANE file. Maybe because it is optionally... Here are few tips:

<!--more-->

## Tips

* Signing an *.ane file is almost the same thing as signing an *.air file. So you can use an [own self-signed certificate](http://help.adobe.com/en_US/air/build/WS5b3ccc516d4fbf351e63e3d118666ade46-7f74.html) or [an obtained certificate](http://help.adobe.com/en_US/air/build/WS5b3ccc516d4fbf351e63e3d118666ade46-7ff0.html#WS5b3ccc516d4fbf351e63e3d118666ade46-7c65)
* Because the current Flash Builder (v.4.5) does not support packaging and signing ANE files, you have to use the command line tool ADT.
Here is an example of packaging an ANE for using it on the iPhone (without signing):
`adt -package -target ane MyExtension.ane extension-descriptor.xml -swc MyExtension.swc -platform iPhone-ARM library.swf MyExtension.a -platform default library.swf`.
More information about all command line options you will find here: "[ADT example for packaging an extension](http://help.adobe.com/en_US/air/extensions/WSf268776665d7970d-2482335412ffea65006-8000.html#WSf268776665d7970d-6be13ace1308aaebeca-8000)".
* To sign an ANE file just add the needed _signing options_ to the command line options after _-package_ and before _-target_. You will find all available signing options [here](http://help.adobe.com/en_US/air/build/WS5b3ccc516d4fbf351e63e3d118666ade46-7f72.html).
An example of packaging and signing an ANE for using it on the iPhone looks like:`adt -package -storetype pkcs12 -keystore my_certificate.p12 -keypass my_password -target ane MyExtension.ane extension-descriptor.xml -swc MyExtension.swc -platform iPhone-ARM library.swf MyExtension.a -platform default library.swf`

## Acknowledge:

*   Adobe AIR documentation: "[Developing Native Extensions for Adobe AIR](http://help.adobe.com/en_US/air/extensions/index.html)"
*   Adobe AIR documentation: "[Signing AIR applications](http://help.adobe.com/en_US/air/build/WSfffb011ac560372f-19aa73f128cc9f05e8-8000.html)"
*   Adobe ADC - Daniel Koestler: "[Developing native extensions for Adobe AIR](http://www.adobe.com/devnet/air/articles/developing-native-extensions-air.html)" -> Chapter "Packaging a native extension"
*   Adobe: "[Developing ACTIONSCRIPT® Extensions for ADOBE® AIR®](http://www.adobe.com/content/dam/Adobe/en/devnet/devices/pdfs/DevelopingActionScriptExtensionsForAdobeAIR.pdf)" (PDF) -> Chapter "Packaging a native extension for AIR for TV devices"