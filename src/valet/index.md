---
title: WP-CLI Valet Command
id: 602
comment: false
date: 2016-07-10 12:50:10
---

This command aims to bring the speed and convenience of using Laravel Valet to WordPress.

Laravel Valet -- the development environment for Mac minimalists -- is a fast and simple alternative to using Vagrant or MAMP for local development.

Once installed, Valet is mostly a set-it-and-forget-it kind of server.  You simply register a directory with one command that tells Valet this is where you keep your projects, and then any directory within it will be automatically available at `directory-name.dev `automatically. Almost no further configuration, restart/reloading necessary.

For Laravel projects, using the command-line installer, you can simply run `laravel new my-project` and then after the install completes, you can open `http://my-project.dev` in the browser and it works.  Part of this is due to the fact that Laravel doesn't depend on things like a database to be installed or configured like WordPress does.

## Enter the `valet` command

Lets create a new WordPress install locally that we want to access at `demo.dev`.

```bash
$ wp valet new demo
```

That's it.  The install takes ~10 seconds, and the site is immediately accessible at `https://demo.dev`.  Notice the `https` there?  Sites are provisioned with https by default, but this can be skipped by passing `--unsecure`.

The `new` command accepts quite a few options to control many of the configuration options one might want to set for a new install.

### Database options

New sites create a new MySQL database by default, but the `new` command also supports using [SQLite](https://www.sqlite.org/) for a completely portable install. Simply add `--db=sqlite` when running `wp valet new`.  This is also really handy when creating quick test/demo installs as to not flood your database server with databases that will only be used once or twice.

### Removing Installs

The `valet` command also supports completely removing a WordPress installation as well.

```bash
wp valet destroy demo
```

This will drop the database, delete all the files, as well as remove the self-signed TLS certificate which was created and trusted for you if the site was provisioned with https.

For more information about getting started and documentation:

[Check it out on GitHub](https://github.com/aaemnnosttv/wp-cli-valet-command/)
