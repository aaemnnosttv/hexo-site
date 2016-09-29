---
title: WP-CLI Login Command
layout: project

repo: https://github.com/aaemnnosttv/wp-cli-login-command
subtitle: Login to WordPress with secure passwordless magic links.
---

Have you ever thought:
> "If I have the ability to create or delete users, change their password or any other data with a single command, why can't I _login_ as them just as easily?"

## Enter the `login` command.

The login command is your interface for logging in as any user in the system, using a simple password-less "magic" login url.  You may have seen these used by such apps as Slack or Medium.  Quincy Larson of Free Code Camp fame wrote [a great article about doing away with password-based logins](https://medium.freecodecamp.com/360-million-reasons-to-destroy-all-passwords-9a100b2b5001) recently, which reinforced this subconscious feeling I've had for a while now.

Here's how it works.  First we need to install the login handler plugin (only once of course).

We can use the `login` command to do that!

```bash
$ wp login install --activate
```

Now, say we have a user with a login of `zerocool`. Simply run:

```bash
$ wp login create zerocool
```

and you'll be presented with a magic login url right in your terminal.

Copy and paste that URL into your browser, and hit enter to be instantly logged in and looking at the wp-admin dashboard faster than you can say "antidisestablishmentarianism".

Pretty cool right?

We can do better than that though.  In most terminal applications, you can `cmd + click` (ie: iTerm2) or `cmd + double click `to open any url shown in the terminal window, in your browser.  Not too shabby!

That mouse stuff kinda spoils the whole terminal experience though, and definitely isn't 1337\.  How about we just _launch_ the url from the terminal?

```bash
$ wp login as zerocool --launch
```

Boom!  Browser launched, instantly logged in; wp-admin.

> The `create` subcommand is also available by its alias: **`as`**

### Would you like that to-go?

How about getting a login link to use on your phone or for your client who can't find that password reset email?

```bash
$ wp login email zerocool
```

Dade just got a magic login link sent to his user's email address.

Customize the email template?

```bash
$ wp login email zerocool --template=path/to/email/template.html
```

The template is rendered using WP-CLI's mustache compiler, so that means you can use a static file with pretty placeholders in the template for the `{% raw %}{{ magic_url }}{% endraw %}` and `{% raw %}{{ domain }}{% endraw %}` to be replaced before sending.

## What about security?

So, obviously when creating these magic links that can log in anyone as any user, we need to take the security aspect pretty seriously.  _Is this safe to use on production!?_  I'm glad you asked. The goal is for the magic login to be _more_ secure than a traditional password-based login. Translate that how you wish, but to me that means &mdash; for use in all environments.

There were several key points that I wanted to address when creating magic sign-in links.

*   **Short-lived lifespan**.  When you create a new magic link, the terminal includes a notice: "This link will self-destruct in 15 minutes, or as soon as it is used; whichever comes first."  Pretty self-explanatory.  Unlike [WordPress nonces](https://codex.wordpress.org/WordPress_Nonces), (the name which stands for a "Number used ONCE", except they're not) these links are truly single-use.  Once it is used, it's dead.  Alternatively, if it's not used within 15 minutes of creation, dead.
*   **Unguessable endpoint**.  The url that handles the login should not be able to be guessed, and/or targeted by stuff like brute-force attacks.  I'm not an expert in this area, but rather than only listening for a particular value in the query string for example. Magic login links will only work with a specific endpoint.
*   **Mass Invalidation**.  I wanted to be sure that if need be, all magic links could be invalidated in one fell-swoop.  `wp login invalidate` -- Check.
This is also possible by regenerating authentication salts which has the added benefit/affect of invalidating any logged in user sessions as well.  (If you're a `.env` user you can do this using [another package of mine](/wp-cli-commands/dotenv/) `wp dotenv salts regenerate`).
*   **Tamper-proof**.  A magic link is generated for a specific user, and will _only_ work for that user.  Changes to magic link data stored in the database will only break them.
*   **Domain-specific**.  That means that a valid magic login link for one domain/environment will not work for a mirror of that website on a different domain.
*   **On/off**.  Because authentication in WordPress is cookie-based, there is no way to set this cookie without the browser (hence the magic link).  For this, we need a plugin on the site to handle these requests.  Therefore, turning the whole thing off is as simple as deactivating the plugin to render all magic links innate.  Installing, and controlling the activation of this plugin is all possible via the login command as well.  

    
[Check it out on GitHub](https://github.com/aaemnnosttv/wp-cli-login-command).

If you're a excited about the project, spread the word!  Show your love with a **[star](https://github.com/aaemnnosttv/wp-cli-login-command/stargazers)**, or a **[tweet](https://twitter.com/intent/tweet?text=Login+to+WordPress+with+secure+passwordless+links.+https%3A%2F%2Faaemnnost.tv%2Fwp-cli-commands%2Flogin%2F)**, or [drop me an email](/contact/) &mdash; I would love to hear your feedback!
