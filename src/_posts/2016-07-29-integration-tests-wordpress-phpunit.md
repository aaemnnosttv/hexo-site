---
title: 'Taking Your Site To The Next Level: Integration Tests with WordPress & PHPUnit'
tags:
  - PHPUnit
  - Testing
id: 615
categories:
  - How To
date: 2016-07-29 18:52:50
---

Writing unit tests for themes and plugins is very important, especially for authors of extensions intended to be used by others.  However, the inner-workings of a website are much more than the sum of its parts.

Once we start bolting things together, our codebase can quickly become a different kind of beast; one which requires a different kind of testing to make sure that everything is working as expected.  As a website owner/administrator, these tests may even be more important than the tests which cover the individual parts.   Even if all of your installed plugins have robust test suites ... pause for manic laughter ...  just because something may work perfectly in isolation, does not mean that it will play nicely with others.

How many times have you been in the situation when faced with making a change between testing _everything manually_ or just crossing your fingers and hoping for the best? If you're new to the world of automated testing, you know this situation well. Automated tests lets us do what might be hours or days worth of manual testing in minutes or even seconds.

This post will walk you through how to setup the WordPress core PHPUnit test suite with your _site_, so you can write and run tests to make assertions about how your site is working _as a whole_.

> This guide is in the context of using the _Roots Bedrock_ WordPress boilerplate as a starting point for building modern WordPress applications.  With that said, it could likely be adapted to fit any other Composer-based WordPress stack-type project, but if you're using the standard WordPress zip download as your starting point, this guide will not work for you.  This is also not a tutorial about how to write tests for PHPUnit -- there are plenty of those.

## Getting Started

This is by no means incompatible with an existing project, but for the sake of consistency, we'll start from a clean slate.  The only dependency you will need to get started is Composer.

Before we begin, open your Terminal, and change into a clean working directory; wherever you keep your sites locally would be a good choice.

### Create a fresh install of Bedrock

```bash
composer create-project roots/bedrock my-project
cd my-project
```

#### Configure `.env`

```bash
cp .env.example .env
```

Edit the `.env` file using your editor of choice, and make sure at least these are set up for your local environment.  The website does not need to be accessible by http (ie: no need to setup in hosts just yet).

```
DB_NAME=database_name
DB_USER=database_user
DB_PASSWORD=database_password
DB_HOST=database_host
 
WP_ENV=development
WP_HOME=http://example.com
WP_SITEURL=${WP_HOME}/wp
```

#### Create the database

```bash
wp db create
```

> WP-CLI not required, but you're doing yourself a disservice by not having that yet _;)_  [Go get it right now](http://wp-cli.org/#installing) -- takes 30 seconds.

### Install Testing Packages

``` bash
composer config extra.wordpress-tests-core-dir tests/core
composer require --dev aaemnnosttv/wordpress-tests-core:dev-master phpunit/phpunit:^5.0
echo 'tests/core' >> .gitignore
```

What we did:

*   Configured the path of where to install the WordPress PHPUnit tests core library (this could be wherever you want, but there are other steps based on this choice, so keep it like this for now).
*   Added the WordPress PHPUnit tests core library and PHPUnit to our _development_ dependencies.
*   Added the location of the tests core library to our projects `.gitignore` file.
This is installed by Composer, ignore it!

> **A quick aside on the `aaemnnosttv/wordpress-tests-core` package**
>
> Obviously, this is my package.  For those who are wondering, it is synchronized from the `develop.git.wordpress.org` WordPress git mirror every 5 minutes, but only contains the relevant portion for PHPUnit.  Big shout out to the guys over at [Harrow.io](https://harrow.io/) for making this super easy (and free for public repositories) to run entirely on their bulletproof cloud infrastructure.

## PHPUnit Configuration

#### Add the `phpunit.xml` configuration file to the project root.

```xml
<phpunit
    bootstrap="tests/bootstrap.php"
    backupGlobals="false"
    colors="true"
    convertErrorsToExceptions="true"
    convertNoticesToExceptions="true"
    convertWarningsToExceptions="true"
    >
    <testsuites>
        <testsuite name="unit">
            <directory suffix=".php">./tests/unit/</directory>
        </testsuite>
    </testsuites>
    <php>
        <env name="WP_ENV" value="testing"/>
        <env name="DB_PREFIX" value="wptests_"/>
    </php>
</phpunit>
```

#### Important details to note

&lt;directory suffix=".php"&gt;`./tests/unit/`&lt;/directory&gt;
This tells PHPUnit to scan all `php` files in the `tests/unit` directory for our test cases.  This directory doesn't exist yet, so let's create that now.

```bash
mkdir tests/unit
```

#### Testing-specific Environment Variables (!!!)

Notice that within the `env` elements, we are setting a few very important environment variables.  Any variables defined here will take precedence over those defined in your `.env` (cite: [phpdotenv](https://github.com/vlucas/phpdotenv#immutability)).

`<env name="WP_ENV" value="testing"/>`
We are not in a normal environment.  It has no special meaning of its own, but it is a critical part of the configuration.  This also becomes more important later. (See below)

`<env name="DB_PREFIX" value="wptests_"/>`
This makes it possible to use the same database configuration you would normally use for your local development, but by using a different table prefix, we keep our normal tables safe.  Without this, everything would be blown away the first time you run your tests.  (By default, the normal table prefix is `wp_`)

#### Add `tests/bootstrap.php` file for loading plugins or doing other setup

There is some setup which must be done before the test cases are loaded.  Here is the place to do that.  The most common use-case will be to activate plugins. Unlike normal plugin unit tests, you want to activate all the plugins that your site would normally use.  Remember, we're testing that things are working _together, not in isolation_.

```php
<?php
  
require_once 'core/functions.php'; // required to use tests_add_filter
  
tests_add_filter('option_active_plugins', function($activePlugins) {
  
    return array_unique(
        array_merge([
            //'some-plugin/some-plugin.php',
            // ...
        ], $activePlugins ?: [])
    );
});
  
#
# That's it. Load this mother.
#
require 'core/bootstrap.php';
```

#### Almost there

Add the required `tests/wp-tests-config.php`. This file MUST be in this location (relative to the `tests/core` directory).

```php
<?php
 
require_once(dirname(__DIR__) . '/vendor/autoload.php');
require_once(dirname(__DIR__) . '/config/application.php');
 
```

This is the exact same as Bedrock's `web/wp-config.php`, less the require for `wp-settings.php` as the WordPress test suite loads that.

## Add environment configuration for the new `testing` environment

Create `config/environments/testing.php`, and customize the constants as necessary.

```php
<?php
/** Testing */
 
define('WP_TESTS_DOMAIN', 'example.com');
define('WP_TESTS_EMAIL', 'admin@example.com');
define('WP_TESTS_TITLE', 'Example Site');
define('WP_PHP_BINARY', 'php');
 
```

Just like the other environment-specific configuration files, this is just a base. These constants are expected to be defined by the test suite though, so consider this to be the minimum.

## Application.php Tweaks

The main configuration file in Bedrock is `config/application.php`. By default it defines `DISABLE_WP_CRON` here, but we need to update this slightly to not get errors about this constant being defined more than once.  Because the WordPress test suite loads after this, we cannot do a simple `if ! defined(...)` check.

#### Option A -- Wrap with environment conditional

```php
if ('testing' != WP_ENV) {
    define('DISABLE_WP_CRON', env('DISABLE_WP_CRON') ?: false);
}
```

#### Option B -- Move the definition to an environment-specific configuration file

Because we already have environment-specific configuration files, we could move this code into the relevant environments we want it in (eg. `production` and `staging` at least).  No conditional necessary, but a bit less DRY.

**TL;DR **Go with Option A.

### Adding Your First Test Case

As mentioned before, TestCases are looked for in the `tests/unit` directory, (although you can add further hierarchy without the need to change the phpunit config).

Create your first test case file: `tests/unit/ExampleTest.php`

```php
<?php
 
class ExampleTest extends WP_UnitTestCase
{
    /**
     * @test
     */
    public function all_systems_go()
    {
        $this->assertTrue(true);
    }
}
```

### Run PHPUnit!

```bash
vendor/bin/phpunit
```

<div class="asciinema-embed"><script id="asciicast-23gv08ivwcohw0supt6mhmd12" src="https://asciinema.org/a/23gv08ivwcohw0supt6mhmd12.js" async="" type="text/javascript" data-autoplay="1" data-loop="1"></script><style scoped>.asciicast { max-height: 250px !important; }</style></div>

How cool is that?

## Wrapping things up

Now you're ready to start writing tests that you can run every time you want to update a plugin, add some new feature, or even on every git push using something like Travis CI; you can rest assured that for the lifetime of your project, your website has a level of reliability which is otherwise not possible without automated tests.

**How do you handle integration tests with WordPress?
**Drop your comments and questions in the comments below!
