---
title: Simple Callbacks in WordPress
id: 546
categories:
  - Articles
date: 2016-01-02 22:23:19
tags:
---

Callbacks are the core of WordPress.  The Plugin API functions rely on them directly, as do shortcodes!  In WordPress core, we commonly see these referred to with strings which refer to function names:

```php
function my_callback() {
    // do something;
}
add_action('some_hook', 'my_callback');
```

Another common usage is to reference a method

```php
class SomeClass {
  public static function do_something() {}
  
  public function do_something_else() {}
}
  
add_action('captain_hook', 'SomeClass::do_something');
// or
$instance = new SomeClass;
add_action('hook_this', [$instance, 'do_something_else']);
```

Sometimes the return value is so trivial that creating a function or method just to return it is almost silly.  The most common cases have been given [their own full-fledged functions](https://developer.wordpress.org/?s=__return_&amp;post_type%5B%5D=wp-parser-function) as part of WordPress core since v3.0:

*   `__return_true`
*   `__return_false`
*   `__return_zero`
*   `__return_empty_array`
*   `__return_null` (since 3.4)
*   `__return_empty_string` (since 3.7)

But what if you wanted to return something else without creating a dedicated named function or class method?

The next option would be an anonymous function.  These are possible even in PHP 4 using `create_function()` but it uses `eval()` internally and the usage is totally gross, so I would recommend never using that. However, unless your host is running PHP 5.2 (the _bare minimum_ for WordPress - in which case you should run away or upgrade _IMMEDIATELY_), you can use a real anonymous function, like so:

```php
add_action('something_happened', function() {
  return 'whoa cool!';
});
```

Pretty nice, eh?  Not a good solution if you want your callback to be able to be removed using `remove_action` or `remove_filter` but we're assuming this is something you're in control of here, and we wouldn't need to do that. Read: if you are distributing a plugin/theme to be used by others, you shouldn't do this.

Moving on.

So that's really nice and all, but still more characters than necessary, especially if you want to do this kind of thing several times.

Let's DRY all that up with a simple `__return` helper function!

{% gist 1b77e9300e77b4ac7748 %}

Just as shown before, we can pass a closure directly to the action or filter callback we are adding.  The only difference here is we're abstracting the creation of the closure within our little higher order function that simply returns whatever we gave it.  The function isn't called until the hook is fired.

Now we can write a single, expressive line of code to return whatever we want:

```php
add_filter('something_filterable', __return('cool stuff'));
```

This will return "cool stuff".  Since we're using a function to create our callback, we can pass any valid expression to it that we want to use to pass the result.

A practical example might be a simple shortcode for rendering the current year:

```php
add_shortcode('year', __return(date('Y'));
```
