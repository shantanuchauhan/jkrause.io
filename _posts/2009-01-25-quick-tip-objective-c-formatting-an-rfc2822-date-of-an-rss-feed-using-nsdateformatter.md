--- 
layout: post
group: blog
title: "Quick tip (Objective-C): Formatting an RFC2822 date of an RSS feed using NSDateFormatter"
tags: 
- iPhone
- Objective-C
status: publish
type: post
published: true
meta: 
  _edit_last: "2"
---
Parsing an [RFC2822](http://www.faqs.org/rfcs/rfc2822.html) date of an RSS feed and formatting it using [NSDateFormatter](http://developer.apple.com/DOCUMENTATION/Cocoa/Reference/Foundation/Classes/NSDateFormatter_Class/index.html) (e.g. "`Tue, 16 Dec 2008 11:45:13 +0000`" to "`16. December 2008`") is not easy as it seems. Fortunately there are already some helpfull tips and articles out there, such as fiam's solution described at  "[Parsing RFC2822 dates with NSDate](http://fi.am/entry/parsing-rfc2822-dates-with-nsdate/)", Anatoliy Kolesnick's article called "[Parse Date from RSS to NSDate](http://blog.t-l-k.com/i-phone/2008/parse-date-from-rss)" or the helpful article "[Advanced Strings In Cocoa](http://cocoacast.com/?q=node/87)" posted at [CocoaCast](http://cocoacast.com/).

All these solutions work great for me using the iPhone Simulator. But if you test your code on a real device (iPhone or iPod touch), you may run in an issue.

<!--more-->

In my situation, all dates were not formatted well on my device, there are `nil`. It took me about 5 hours (I'm not kidding ;) ) to figure out, that the NSDateFormatter uses the current locale of a device for formatting dates.

On my device the locale is "German (Germany)" no matter if I change the settings to English or to any other language (Settings -> General -> International). As a result a month declared as "Dec" will be failed by NSDateFormatter on an iPhone using a German locale. It should be "Dez", the shortcut for "Dezember".

## Solution

To format an RFC2822 date well on any foreign device you have to force the locale to "en_US". ( Note: That's not necessary for any English or American user ;) )

{% highlight objective-c linenos %}
//
// Example of formatting the date string
// "Tue, 16 Dec 2008 11:45:13 +0000"
// to
// "16. December 2008"
//

NSString *feedDateString = @"Tue, 16 Dec 2008 11:45:13 +0000";
//
// A formatter to create a date using the RFC2822 date of a RSS feed
NSDateFormatter *inputFormatter = [[NSDateFormatter alloc] init];
// Note: We have to force the locale to "en_US" to avoid unexpected issues formatting data
NSLocale *usLocale = [[NSLocale alloc] initWithLocaleIdentifier:@"en_US"];
[inputFormatter setLocale: usLocale];
[usLocale release];
// set the format based on an RFC2822 date format
[inputFormatter setDateFormat:@"EEE, dd MMM yyyy HH:mm:ss Z"];
// create a NSDate object using the NSDateFormatter
NSDate *formattedDate = [inputFormatter dateFromString: feedDateString];
// format the date created before to a format of your choice, such as "16. December 2008"
NSDateFormatter *outputFormatter = [[NSDateFormatter alloc] init];
[outputFormatter setDateFormat:@"d'.' MMMM yyyy"];

NSLog(@"formattedDateString : '%@'", [outputFormatter stringFromDate:formattedDate]);

[inputFormatter release];
[outputFormatter release];

{% endhighlight %}


BTW: For checking the locale on your device use the following snippet:

{% highlight objective-c linenos %}
NSLocale *locale = [NSLocale currentLocale];
NSString *localeId = [locale displayNameForKey:NSLocaleIdentifier
								value:[locale localeIdentifier]];

NSLog(@"localeId: '%@'", localeId);

{% endhighlight %}

-Jens
