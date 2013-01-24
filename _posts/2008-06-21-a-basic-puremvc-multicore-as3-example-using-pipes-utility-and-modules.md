--- 

layout: post
comments: true

group: blog
title: A basic PureMVC MultiCore AS3 example using Pipes Utility and Modules
tags: 
- Flex
- Open Source
- PureMVC
status: publish
type: post
published: true
meta: 
  _edit_last: "2"
---


These days I've been playing around with the latest cool utility for [PureMVC MultiCore AS3](http://trac.puremvc.org/PureMVC_AS3_MultiCore) called "[Pipes Utility](http://trac.puremvc.org/Utility_AS3_MultiCore_Pipes)" developed by [Cliff Hall](http://puremvc.org). It's a very helpful and powerful utility to communicate among all core actors of a module based application using [PureMVC](http://puremvc.org).

For a better understanding I created a basic example using [modules](http://livedocs.adobe.com/flex/3/langref/mx/modules/Module.html). It's just a simple app called "HelloPipes", which loads and unloads a module for communicating with its shell using Pipes. Module and shell are acting as a core based on PureMVC MultiCore AS3.

The following example including full source may help anybody who is interested in the new Pipe Utility too ;-) .

<!--more-->

## Example

[![](/blog/uploads/2008/06/21/screenHelloPipes.png)](blog/uploads/2008/06/21/HelloPipesShell.html)

## Tips using Modules, PureMVC MultiCore AS3 and Pipe Utility

*   Don't import any classes of a PureMVC MultiCore module within the shell (main application) to avoid any issues at runtime loading and unloading a module. To define constants for using Pipes such as output and input pipe names, which are shared between shell and module, don't use a reference to any actor. Use a simple "common" class instead, which stores only these constants for sharing by shell and module. Check the `PipeAwareModuleConstants.as` within the example above.
*   For communicating from shell to module and return without Pipes use well defined interfaces for the same reason mentioned before.
*   Clean up your module to avoid any issues loading and unloading it again. This may be helpfull for a successful garbage collection as well. Check out the code for the module within the example above, which uses an Interface called `IPipeAwareModule`. Using this interface the shell forces the cleaning up process of the module before the module will be unloaded.
*   Disconnect and unregister (if necessary) Pipes connecting shell and modules, when a module is unloaded.
*   Remove all PureMVC core actors of a module using `facade.removeCore` before a module is unloaded to avoid issues reloading it.
*   General issue: To reduce the file size of a module use the compiler option called `load-externs`. For detailed information check the Flex 3 Help: "[Compiling modules - Reducing module size](http://livedocs.adobe.com/flex/3/html/modular_4.html#170594)"

## Helpful links

*   ["Understanding PureMVC Pipes"](http://www.joshuaostrom.com/2008/06/15/understanding-puremvc-pipes/) by Joshua Ostrom. Great tutorial!
*   PureMVC Forum entry: "[Pipes - A PureMVC AS3 MultiCore Utility](http://forums.puremvc.org/index.php?topic=457.0)"
*   Pipe Utility example named "[PipeWorks](http://trac.puremvc.org/Demo_AS3_MultiCore_Flex_PipeWorks)" by Cliff Hall


## Full source

[HelloPipesSource.zip](/blog/uploads/2008/06/21/HelloPipesSource.zip)

## UPDATE (08/25/08)

Source has been updated using [PureMVC 1.0.5 MultiCore](http://puremvc.org/content/view/90/181/).

Have fun! ;-)
