---
title: 'Shortcode Aliases: The Plugin - Coming Soon to a Plugin Repository Near You!'
id: 501
categories:
  - Plugins
date: 2015-07-10 13:20:06
tags:
---

Inspired by the original concept introduced in [Post Link Shortcodes v0.3](http://aaemnnost.tv/2013/10/04/aliases-post-link-shortcodes-0-3/), I realized that the ability to create shortcode aliases was something that should available for any shortcode. I broke ground on the `shortcode-aliases-api` plugin several months ago, but it's been on the back burner ever since.  Despite the delay, the initial release is finally coming!

## So What Is A Shortcode Alias?

In a nutshell, it's a shortcode that kind of behaves as a "shortcut" to another shortcode.  Conceptually, it's very close to a symbolic link, for those who are hip to that kind of thing.

More specifically, it is a real shortcode, which _resolves_ to an existing callback for another shortcode.

In PHP, we could make a very primitive alias like so:
<pre class="">global $shortcode_tags;

add_shortcode("gall3ry", $shortcode_tags['gallery']);</pre>
This would register a new `[gall3ry]` shortcode, to work exactly the same as the built-in WordPress `[[gallery]]` shortcode.

All we're doing here is registering a new shortcode to share the same callback as another existing shortcode.

While this may work fine in some cases, there may be cases where it will not work as expected.  One problem comes when shortcode callbacks utilize the parameter for the called shortcode `$tag` which is passed as the 3rd argument to a shortcode callback.  I should mention that there's nothing wrong with using this argument -- in fact it can be quite helpful when writing shortcodes!

Consider this simple example using a new `div` shortcode:
<pre class="lang:default decode:true">function wrap_sc( $atts, $content, $tag )
{
    return "&lt;$tag&gt;$content&lt;/$tag&gt;";
}
add_shortcode('div', 'wrap_sc');</pre>

This would give us a shortcode that would produce some simple output like this:

<pre class="lang:default decode:true">[div]some content[/div]</pre>
<pre class="lang:default decode:true">&lt;div&gt;some content&lt;/div&gt;</pre>

If we aliased this shortcode using the method above, whatever shortcode name we chose, would affect the output.

Using our primitive method would be no different than this:

<pre class="">add_shortcode('alias', 'wrap_sc');</pre>

Such a shortcode would produce this:

<pre class="lang:default decode:true">&lt;alias&gt;some content&lt;/alias&gt;</pre>

While that may be desirable in some cases, that's not what we're trying to achieve here.  We want our alias to behave - by default - exactly the same as if we had used the original.

> A shortcode by any other name should be just as sweet, or more.

## So... why?

Just being able to call a shortcode by a different name, doesn't offer a whole lot of utility.  The SAA is not nearly as primitive as our example, so things will work as expected.  Even still, let's explore some of the possible use cases.

### Abstraction - Shortcodes as an Interface

Many plugins use namespaced shortcodes to avoid possible tag collisions.  Unlike function or class names, which produce a fatal error in the case of a name collision, if two shortcodes are registered with the same name, it's a simple game of "last one wins".  There can be only one callback for a given tag, so the last one registered with the same tag name is the one that "owns" it.

Instead of using the concrete namespaced _implementations (eg: `xzy_responsive_column`)_, the target shortcodes could be aliased into semantic/expressive references to them (eg: `column`).  Later if you so desired, a different implementation could be swapped in by changing the target of the alias, without having to make any change in the _usage_ of the shortcode within the database.

But how then would we reconcile the differences in the shortcode attribute names between implementations, you ask?  Filters.

This leads me to another feature/use-case:

### Extensibility

Not all shortcodes follow a particular convention.  If you ever found yourself wanting to be able to filter the attributes (`$atts`) or the `$content` or even the returned output of a given shortcode, only to find that it wasn't made available to you by the developer, you were out of luck -- until now.  _All of those things are made possible via the Shortcode Alias API!_

Going back to the previous use case of abstraction: using the filters which are made available for every shortcode alias, it would be possible to use a filter as a kind of an _adapter_ of sorts between the attributes used (the interface), and the API of the shortcode's implementation.

Perhaps that sounds silly, but imagine changing the _usage_ on site with thousands of posts?  Now imagine, making that work -- _without changing the database_.  As mentioned, changing implementations or "target shortcodes" will almost certainly not be as simple as just changing the shortcode name.  Some "translation" would be required, and Aliases make that possible.

So simply by registering an alias, it's attributes, content, and output are all filterable!

## Defaults

One of the core features of a `shortcode-alias-api` alias is the ability to register defaults for the shortcode's attributes and content.

This is especially useful for target shortcodes which are very versatile.

If you notice yourself repeating a lot of the same attributes with the same shortcode, this is probably a good use case for an alias!

For example, if you had an `events` shortcode, which had many attributes for filtering and displaying its output, these could be pre-set by an alias with defaults.

Eg:
<pre class="">[events view=calendar dates=past range=1 title="Past Events"]</pre>
might be aliased with defaults to produce the same result with:
<pre class="">[past_events_calendar]</pre>
These are in fact _defaults_ so nothing is set in stone*.  The alias would be able to override any set default simply by using the same attribute normally like so:
<pre class="">[past_events_calendar range=3]</pre>
Where the `range` attribute might control the number of weeks/months of events to show.

* - Alias defaults can be registered to optionally force a defined value, regardless of the shortcode-passed value.

## 

## Enter the Shortcode Alias API

I'm referring to this plugin as an API, because it simply offers the functionality; no UI or options.

The plugin introduces a few new functions which aim to follow the existing Shortcode API as closely as possible.

For more information, [read the documentation](https://github.com/aaemnnosttv/shortcode-alias-api/wiki).

[View the source or contribute on GitHub!](https://github.com/aaemnnosttv/shortcode-alias-api)
