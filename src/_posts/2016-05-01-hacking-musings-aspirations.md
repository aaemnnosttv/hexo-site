---
title: 'Hacking, Musings & Aspirations'
tags:
  - Composer
  - Laravel
  - Testing
  - WP-CLI
id: 555
categories:
  - News
date: 2016-05-01 23:31:30
---

Lots of cool stuff going on lately.  Where to begin?  I have released several new projects lately which are in various stages of development.

After working with so many projects which are completely installed with Composer, it's hard to think of the "dark ages" of what development was like before that.

On a (big) side note, if you are a developer who works with PHP, you should take a minute and extend your gratitude to [Jordi Boggiano](https://twitter.com/seldaek) and [Nils Adermann](https://twitter.com/naderman) -- the authors leading the development of Composer.  Earlier this month, these guys celebrated the v[1.0.0](https://github.com/composer/composer/releases/tag/1.0.0) release of Composer after **5 years** of development.

In the WordPress ecosystem, WP-CLI recently released v0.23 which packed a long anticipated feature - the `package` command.  This is the command which leverages Composer to install Community WP-CLI Packages.  You can head over to the [official package index](http://wp-cli.org/package-index/) to browse around, or if you already have this version of WP-CLI or newer, you can just run `wp package browse` to view all available packages!

If you actually did either of those things right now, you would probably see a few of my packages right there at the top (almost).

## The `dotenv` command for WP-CLI

For those who are unfamiliar with what a `.env` file is or what it would be used for, take a quick second to read up on that on the [`phpdotenv` project page](https://github.com/vlucas/phpdotenv).  It's not anything new, or even php-specific.  The one sentence TL;DR is that it is a simple key-value format for defining environment variables - usually for storing sensitive information (like passwords or api keys) or other environment-specific configuration which doesn't belong in a project's source.

This project is a WP-CLI api for interacting with that file.  It has several handy features, like displaying the keys &amp; values in a nice cli table, creating a new environment file interactively from a template, or even (re)generating entries for WordPress authentication salts.

A member of the package index, you can install this package by running:

```bash
$ wp package install aaemnnosttv/wp-cli-dotenv-command
```

[Check it out on GitHub](https://github.com/aaemnnosttv/wp-cli-dotenv-command)

## The `http` Command for WP-CLI

The newest command I have added to the package index is the `http` command.  This is very much inspired by [httpie](https://github.com/jkbrzt/httpie), which is a really nice cli wrapper for cURL.  The `http` command is a wrapper for using the WordPress HTTP API.

WordPress supports a number of different methods to make HTTP requests.  This is because WordPress needs to be flexible enough to work on a wide range of hosts with different flavors of host OS, and binaries available to it.  For that reason, testing one action on your server with cURL may provide inconsistent results because WordPress may be using a different method.

The main use case for the command is that it gives you the ability to "see things through the eyes of WordPress" in the context of http requests.

I won't rehash the whole ins-outs of the plugin here but one of the coolest features (I think) is the ability to impersonate a given user for the request you are making.

Here's some food for thought to start playing with it.  Compare the output of these two commands:

```bash
$ wp http get / --realm=admin
$ wp http get / --realm=admin --as=1
```

_If you're on https, you may need to add the `--scheme=https` flag as well._

Install the package with:
```bash
$ wp package install aaemnnosttv/wp-cli-http-command
```

[Check it out on GitHub](https://github.com/aaemnnosttv/wp-cli-http-command)

## WordPress Tests Core

Testing is something that does not get nearly as much attention in the world of WordPress as its peers in the sphere of web development.  _Some_ information is available regarding writing unit tests for plugins and themes with PHPUnit, but that's about it.  I found this leaving a lot to be desired.

A WordPress site is much more than a some plugins and theme.  The fact is that even if all of the individual components have 100% test coverage and passing builds, that does not guarantee that they _work together --_ which is unquestionably more important.  So how do you test that with WordPress?  As far as I know, nothing has been written about that -- yet.

There is a wide range of (often inconsistent) vocabulary around the terms people use to talk about testing but generally speaking, when testing to make sure everything is working _together_, this is referred to as "integration testing".

If you look at a mature web application framework like Laravel, writing these kinds of tests is ridiculously easy.  It's so nice.  I wish I could say the same for WordPress, but it's a pain just to install the test library!  By test library, I mean the WordPress core testing files which are what PHPUnit test cases and test suites are built on.  Until now, the most efficient way to install these has been via `svn checkout`.

Why can't we install this like any other library with Composer?  (Reasonable question, right?)  It's not impossible, but one reason is because the WordPress files require a specific location relative to your `wp-tests-config.php` file.  (the equivalent of `wp-config.php` but for the test suite).  That means we would need to get our tests config file into the `vendor` directory, or we should choose a more appropriate location to install the library to.

## Enter the [WordPress Tests Core](https://github.com/aaemnnosttv/wordpress-tests-core) library Composer package

Similar to installing WordPress core via Composer, to install the WordPress core test library, it uses a custom installer to be to install the package to a location of our choosing within the project.

Add the install path to the `extra: {...}`  config in your `composer.json`, require the package in your dev dependencies and you're ready to rock!

[See the project readme for more information](https://github.com/aaemnnosttv/wordpress-tests-core).  More on this to come soon.

That leads me to my last project which is currently in the works.

It's no secret; I'm a pretty big fan of Laravel.  When you look through the Laravel source, you can tell that a lot of thought and care was put into it.  The whole thing oozes with clean and expressive object-oriented design. Naturally, I wanted to have the same thing with WordPress.

Most people would probably just stop there and say "Why not just use Laravel?", and the reality is that sometimes that just isn't an option or even the best choice for different reasons.  I believe that the values which Laravel stands for are universal, and WordPress has a lot of room to grow in that regard.

[Many projects](https://laravel-news.com/2016/01/wordpress-and-laravel/) have been created to fuse these two entities together in some way, but they all come with their compromises.  Most commonly, developers seem to really want to be able to use the expressive syntax of [Eloquent](https://laravel.com/docs/eloquent#introduction), Laravel's ORM. Eloquent can be made to work with a WordPress database -- but not really with WordPress.

What does that mean exactly?  It means that Eloquent can be configured to work with a WordPress database, query it, etc, but it is not compatible with WP_Query or any other code which may require modifying the query at runtime.  And there very well may be cases where that may be exactly what you want.  Especially for sites with massive databases, WP_Query can be sub-optimal.

For me, a solution like this is a deal-breaker for most sites though.  Most people aren't developing sites that get the kind of traffic to warrant that.  I want my code to be consistent and there are going to be cases you need to use WP_Query, so why mess with two?

Furthermore, there are other aspects of Laravel which make it a joy to work with, like its prolific use of Collections.  There's really nothing Laravel-specific about collections.  If you've used jQuery, you've used collections.  Collections are like arrays with methods.  Learning to use these can seriously transform the way you write code in PHP.

## Enter: _Silk_

A few months ago, I broke ground on a new project called _Silk_, which aims to provide an implementation of a very Laravel-esque API around WordPress.  Although it is heavily influenced by Laravel and will even leverage some Laravel packages, it will not be an _exact_ API match. Silk aims to embody _the values of Laravel_ -- a clean, expressive, object-oriented layer _on top of WordPress_ rather than around it.  Under the hook, Silk will use the same WordPress functions and classes you've grown to know and ... Because of this key difference, Silk will remain fully-compatible with reasonably current versions of WordPress (with the exception of its PHP version requirement, and maybe some other things).

Silk is designed to be a library of powerful tools and building blocks rather than a framework which requires you to do things a certain way.

[Check it out on GitHub](https://github.com/aaemnnosttv/silk)

* * *

_fin_
