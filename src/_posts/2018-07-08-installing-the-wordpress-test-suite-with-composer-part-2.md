---
title: 'Installing the WordPress Test Suite with Composer <small>[Part&nbsp;2]</small>'
tags: 'series, composer'
categories: Articles
seriesIdx: 2
banner: /images/sunny-mountain-crest.jpeg
banner_lightness: light
date: 2018-07-08 23:00:00
---


~~Not too long ago~~ About a year and a half ago, {% post_link installing-the-wordpress-test-suite-with-composer-part-1 'I wrote about the challenges involved in installing the WordPress core PHPUnit test library via Composer' %}. This turned out to be much less trivial than it seems at first glance.

If you're just tuning in for the first time, here's a quick recap of the problem:

1. The WordPress core PHPUnit test library is not officially offered as a Composer package
1. The library exists only as a part of the core [WordPress Develop source](https://core.trac.wordpress.org/browser/#trunk/tests/phpunit)
1. Without a real Composer package to install, the next best solution is a manually defined "package" type Composer package, in your project's `composer.json`, and requires SVN to download the files every time (added vcs dependency, slower, duplicate information in composer.json, no caching, ...).
1. Requires a specific installation location due to internal depenencies on the relative location to the `wp-tests-config.php` file. (Requires additional configuration in `composer.json` and a custom Composer installer plugin to achieve)

While this is certainly better than nothing, it still seems like quite a big pain, to do something which should be so simple. All I want to do is install some PHP files as a library; I shouldn't have to care where they go as long as they are easily accessible from the code. This is the exact problem every package manager was born to solve.


## Refactor with Composer Repository

The first thing I wanted to do away with was the manual/static package definition. To do this, I had to find a way to create a package for the files, without actually creating a package for them. The solution is to create a Composer repository for them! This would remove the need for a `package` type Composer repository, and replace it with a real Composer repository, like so:

```json
{
  "repositories": [
    {
      "type": "composer",
      "url": "{some-url-tbd}"
    }
  ]
}
```

This is actually not that hard to do as a Composer repository can essentially be just a big list of `composer.json` s - one for each version of each package.

Here's _Hello Dolly_'s, truncated for brevity.

```sh
curl https://wpackagist.org/p/wpackagist-plugin/hello-dolly%24ce9ca310ae559be46d23cb3641c0304fe347fc64de193988517af5a7bf3f75cd.json
```

```json
{
  "packages": {
    "wpackagist-plugin/hello-dolly": {
      "1.5": {
        "name": "wpackagist-plugin/hello-dolly",
        "version": "1.5",
        "version_normalized": "1.5.0.0",
        "uid": 155788,
        "dist": {
          "type": "zip",
          "url": "https://downloads.wordpress.org/plugin/hello-dolly.1.5.zip"
        },
        "source": {
          "type": "svn",
          "url": "https://plugins.svn.wordpress.org/hello-dolly/",
          "reference": "tags/1.5"
        },
        "homepage": "https://wordpress.org/plugins/hello-dolly/",
        "require": {
          "composer/installers": "~1.0"
        },
        "type": "wordpress-plugin"
      },
      "1.6": {
        "name": "wpackagist-plugin/hello-dolly",
        "version": "1.6",
        "version_normalized": "1.6.0.0",
        "uid": 155789,
        "dist": {
          "type": "zip",
          "url": "https://downloads.wordpress.org/plugin/hello-dolly.1.6.zip"
        },
        "source": {
          "type": "svn",
          "url": "https://plugins.svn.wordpress.org/hello-dolly/",
          "reference": "tags/1.6"
        },
        "homepage": "https://wordpress.org/plugins/hello-dolly/",
        "require": {
          "composer/installers": "~1.0"
        },
        "type": "wordpress-plugin"
      },
      "dev-trunk": {
        "..."
      }
    }
  }
}
```

From here, everything that would be in the project's `composer.json` in the form of a manually defined package, would be provided by the Composer repository.

The "entry point" for a Composer repository is `{repository URL}/packages.json`. For a repository that provides many different packages, it can get a bit complicated, as the entry point json acts as a proxy for other json files which contain the actual package information.

Try this: next time you run `composer install`, add the `-vvv` flag on the end and you will see all of the different URLs Composer is loading packages from to resolve dependencies and install your package!

In this case, since we're only looking to provide a single package, we can simply build up a single `packages.json` with data for all of the versions of the package. Ok, no problem.

`packages.json`

```json
{
  "packages": {
    "aaemnnosttv/wordpress-core-phpunit-includes": {
      "4.9.0": {
        "name": "aaemnnosttv/wordpress-core-phpunit-includes",
        "type": "wordpress-tests-core",
        "version": "4.9.0",
        "version_normalized": "4.9.0.0",
        "source": {
          "type": "svn",
          "url": "https://develop.svn.wordpress.org/",
          "reference": "tags/4.9/tests/phpunit/includes/"
        },
        "require": {
          "aaemnnosttv/wordpress-tests-core-installer": "~0.1"
        }
      },
      "4.8.10": "package definition json...",
      "4.8.9": "package definition json..."
    }
  }
}
```

_Achievement unlocked!_ Manual package definition no longer necessary!

Before we start celebrating too much, we haven't completely done away with the problem of a manually managed `package` type repository definition; we've merely traded it for maintaining those package definitions in a centralized location: the new Composer repository's `packages.json`. We now have an added dependency of a public endpoint. This isn't such a big deal seeing as we don't need it to be dynamic, so we can easily leverage a free service like GitHub Pages to host it reliably, but it's worth mentioning.

Another problem, however that isn't immediately obvious is that the above package only installs the `includes` directory from the WordPress core PHPUnit files. This used to be sufficient, but nowadays the includes actually depend on some files in it's sibling `data` directory too!

At first, you might think that this is an easy fix by simply changing the source to target the parent directory to install `includes` and `data` together using the same package.

```diff
-   "reference": "tags/4.9/tests/phpunit/includes/"
+   "reference": "tags/4.9/tests/phpunit/"
```

This won't work however, because as we already know, the `includes/bootstrap.php` file has a hard dependency on where it expects the `wp-tests-config.php` file to be.

This is the fundamental problem that has been there all along which is refusing to be ignored any longer. This is what stands between this code being installable as a Composer package _at all_.

## Solving File Dependencies: An Ultimatum

Let's think back again as to why these files can't be simply installed as a package in Composer's vendor directory.

Pretend it's installed as a package, with a file structure like this:

```
vendor/aaemnnosttv/(library root)
├── data
└── includes
    ├── bootstrap.php
    ├── factory.php
    ├── functions.php
    ├── install.php
    └── ...
```

When initializing the test environment, we need to load the `includes/bootstrap.php` file. Composer doesn't give us an easy way to get the location to this file to include it as files are intended to be loaded via autoloading, rather than by directly including them. Let's slime our way through this by just assuming the path to the file based on the location in the vendor directory:

`tests/bootstrap.php`

```php
// Load the WP test environment
include dirname(__DIR__) . '/vendor/aaemnnosttv/wp-phpunit-lib/includes/bootstrap.php';
```

Now the bootstrap will fail because it will be looking for a `wp-tests-config.php` file as a sibling of the `includes` directory (or several directories higher, as is used by WP core).

What if the package shipped with **its own** `wp-tests-config.php` file? This would satisfy the requirement, but we still need this to be flexible enough to put our own custom configuration in it. To solve this, we need to understand that this file has already done its job: to exist where it is expected, and to be loaded. The configuration it does (with one exception) can literally be done in any other file as it is mostly just defining a few constants.

One solution to this might be to use the sample `wp-tests-config.php` and populate it with some other constants/variables we set somewhere else. This isn't a very good option in my opinion because it would require generating dynamically somehow to ensure it would be futureproof with possible new required constants or settings.

A better solution I think would be to load the "real" config file from some other location that we can define. That way, we can delegate as much responsitiblity to the consumer to define as much/little as they want, however they want, just as they would normally, without imposing any limitations on where that file should be!

The library's bundled `wp-tests-config.php` might look something like this now:

```php
require REAL_WP_TESTS_CONFIG_FILE;
```

Then we can define the path to this in our `phpunit.xml`

<div class="wide">
```xml
<phpunit>
    <!-- ... -->

    <php>
        <const name="REAL_WP_TESTS_CONFIG_FILE" value="path/to/wp-tests-config.php" />
    </php>

    <!-- ... -->
</phpunit>
```
</div>

I won't go into the full contents of the "real config file", but we can assume it is a properly configured version of the [sample config file](https://github.com/WordPress/wordpress-develop/raw/master/wp-tests-config-sample.php).

Upon running `phpunit`, we'll start to see errors like this:

```
PHP Warning:  Use of undefined constant REAL_WP_TESTS_CONFIG_FILE - assumed 'REAL_WP_TESTS_CONFIG_FILE' (this will throw an Error in a future version of PHP) in .../wp-tests-config.php on line 11
PHP Stack trace:
PHP   1. {main}() .../includes/install.php:0
PHP   2. require_once() .../includes/install.php:13
```

Well that's weird...

To get a better idea of what's happening, try commenting out the `<const>` definition in the `phpunit.xml` file and run it again.

BOOM! You should see it blow up much louder now, only this time the stack trace goes back to `includes/bootstrap.php` and ultimately fatals when it cannot `require` the file from the undefined constant.

Expected, right? However, this shows that in the previous step that the constant _was defined_ when `includes/bootstrap.php` was loaded, but _wasn't defined_ when `includes/install.php` was loaded.

**In one file it was defined, and in another it was not.** A constant. I'll let that sink in for a second.

Now, before you lose your grip on reality completely, don't worry because there is a logical explanation for this!

As part of the test environment bootstrap, in `includes/bootstrap.php`, there is this line:

<div class="wide">
```php
system( WP_PHP_BINARY . ' ' . escapeshellarg( dirname( __FILE__ ) . '/install.php' ) . ' ' . escapeshellarg( $config_file_path ) . ' ' . $multisite, $retval );
```
</div>

Essentially what this does, is the `bootstrap.php` file is spawning a _new PHP process_ calling the `install.php` file, and passing the path to the `wp-tests-config.php` file to the file as a positional argument. This clears the slate of anything previously defined in PHP outside of the `wp-tests-config.php` file, including the constant which was defined to provide the real location of our tests config values.

We need to define the location to the real tests config file in a way that can survive between requests. At first glance, it seems as if all hope is lost, but that isn't the case.

To solve this, we need to stop thinking about this as a PHP script, and more like a _shell script_ since it's essentially calling `install.php` as a shell script, just written in PHP.

In a shell script, we know that if we want to persist a variable/setting between separate command processes, all we need to do is `export` the variable to make it available to all new processes in the current scope.

E.g.

```sh
$ export FOO='bar'
$ ./what-is-foo.sh
#  bar
```

What is `FOO` ? An _environment variable!_ What would happen if we set `REAL_WP_TESTS_CONFIG_FILE` as an environment variable instead of a constant?

Let's change the `wp-tests-config.php` file to check for an environment variable instead:

```php
require getenv('REAL_WP_TESTS_CONFIG_FILE');
```

and update our `phpunit.xml` accordingly:

```diff
-   <const name="REAL_WP_TESTS_CONFIG_FILE" value="path/to/wp-tests-config.php" />
+   <env name="REAL_WP_TESTS_CONFIG_FILE" value="path/to/wp-tests-config.php" />
```

Now let's run PHPUnit again...

```
Installing...
Running as single site... To run multisite, use -c tests/phpunit/multisite.xml
Not running ajax tests. To execute these, use --group ajax.
Not running ms-files tests. To execute these, use --group ms-files.
Not running external-http tests. To execute these, use --group external-http.
PHPUnit 6.5.8 by Sebastian Bergmann and contributors.

.                                                                   1 / 1 (100%)

Time: 2.44 seconds, Memory: 28.00MB

OK (1 test, 1 assertion)
```

**Eureka!** It worked!

## Refactor With Composer Package

So we've proved that the test library code is actually usable if it were to be installed via Composer, there are just a few catches:

- we need a `wp-tests-config.php` file in the package to load our "real" tests config file "by proxy"
- we need a better way to get the path to the test library files, such as `functions.php` to get access to `tests_add_filter()` or `bootstrap.php` to start up the test environment

With these requirements in mind, the solution requires creating a new Composer package to wrap the test library files in a way that makes them Composer-friendly. By building a real package, we can meet all of the requirements in a way that provides the best experience all around. No custom Composer repository, no custom installer or extra configuration in your `composer.json` file needed. All that's really needed is what we really wanted all along: a regular ol' **Composer package**.

What does it mean to "build" a Composer package for an existing third-party codebase though? How would that work, and how could that be maintainable long-term?

I'll answer all of these questions and more in the last and final part in this series, next time. Stay tuned.
