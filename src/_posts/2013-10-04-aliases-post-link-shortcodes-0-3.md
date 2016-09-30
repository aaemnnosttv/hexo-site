---
title: Aliases! Post Link Shortcodes 0.3
tags:
  - Release
id: 23
categories:
  - How To
  - Plugins
date: 2013-10-04 13:47:45
---

When I first started what would eventually become this plugin a few years ago, it was very basic; I never though it would turn into something like this.  I'm happy to say that I'm glad it did.

If this is your first time here, or you're already totally confused and have no idea what Post Link shortcodes is or does, take a minute and [get yourself up to speed here](http://wordpress.org/plugins/post-link-shortcodes/).

Today with the release of version 0.3 - which will be hitting the plugin repository shortly - I'm really excited to introduce _aliases_.

Aliases are new shortcodes that can be added (by you) that "forward" or reference a dynamic PLS shortcode.

### Why Aliases?

I thought you'd never ask!

##### Compatibility

You may already have an existing shortcode by the same name that does something a little differently and you don't want to go through your whole website to change it.

PLS respects existing shortcodes and will not overwrite them; which happens by default when adding new shortcodes. (ie: you already have a shortcode named `page_link`)

In this case, you could easily setup a new shortcode, say: `article` or `blog` to reference `post_link`.  This is what PLS refers to as an alias.

> Aliases are kind of like a shortcut for PLS shortcodes.

##### Convenience / Awesomeness

This is where things get freaking cool.

Aliases allow you to optionally _define default shortcode attribute values._  And if that isn't cool enough, not only can they the defined as simple default values (which can be overriden by the passed shortcode value), they can also be defined as _additive values_ that are either **prepended** or **appended** to the passed shortcode value.

Wow.  In [Apu's words](http://youtu.be/61kHpmenkT8 "Reference"):

> ...Such a thing has never been done.

###  Let's Recap

*   An alias is like a shortcut between a new shortcode to a PLS shortcode
*   Aliases can be setup with default values for shortcode attributes
*   Default values can be prepended or appended to the passed shortcode value.

### Practical Use

Now that we know what the features are, let's see how we could use them in real world applications to make our lives easier.

Let's say that we have a PLS that we want to reuse over and over throughout our site that links to our Contact page.

As a page, the PLS shortcode would be: `[page_link contact]`
This would create an anchor that links to the contact page (assuming the slug for the page is 'contact', but with that title it would default to that).  The inner text of the anchor would also default to the page title, "Contact".

Let's say we want to give it some special styling to bring more attention to it.

We could add a class to the link that we would then use to add some custom highlighting style like so: 

```
[page_link contact class="call-to-action"]
```

Cool, not bad!  Getting a little bit big though..  And what if we wanted to change the link text too..  

```
[page_link contact class="call-to-action" text="Contact us for a free consultation"]
```

This is quickly turning into quite a large shortcode.  And if we're using this across many pages, it can make changing them all later a bit of a headache.

##### Setup The Alias

PLS provides a function `pls_add_shortcode_alias()` for registering a new alias which will then add our new shortcode for us and handle all the heavy lifting.

This function can be called anytime after the plugin is loaded and accepts 3 arguments:

1.  the new shortcode name (ie: `consult` or `blog`, similar to `add_shortcode`)
2.  the shortcode name of the PLS shortcode to reference (`page_link`, `post_link`, etc.)
3.  (optional) array of defaults - see below

In our plugin or theme we can add this code to setup our new alias:

```php
pls_add_shortcode_alias('consult', 'page_link', array(
    'slug'  => 'contact',
    'class' => 'call-to-action',
    'text'  => 'Contact us for a free consultation'
));
```

This will add a new shortcode `[consult]` that is already setup with all of those shortcode attributes as default values.

In a nutshell:  Now using `[consult]` is the same as`[page_link contact text="Contact us for a free consultation"]`.

What isn't obvious is that `[consult]` _is still a Post Link Shortcode_.  That means that if you want to add a html id to the link, it's simply `[consult id="my_ID"]` or use a different link text, simply override it `[consult text="Contact Us Today"]`.  The limitation is only that the PLS shortcode tag that is aliased - in this case `page_link` - is not changeable on a per-use basis.  That is, `[consult]` will always refer to `page_link` unless defined otherwise.

### Additive Attributes

So if default values weren't cool enough, what if you wanted to define an alias with a base set of defaults, some of which you would want to be able to add to rather than override?

Let's say we want to add a cool bootstrap icon inside our link to our contact page.  We want it to always show up before our link text, but we still want to be able to control that text without reentering the code for the icon every time.

Back to our (slightly modified) alias definition:

```php
pls_add_shortcode_alias('consult', 'page_link', array(
    'post_id' => 15, // this is the contact page
    'class'   => 'call-to-action',
    '+text'   => '<i class="icon-envelope"></i> '
));
```

The `text` attribute which controls the inner text of the anchor has changed to `+text`.
The `+` on the left side of the attribute name indicates that we want to _prepend_ the default to the shortcode-passed value, or if it isn't passed, use it as the default value.

If we wanted to _append_ instead to the end of the shortcode-passed value, the attribute would be `text+` respectively. The position of the `+` indicates where the prepended/appended content will go relative to the shortcode-passed value.

**This syntax and ability applies to all attributes!**

**Note:** in the new alias definition above that I changed the `'slug' => 'contact'` to `'post_id' => 15`.  Using the `post_id` will save a query the first time.  It's probably not at all noticeable from a performance standpoint.  I generally prefer to use the post slug with PLS shortcodes for it's semantic value, so you can see what page/post it's actually linking to, where if you're using the ID, it's not obvious at all.

More importantly, it protects the integrity of the link as post slugs can be changed, whereas the post_id will always be the same.

Basically, there's really no reason to use the slug to establish the target for an alias, as the target can simply be added as a comment above if it's not obvious from the shortcode name.

### Closing Arguments

That's it.  I hope y'all dig it -  with 2 shovels.
