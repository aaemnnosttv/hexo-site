---
title: Using Laravel Valet with WordPress
tags:
  - Laravel
  - Release
  - WP-CLI
id: 576
categories:
  - Announcement
date: 2016-05-18 22:31:18
---

In case you missed the release of Laravel Valet last week, allow me to introduce you.

{% youtube H3Z4Gk9Wc0s %}

WHAT. A. RUSH.

Pretty awesome right?  It's not just for Laravel though.  In fact, out of the box, Valet supports almost a dozen different php platforms as well as static sites, including WordPress.

But WordPress doesn't have a one-command installer like Laravel.  It requires a database, it's more/less tied to a specific domain, and even then you need to go through the "Famous 5 Minute Install" before you can do anything with the site.

So out of the box, the Valet experience for WordPress is a bit lackluster since you still have to go through all that extra setup.  Much of the initial install for WordPress can be done pretty easily using WP-CLI, but there's still no single command -- until now.

## Introducing the `valet` command for WP-CLI

A new WP-CLI command you can pull in as a package, and is available right now on the official package index.

```bash
$ wp package install aaemnnosttv/wp-cli-valet-command
```

There are a few prerequisites before you can use it, but if you already have Valet and WP-CLI installed, that's pretty much it.

Here's how it works.  From your terminal, change to a directory where you keep your projects.  Here I'm assuming that directory is called `Sites` in your home directory.

```bash
$ cd ~/Sites
$ valet park; # only needed once for this directory
$ wp valet new my-project
```

You can now have a new WordPress install, ready to use _right now_ in your browser at [https://my-project.dev](#).  By _use_ I mean, you can view the homepage, login, etc.  It's completely installed.

Most of the magic I have to give credit to Valet for, but the end result is a one command, ready to use WordPress install.

### But wait... there's more

Have you ever wanted to work with WordPress locally, but didn't want or need a MySQL database running just to make it work?   Unfortunately, database abstraction isn't exactly _robust_ in WordPress as it is tightly coupled to SQL.  However, it is possible to run WordPress using _SQLite_ instead.

[SQLite](https://www.sqlite.org/) is a fast, server-less, user-less, zero-configuration, file-based database system. It's also used more than any other database system there is.

The WP-CLI Valet command supports installing a new WordPress instance, ready to use with SQLite instead of MySQL with a single option.

```bash
$ wp valet new my-project --db=sqlite
```

The command accepts many more options for fine-grained control.

[Check it out on GitHub](https://github.com/aaemnnosttv/wp-cli-valet-command)
