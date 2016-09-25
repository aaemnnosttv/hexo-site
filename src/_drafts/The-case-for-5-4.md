---
title: The case for 5.4
id: 497
categories:
  - Articles
tags:
---

After roughly a year since its last update, I'm happy to announce that I've been working on some big improvements to Post Link Shortcodes recently, and version 0.4.0 is getting very close to completion!

One of the big changes that some may see, is that the plugin now requires PHP 5.4 or above.  It's unfortunate that this may cause some poor souls who are still stuck in the dark ages of PHP to rollback the update, but let's face it: WordPress sets the bar pretty low when it comes to the minimum required version of PHP.  At the time of this writing, [the minimum required version for WordPress](https://wordpress.org/about/requirements/) is 5.2.4, _although 5.4+ is recommended_.

Unfortunately, this has a big impact on plugin and theme developers.  Using PHP features that only exist in 5.3 or above could paralyze some user's website if the author didn't properly check for compatibility first.  This also means that some percentage of WordPress sites will be unable to use said theme or plugin.

The good news is that most hosts are _at least_ running some version of 5.3 or higher, and many shared hosts provide the option to choose a newer version through the admin panel.  In my experience, managed hosts such as WP Engine and Flywheel are already running 5.5.

So what's the big deal?  [PHP 5.2 has been dead for almost 4.5 years](http://php.net/eol.php).  Completely unsupported, with no updates to come again, ever.  5.3 met its maker last August, and even 5.4 is awaiting its fate [in just a few months](http://php.net/supported-versions.php).  5.5 is no spring chicken either; only days away from the end of its period of active development after which, it will only receive critical security updates for 1 year.

In other words, any host still running 5.3 or below is more than a little behind in keeping their server-side scripting languages up to date, and if your host is unable or unwilling to upgrade, you might want to seriously consider moving to a _real host_.  (This is the part where I'm supposed to drop in my affiliate link and make a strong referral.  I don't actually have one of those.)

Support aside, the features introduced in [5.3](http://php.net/manual/en/migration53.new-features.php) and [5.4](http://php.net/manual/en/migration54.new-features.php) are - in my opinion - some of the most substantial of all 5.x releases, and are paramount to modern PHP development:

*   Namespaces
*   Closures
*   Late static binding
*   Traits
_...just to name a few._

&nbsp;