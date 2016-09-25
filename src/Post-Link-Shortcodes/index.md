---
title: Post Link Shortcodes
id: 48
date: 2014-01-23 19:34:24
---

#### Prologue

This plugin arose out of a need for easy-to-use dynamic links to posts and archive pages.

At the time, I was working on a bilingual website for a company that had content in English and Spanish.  Because the displayed language was set by the URL, each link was different depending on what the current language was.

This was automatically handled for navigation menus but links to internal pages within the main content would have to be configured manually.  There is probably a number of ways this could have been handled, but I chose to use shortcodes to .

#### What It Does

In essence, Post Link Shortcodes uses minimal bits of information to return the permalink (optionally wrapped into a fully-customizable anchor) to a given post - of any type - or it's archive page if the post type supports it.

PLS shortcodes are registered dynamically, 4 for each registered post type.  The format is as follows: `{post_type}_{(url|link)}[_archive]`.

Instead of requiring a silly number of attributes, PLS extracts these critical bits of data from the shortcode tag itself.

#### Attributes

*   `post_id` - target post ID.
*   `slug` - target post slug (`post_name`)
*   `text` - (link only, optional) inner text/html of anchor as an alternative to using an enclosed shortcode.
For targeting a single post, the only required attribute is either a `post_id` or the `slug`.

#### Relayed Attributes

In addition to these, extra attributes can be used as desired, which in the case of a link shortcode are passed on as attributes of the anchor.

Eg. `[[page_link slug=sample-page id=awesome /]]` returns `&lt;a href="..." id="awesome"&gt;Sample Page&lt;/a&gt;`

For passing attribute names with hyphens, simply use underscores instead.
That is: `[[page_link slug=sample-page data_target=#mytab /]]` returns `&lt;a href="..." data-target="#mytab"&gt;Sample Page&lt;/a&gt;`