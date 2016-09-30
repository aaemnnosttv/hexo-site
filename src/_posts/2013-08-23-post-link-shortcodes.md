---
title: Post Link Shortcodes
categories:
  - Plugins
date: 2013-08-23 18:39:53
tags:
  - Teaser
---

A new plugin is coming soon!  How soon you ask?  Well, that all depends on how fast the folks over at WP Plugin Review HQ have their[ drinking bird toy pecking the Y key](http://www.youtube.com/watch?v=fldj5GXMy6o).   But if you stay tuned to this website that has only existed for a matter of minutes, you'll be the first to know when it hits the WP Plugin Repository!

Aptly titled, _Post Link Shortcodes_, the plugin dynamically creates .. shortcodes .. for each registered post type.  These ..shortcodes.. can be used to create ...links... that is (crudely) `<a href="blah">blah</a>` to the post, post type archive OR just return the URL for either.

Each post type will have 4 shortcodes created for it where `posttype` is the name of the post type. Eg: `post` or `page`

```
[posttype_url]
[posttype_link]
[posttype_archive_url]
[posttype_archive_link]
```

The shortcodes themselves are also quite powerful and very flexible allowing you to add as many attributes as you which that will be turned into html attributes of the link.

That's all for now.  There's much more to say about it, but it's not even approved yet!

For those who can't wait, check it out on [GitHub](https://github.com/aaemnnosttv/Post-Link-Shortcodes)!
