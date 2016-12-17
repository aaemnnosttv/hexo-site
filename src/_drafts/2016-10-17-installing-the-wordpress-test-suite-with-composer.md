---
title: Installing the WordPress Test Suite with Composer [Part 1]
date: 2016-12-17
categories: Articles
tags: series, composer
seriesIdx: 1
# tweet_cta: tweet this, sucka
---

Not too long ago I wrote about how to go about how to setup a Composer-based WordPress site with the core PHPUnit testing library to run integration tests.

The cornerstone of this method leverages my `wordpress-core-tests` package, which is essentially a composerified subdirectory mirror of the PHPUnit supporting files within the WordPress core develop repository.

After maintaining it for a few months now, it became clear that my solution needed to become more robust.

This is a bit of a tricky problem to solve, but to wrap our heads around it, we need to understand the problem, and the goals we're aiming to solve.

## Overview

- **Goal:** I want all of my PHP dependencies installed via Composer, so I can simply `composer install` and it's good to go.
- **Problem:** The PHPUnit library used by WordPress core is generally installed using a shell script and subversion checkout.
- **Problem:** There was no existing package available to install this with.

## Solution: Create a package!

**Goal:** Create a package containing the relevant subset of WordPress core that I want to be able to install via Composer.

Then we can simply add the package to the `require-dev` Composer dependencies, configure the location where the suite should be installed, and we're good to go.

This is not quite as simple as it sounds.

### Repository Strategy

Ideally, this would be as simple as using [git subsplit](https://github.com/dflydev/git-subsplit) to "export" the directory of the [WordPress core git mirror](git://develop.git.wordpress.org/) repository to my package's repository.  The commit history, authors, and tags would all be preserved. However, this becomes a problem in the context of a Composer package, because a package must contain a `composer.json` in the root. In our case, we're dealing with an existing git history that does not contain a `composer.json` (a subset of WordPress core). This means we would have to rewrite the git history so that all versions of the package contain the `composer.json`. Subsplit is no longer an option now because there will be a conflict of hashes in the git history.

Mr. John Bloch - of [`johnpbloch/wordpress`](https://packagist.org/packages/johnpbloch/wordpress) fame faced this same issue with his popular WordPress core package. The workaround is to maintain a fork, at the cost of losing author/commit data, including tags (not much of a fork anymore!). You also need to roll your own solution to synchronize your fork; ideally in some automated way.

Although not ideal, this is the form that my package took.

### Installation

Just like with WordPress core, we cannot simply let the package be installed into Composer's `vendor` directory with all the other dependencies and their friends. WordPress core has an excuse since it needs to be publicly-accessible (where `vendor` is generally/ideally not), however in this case, the problem is actually due to certain expectations within the relevant test suite code that require a specific placement in the filesystem. More specifically, the package needs to be installed as a child of the directory containing the `wp-tests-config.php` file.

Eg:
```
/ -- Project Root --
/tests/
/tests/wp-tests-config.php
/tests/the-package-here/
/vendor/
```

This means we now need a [custom Composer Installer plugin](https://github.com/aaemnnosttv/wordpress-tests-core-installer) and additional configuration in our `composer.json` to dictate where it should be installed to; just like the WordPress core package.

### Releases

Because we are maintaining a fork which is completely detached from the source repository in terms of history, we will have to roll our own solution for versioning, as tags from the source are lost with this kind of approach.

---

This is where I left off and was the hurdle I had yet to clear. The package was usable and worked great though. Backwards compatibility seemed like a non-issue since the package was so minimal and WordPress core maintains such a strong commitment to backwards compatibility itself.

Then things started getting interesting with development in 4.7... Installing the test suite (read: dev-master) for use on older versions of WordPress was blowing up with errors.

## Back to the Drawing Board

After thinking about this for some time, I came up with a solution that seemed like it might offer the best of both worlds. I needed to keep the version of the test suite in sync with WordPress core. The biggest obstacle to doing this was how to handle the conflict of the git history I was trying to manipulate by jamming the `composer.json` in there.

**Solution: Don't use Composer or don't use git.**

Using Composer is the whole point here, so obviously that wasn't something I was willing to compromise on. I wasn't convinced that it was necessary to abandon using git either, so I kept digging. Eventually, I came up with a new take on my existing solution that would allow for both.

**Alternate Solution: Don't use `composer.json`**

The problem with my previous attempt wasn't with Composer itself, but with trying to mess with the git history by trying to add a `composer.json` file to it without breaking the history, which git is itself designed to prevent.

It _is possible_ to install a package without the package source containing a `composer.json` ([exhibit A](https://wpackagist.org)). Composer needs this data, but rather than it living in its respective package, it can be defined "manually". Composer supports multiple types of [repositories](https://getcomposer.org/doc/05-repositories.md) (Composer repositories). While `vcs` is perhaps the most common for one-off packages that are not on Packagist (requires `composer.json`), you can define a `package` type repository where you essentially define a package's `composer.json` right there "inline".

Let's see how this might look in practice in our project's `composer.json`

```json
{
    "repositories": [
        {
            "type": "package",
            "package": {
                "name": "aaemnnosttv/wordpress-core-phpunit-includes",
                "type": "wordpress-tests-core",
                "version": "4.6.1",
                "source": {
                    "type": "svn",
                    "url": "https://develop.svn.wordpress.org/",
                    "reference": "tags/4.6.1/tests/phpunit/includes/"
                },
                "require": {
                    "aaemnnosttv/wordpress-tests-core-installer": "~0.1"
                }
            }
        }
    ],
    "require": {
        "aaemnnosttv/wordpress-core-phpunit-includes": "4.6.1"
    },
    "extra": {
        "wordpress-tests-core-dir": "tests/core"
    }
}
```

This solution comes with its own tradeoffs. The most obvious is perhaps that the version number is required in 3 different places.

The other less obvious limitation is that `package` type Composer repositories can only be defined in the root `composer.json`. This means, to add it to your project, would be more/less of a manual process every time if it wasn't baked into the project you were starting with (`composer create-project ...`).

One big advantage that this approach offers is that no mirror of the WordPress source code is necessary, if svn is an option in your environment.

This is essentially the same behavior that the `install-wp-tests.sh` shell script does, which comes with wp-cli. The difference here is that Composer will run it as part of the install when necessary, rather than doing this as as a separate step of the install.

Another disadvantage about this solution is that svn checkouts are not cached by Composer, so the test suite files will be checked out from the remote on every install. It only takes a few seconds to download, but this leaves a bitter taste in my mouth.

## Red-Green-Refactor

In my opinion, this is the simplest and easiest way to accomplish the goal here. Is it the best solution? I think not.

**What would the ideal solution look like?**

- Cacheable `dist` install -- we don't care about installing this as source.
- A single package version -- we currently have the same version in 3 places.
- No ugly/verbose manual `package` repository junking up the project's `composer.json`.

In **Part 2**, we'll dive deeper into the world of Composer to see if and how we might be able to accomplish this.

---

Have you tried anything like this before? If so, let me know in the comments below!
