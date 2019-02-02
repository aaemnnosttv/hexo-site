---
title: Introducing WP PHPUnit
date: 2018-07-08 23:24:55
tags:
---

<div class="lead">
    This post is the third and final part in the series on _Installing the WordPress Test Suite via Composer_. Just tuning in? Jump to [Part 1](#) or [Part 2](#)
</div>

In part 2 of this series, we left off with a plan to finally solve the problem of installing the WordPress test suite with Composer by creating a package for it. 

This is something that I had been considering from the very beginning, but my initial approach was too idealistic. I wanted to essentially extract a package from the existing WordPress develop source git mirror by simply exporting the subset of files that I wanted, while rewriting the git history to use a different project root and removing all the other files and commits that weren't relevant. This seemed promising at first and I was able to get this far with it. The problem was when I needed to add the `composer.json` to it where things started to fall apart. Not so much fall apart as much as just coming to a complete halt. There's just no way to "stick a file into the history of a git repository".

The solution wasn't that great either. It required a custom installer, as well as extra configuration in the root `composer.json` to be able to install the package in a specific place in the project due to the dependency on the location relative to the `wp-tests-config.php` it requires.

So I went back to the drawing board and figured out how to solve these problems. In doing so, the solution became the best yet, but required doing something I was trying to avoid from the very beginning: mirroring the source files and releases.

This effort has many similarities with the challenges that John Bloch faced when he created the ubiquitous Composer package for WordPress core.

## Introducing WP PHPUnit

And so, `wp-phpunit/wp-phpunit` was born.

- No custom composer repository to add
- No dependency on Subversion
- No manual package definition
- No custom composer path configuration

Installation:

```
composer require --dev wp-phpunit/wp-phpunit
```

WP PHPUnit has complete version parity with WordPress core. Want the version of the library from WP 4.5.3? `composer require --dev wp-phpunit/wp-phpunit:4.5.3`

WP PHPUnit has a version for every release of WordPress (after the PHPUnit files were introduced in 3.7).

## Compared to `install-wp-tests.sh`

Anyone who's done any amount of testing in WordPress is familiar with the infamous `install-wp-tests.sh` script which:

- Downloads a specific version of WordPress (usually to a temporary directory on your computer)
- Downloads the WordPress test library files (by svn checkout)
- Creates the database to be used by the test install
- Configures the test install's `wp-tests-config.php` with the database connection information

**This setup has many significant drawbacks**

- Not easy to keep the script up-to-date
- Requires SVN
- Often needs to be run again after rebooting due to `/tmp` directory install location
- Not easy to install per-project
- Extra/separate step to install PHP code which is really just a development dependency

**WP PHPUnit by contrast**

- Nothing to keep up-to-date - simply install the corresponding version to the installed version of WordPress
- Does not require SVN
- Installed locally, per-project
- Installed by a simple `composer install`, no extra installation step

## How it Works

The package itself is very simple. Apart from the added `composer.json` required by all packages served by Packagist.org, the package has two additional files which are very important.

`wp-tests-config.php`

As mentioned before, this file is really the genesis of where all the problems come from. Because the library's `bootstrap.php` expects this to be in a specific location, we satisfy this requirement by including this file. Instead of including any configuration however, this file acts as a proxy to load the "real" config file at a location of our choosing.

`__loaded.php`

This is a file added for the sole purpose of identifying the installed location of the package (in the vendor directory). This file is autoloaded by Composer, and registers the path to it as an environment variable.

This gives us everything that we need to be able to install the library as a normal, regular-ass Composer `library` package. Not even `composer/installers` is required! Our `wp-tests-config.php` can exist anywhere we want in our project, and we can load any of the library files without assuming anything about where they're installed.

## How it's Built

At a high level, the WP PHPUnit composer package is the product of a build process. I knew from the beginning that if this project were to be successful (at least in my eyes), it would have to be fully automated. I also wanted it to be completely open-source, not just in terms of the end result, but in all of the code that makes it happen. Furthermore, I wanted it to be completely sustainable on solid, free-tier services. No dollars should be required to keep it going.

The build runs on Travis CI and uses their cron feature to run the build once every day. The same build is run whether it is building every version or just one release of the package.

**Here's how it works**

1. The build process is started
2. Git repositories for the WordPress core develop and WP PHPUnit package are cloned down
3. Git tags are analyzed for both
4. If there is a difference in tags between the two repositories, the PHP portion of the build is launched
5. Here, the missing tags are analyzed
6. For each tag to be built...
    1. Prepare the working directories
    2. Checkout the proper base branch in the package repository (separate branches must be maintained for each major release)
    3. Export the library files from WordPress core at the specific tag
    4. Extract the exported files and copy them into the package repository
    5. Copy the extra files to be added to the package (`composer.json`, `wp-tests-config.php`, and `__loaded.php`)
    6. Add, commit, + tag the new files into the package
7. Once all tags have been built, all new commits + tags are pushed to the package's repository on GitHub
8. The build process shuts down
