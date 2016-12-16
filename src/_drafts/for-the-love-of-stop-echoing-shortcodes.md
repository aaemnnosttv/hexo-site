---
title: For the love of... stop echoing shortcodes
id: 541
categories:
  - Articles
tags:
---

I see this all too much.  I'm willing to bet that if you've stuck your nose in a handful of themes or plugins, you probably have too.

This:

```php
<?php echo do_shortcode('[some_shortcode']); ?>
```

> Every time someone writes this code, a cute puppy somewhere is getting kicked.

What's the big deal?

Shortcodes are great.  They can be very powerful, and many successful premium plugins have been built on them.

Shortcodes belong in the content though. That's their home. _Why are you trying to take them from their home?_

Why would someone call it from php though?  Shortcodes are a simple text-based interface for calling a function.  When you register a shortcode, you let WordPress know "when you see this placeholder in the content, here is the callback I want you to call with any attributes it may have".

If you need to call the shortcode from php, why not just call the callback directly?

One might make the argument that, we don't know what that callback is, and the answer is: _yes. Yes we do._

We know that because that callback has to be registered with WordPress in order for it to work.  The only thing we need to know is the shortcode's tag/name itself, which is how we were calling it anyways.

If you take a look at the source for what happens when you call `add_shortcode(...)` you'll see that it's simply updating a global variable `$shortcode_tags` with the shortcode's name as the key, and the callback as the value. There we go!

Now we can just call the callback directly, and bypass all of the unnecessary string parsing.

```php
global $shortcode_tags;

echo $shortcode_tags['some_shortcode']($atts, $content, 'some_shortcode');
```

And that's really it; but we can do better than that.

Wouldn't it be nice if we could just call a function like `call_shortcode('some_shortcode', $atts, $content)`  ?

{% gist 0751dea2121db3a859fa %}
