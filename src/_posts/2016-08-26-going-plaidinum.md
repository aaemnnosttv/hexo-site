---
title: >-
  Going Plaidinum: WordPress Login, Coming to a Browser Near You -- at Ludicrous
  Speed
id: 679
categories:
  - Announcement
date: 2016-08-26 19:18:19
tags:
---

The hype is real.  Today I unveiled my latest command for WP-CLI -- the `login` command.

Why a command to login?  We don't need to login to interact with WordPress from the command line.  We _do_ need to login to do just about anything else though!  I'm a huge fan of using WP-CLI, but until WP-CLI has 100% feature parity with wp-admin, we'll all forced to keep using it for now.  That was a joke.

Everyone needs to login at some point.  We're all familiar with how that normally goes:

*   Type in mysite.xyz/wp-admin in browser.. redirected to wp-login.php
*   Click in username box, type in username or email address
*   Tab/click/tap to password field
*   Remember password, or fill from password manager
(several more steps which vary between software)
*   Finally, hit enter/click submit
*   Hope that you got it all right.. or start over again!

This process gets multiplied and often over complicated as soon as you start factoring development, and staging environments.  Users and passwords can differ between environments (even though they shouldn't), and password managers complicate things more by requiring you to duplicate saved entries for each environment or configure things like Equivalent Domains to share the same login across multiple domains.

If you're nodding your head right now, **there's another way.**

Ever login on Slack before?  (Everyone says "yes")  How cool is that option to use the "magic link" that they email you and you can just click that to be logged in?! Medium and others are picking this up as what will most likely be the new way users prefer to login to their apps.  Why is that?  Think about it -- the process of using a password can be.. painful (see above again).  That leads some users to compromise a secure password for something that makes their life easier.  What if you could have a way to login that was _more_ secure than your password _and_ easier to use?  This is what the magic link strategy is aiming to do.

For developers though, getting an email sent can be a non-option or just equally slow.  It may not even be possible, if for example, you're working offline (fly much?) or for some reason, the site isn't able to send outgoing mail, or you're not able to receive it.  Don't get me wrong, the email option is great, and the login command supports that too (in style), but it's not the speed we're looking for.

### Get your magic link, and launch it too

[![WP-CLI Login Command Demo](https://aaemnnost.tv/app/uploads/2016/08/Screen-Recording-2016-08-26-at-06.46-PM.gif)](https://aaemnnost.tv/app/uploads/2016/08/Screen-Recording-2016-08-26-at-06.46-PM.gif)

What could possibly faster than that? If you think you know, drop it in the comments below :)

**Hungry for more on the `login` command?**  [Read on, friend](/wp-cli-commands/login/).

If you find the command useful, [give it a star on GitHub](https://github.com/aaemnnosttv/wp-cli-login-command/stargazers) or [tweet a friend](https://twitter.com/intent/tweet?text=The)!

LUDICROUS SPEED; _**GO!**_

<div class="nobr">
    <div class="embed-responsive embed-responsive-16by9">
      <iframe class="embed-responsive-item" src="//www.youtube.com/embed/mk7VWcuVOf0?rel=0" allowfullscreen></iframe>
    </div>
</div>
