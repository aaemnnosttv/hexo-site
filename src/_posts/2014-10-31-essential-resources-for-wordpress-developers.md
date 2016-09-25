---
title: Essential Resources for WordPress Developers
id: 491
categories:
  - Articles
date: 2014-10-31 13:19:56
tags:
---

A few months ago, I was drafted by my friends over at [Tuna Traffic](http://tunatraffic.com "Tuna Traffic") as the team's _WordPress Master General_.  So far everything has been really great and they've been a fantastic group of people to work with.

The team is growing at what seems to be a near exponential rate as we will be welcoming our newest member next week!  Tasked with the responsibility of making sure our new bundle of joy is able to hit the ground running, I decided to compile a list of my most valuable resources and references that I use every day, available for all, right here.

## The List

#1 [The Codex](http://codex.wordpress.org/) - the online manual for WordPress and a living repository for WordPress information and documentation.

The Codex has documentation that covers pretty much everything and then some, which is great, but if you're new to WP, digging through the documentation by yourself could be a bit intimidating, so I'm going to highlight some of the most important/useful bits.

*   [Plugin API](http://codex.wordpress.org/Plugin_API) - The core of the Plugin API outlines _actions_ and _filters,_ the two kinds of hooks that WordPress provides to extend and modify its behavior.  This is more of a one time read and will only be useful for beginners and those that are new to WP.  Once you get the basics of hooks in WordPress, you won't really need to revisit it.  It's kind of like riding a bike. :)
*   [Function Reference](http://codex.wordpress.org/Function_Reference) - A comprehensive list of just about every function in WordPress, with links to the function's own Codex page for those that have one.  For each function, it's respective page contains information about each accepted parameter, the possible return values, and many have several code examples as well.  As part of the Codex, it is an evolving documentation that has lots of useful notes and important things to keep in mind, such as execution timing, and common problems/solutions.
*   [Action Reference](http://codex.wordpress.org/Plugin_API/Action_Reference) - Part of the Plugin API reference, if I had a nickel for all the times I've referred to the top half of this page, I'd have a shit load of nickels.
In all seriousness though, this one reference is so important because it lays out all of the core actions, in order, with additional information available for most of them.
*   [WP_Query Reference](http://codex.wordpress.org/Class_Reference/WP_Query) - Just about everything you need to know about one of the most important and fundamental aspects of working with WordPress.
#2 [Developer Code Reference](https://developer.wordpress.org/reference/) - one of the newest additions to the core developer resources, it provides quick access via search to all core functions, actions/filters, classes, and methods!  This is a great resource if you're looking for more information about a particular [any of those things].  Compared to the codex, this one is geared towards more experienced developers and is more of a window into the source code itself, than a how-to.  All-in-all, a fantastic resource.
_Note:  I have noticed that there are some inconsistencies/inaccuracies within the documentation here regarding function signatures in the descriptions.  Double check the source!_

#3 [QueryPosts](http://queryposts.com/) - very similar to the Developer Code Reference (and possibly even the inspiration for it), QueryPosts was released long before the DCR was available but currently only serves as a function reference.  Built by [WordPress Stack Exchange moderator](http://wordpress.stackexchange.com/users/847/rarst) and well-known WP expert Andrey “Rarst” Savchenko ([rarst.net](http://www.rarst.net/)).  I really like this site for it's elegant design and it's all around well-doneness (for lack of a better term).

A few features that set QP apart are:

*   Non-user manual-esque design
*   Real-time search suggestions
*   Links to related functions on function pages.
*   Links to placement in source on both WordPress Github repository &amp; WP Trac code browser.
#4 [WordPress/WordPress](https://github.com/WordPress/WordPress) - The WordPress git mirror of the core SVN repository, synced every 15 minutes.  Great for searching across the entire codebase.  Nuff' said.

#5 [WordPress on StackExchange](http://wordpress.stackexchange.com/) - The dedicated WordPress forum on StackExchange. Have a problem that has yet to be answered?  Not likely!  A lot of great answers here, and no better place to ask if you still need an answer.

#6 Rarst's "Making Sense of __" Infographics - Ok, we're starting to develop a pattern here, but seriously, these are fantastic.  A great resource especially for the new to WordPress.

*   [Make sense of WordPress query functions](http://www.rarst.net/wordpress/wordpress-query-functions/)
*   [Make sense of WordPress core load](http://www.rarst.net/wordpress/wordpress-core-load/)
#7 Solid Debugging Tools - Tripping over yourself is a natural part of growing as a developer. We learn by failing.  The quality of your debugging tools greatly determines how much hair you're likely to retain long-term.

*   [Debugging in WordPress](http://codex.wordpress.org/Debugging_in_WordPress) - The Codex's overview on debugging and related constants.
*   [Debug Bar](https://wordpress.org/plugins/debug-bar/) - The "Mothership" of debugging plugins.  Quite a versatile tool, there are many extensions for this plugin alone (including my own below), allowing you to add what you need.
*   [Dev Debug](https://github.com/aaemnnosttv/dev-debug) - My own hand-rolled debugging tool that has evolved over many years of working with WordPress.  It's by no means a one-stop-shop for debugging tools, but it's something I use everyday to analyze the data I'm working with.

### Miscellaneous other helpful resources

*   [WordPress Coding Standards](https://make.wordpress.org/core/handbook/coding-standards/php/) - Information about how to code "The WordPress Way".  Useful for those who are interested in contributing to core, or are a new developer looking to make a solid start.
*   [WordPress Database Search &amp; Replace](https://interconnectit.com/products/search-and-replace-for-wordpress-databases/) by interconnect/it - A great utility for doing safe search/replace in your database.
*   [WP Constants Reference](http://wpengineer.com/2382/wordpress-constants-overview/) - There are quite a few constants used in WordPress.  Some can be changed and others are just good to know.  This site puts together a nice reference for them.
*   [The Anatomy of a Theme by Yoast](https://yoast.com/wordpress-theme-anatomy/) - Great crash course in the basic parts of a theme.
*   [WP Salt Generator](https://api.wordpress.org/secret-key/1.1/salt) - Make sure any new install always has unique security keys &amp; salts or you're asking to be hacked!
*   [Dashicons](https://developer.wordpress.org/resource/dashicons/) - the official icon font of the WordPress admin as of 3.8\.  Icon fonts are all the rage these days, and for good reason!  Why not leverage the ones that are already built-in for your plugin/theme?
&nbsp;

### Did I miss something?

Do you have a great resource that has been an invaluable asset for you or your team?  Drop it in the comments below!