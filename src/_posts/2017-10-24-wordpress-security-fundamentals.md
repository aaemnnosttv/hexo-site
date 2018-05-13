---
title: WordPress Security Fundamentals
date: 2017-10-24 10:03:38
categories:
  - Articles
canonical: 
    source: deliciousbrains.com
    href: https://deliciousbrains.com/wordpress-security-fundamentals/
banner: /images/db-wordpress-security-fundamentals.jpg
banner_lightness: light
---

WordPress has made great strides in its effort to democratize publishing, making the ability to publish content on the web accessible to a very large number of people all over the world. Today, it powers roughly [28% of the websites on the web](https://w3techs.com/technologies/details/cm-wordpress/all/all) making it the most widely used platform in the world by far in terms of market share. However, with the status of being number one comes the attention of those who wish to exploit it.

In this article, we'll look at what you can do to make your site more secure to weather the eternal storm of bad guys.

## Isn't WordPress Secure Already?

Just as it is not possible to secure your home 100%, no site is 100% secure. Every lock has a key which is possible to open by anyone who has something that fits the same way. That is not to say that WordPress is not secure though. As an open-source project with literally thousands of developers working on it, in it, and around it all the time, the collective effort of so many people makes it very strong because it only takes one person to find a vulnerability and report it. WordPress also has a dedicated security team responsible for making sure WordPress core is as secure as possible.

> The WordPress Security Team is made up of approximately 50 experts including lead developers and security researchers — about half are employees of Automattic (makers of WordPress.com, the earliest and largest WordPress hosting platform on the web), and a number work in the web security field. The team consults with well-known and trusted security researchers and hosting companies.  
[https://wordpress.org/about/security/](https://wordpress.org/about/security/)

WordPress core is only one component of the complex system that makes up your website. The majority of WordPress sites are much more than a bare WordPress install. Most plugins and themes, both free and premium do not get nearly the same level of attention, let alone purely auditing for vulnerabilities. If it can happen to some of the largest and well-supported plugins such as [Jetpack](https://wpvulndb.com/plugins/jetpack) and [WooCommerce](https://wpvulndb.com/plugins/woocommerce), the possibility of concocting a site which has some vulnerability is almost inevitable.

## Meet Your Opponents

If we're going to protect ourselves, it's important to know what we're up against to best orient ourselves for success. Where are these attacks coming from? The good news is that the vast majority of attacks are completely automated and not very sophisticated. Much like a search engine which crawls your site for content to index, most attacks start as simple bots which crawl your site looking for known vulnerabilities which are then exploited in an automated way.

Another common source of attacks is from other sites which are already compromised. Think zombie apocalypse. This could be in the form of another site on the same host which tries to reach other sites on the same server, or even in the form of a "botnet" which a swarm of hundreds or even thousands of compromised machines which could be used together to be used in a very powerful way.

Contrary to what you may think, the least common attacker is from an actual human. This is the hardest to protect against as a human can execute a much more intelligent attack, from vectors which are otherwise not possible by a machine (like [pick up the phone and call you](https://www.cio.com/article/2884639/security0/7-social-engineering-scams-and-how-to-avoid-them.html#slide5)). The chances of being the target of a human cyber attack are quite low due to the sheer ratio of sites to hackers. Higher profile sites are generally at higher risk as they are of more interest to humans than a blog about cat-shaped knitting templates.

By following the tips in this article you will be poised to be stronger against attacks from all sources.

## Keep Everything Up-To-Date

Perhaps the most obvious and easy to do (as well as neglect) would be keeping WordPress core, and all installed plugins and themes updated to the latest stable versions. As a well-known platform, there are large, publicly available [databases of known vulnerabilities](https://wpvulndb.com/) for WordPress core, plugins, and themes. If your site uses older versions of any software, you are essentially gambling that an attacker does not come and find it.

In addition to keeping your software up-to-date, you can easily further harden your site by hiding the version numbers which are installed.

The two most important pieces of data an attacker can find out about your site in order to compromise it are: what software it is using (WordPress in this case, and which extensions are installed), and what versions they are. Given these bits of information, attackers can be extremely efficient in compromising your site. All they need to do is look up what you have in their playbook, and find the best exploit available to compromise your system with sniper-like accuracy.

Hiding the fact that you're using WordPress isn't easy, but not broadcasting the version you are using is.

**Remove the WordPress version from the `<head>` tag (no plugin necessary)**

<img src="https://cdn.deliciousbrains.com/content/uploads/2017/10/16173256/Screen-Shot-2017-10-16-at-11.32.08-PM-1440x213.png" alt="Screenshot of meta generator tag showing WordPress version"  class="aligncenter size-large wp-image-32943" />

~~~
add_filter( 'the_generator', '__return_empty_string' );
~~~

WordPress also uses versions as the default version for enqueued styles and scripts in the `ver` parameter for cache busting.

<img src="https://cdn.deliciousbrains.com/content/uploads/2017/10/16173514/Screen-Shot-2017-10-16-at-11.34.38-PM-1440x262.png" alt="Screenshot of WordPress link tags with version in URL" class="aligncenter size-large wp-image-32944" />

You could use a plugin like [Version Assets](https://wordpress.org/plugins/version-assets/) (shameless self-promotion of OSS) to replace these with content hashes which both obscures the version while optimizing for browser caching.

## Use Strong Login Credentials

You can do everything right, but if your login credentials are `admin` and `password` you are essentially parking your car with the windows down and the keys on the seat.

**Start by requiring a strong password for _all users_.** It's not as hard as you might think.

[<img src="https://cdn.deliciousbrains.com/content/uploads/2017/10/16172911/xkcd-password-strength.png" alt="Password strength" width="600" height="487" class="aligncenter size-full wp-image-32942" />](https://explainxkcd.com/wiki/index.php/936:_Password_Strength)

A simple alternative to coming up with your own password is to use a password manager such as [LastPass](https://lastpass.com/) or [1Password](https://1password.com/) to generate something long and ugly for you. This saves you the trouble of remembering so many passwords. For web developers, your password manager is close to oxygen and coffee in terms of necessity due to the often large number of sites and services we need to maintain credentials for.

One important policy which no plugin can do for you is to not reuse any password that you have used on another site. This is because if the other site becomes compromised (something you likely have little to no control over) and your password known (which it shouldn't because the password should not be stored in plaintext, but it [has happened](http://plaintextoffenders.com/)) or cracked, then the attacker may try using the username/email and password to login to other sites or services.

Whatever you do, don't use any of the passwords on [this list](https://en.wikipedia.org/wiki/List_of_the_most_common_passwords).

Relevant plugins:

- [Force Strong Passwords](https://wordpress.org/plugins/force-strong-passwords/) - Require a minimum level of password strength using the WordPress password strengh meter.
- [Expire Passwords](https://wordpress.org/plugins/expire-passwords/) - Require users of selected roles to change their passwords every X days.

**Don't use common administrator usernames**

This is another easy one which unnecessarily exposes you to risk simply by using obvious common usernames such as `admin` or `administrator`.

If your site uses one of these usernames, create a new admin, and delete the old one (you can always associate all posts/content from the old user with another user when you delete it).

**Limit Login Attempts**

Chances are you and the users of your site know your respective login credentials fairly well. By default, WordPress does nothing to prevent someone from trying to login hundreds of times per minute or more (besides the fact that your site would probably crash). Does that sound like something you would ever need? Didn't think so. Let's not allow that because there are reasonable limits to how many times someone should be able to attempt to log in before we need to let them cool their jets for a few minutes.

The [Limit Login Attempts](https://wordpress.org/plugins/limit-login-attempts/) plugin has become a staple among many managed WordPress hosts which you get out-of-the-box when hosting with them. Once a user has X failed login attempts within a given time period, they will be prevented from logging in for the next 10 minutes (or whatever it is set to), even with a correct password. The user then needs to wait for the login ban to expire or contact an administrator on the site who can remove the temporary ban for them.

**Use 2-Factor Authentication**

2-Factor authentication is an added layer of login security. Your password is the first layer. After the correct password is provided, you must pass a second challenge before you are able to login. This is usually in the form of a 6-9 digit number provided by your phone or another device which you provide in an additional input. The possession of a device you have configured for 2-factor authentication with your site confirms that it is you attempting to log in and not an attacker who happens to have your password.

<img src="https://cdn.deliciousbrains.com/content/uploads/2017/10/16172521/millenial-antitheft-device.png" alt="2-Factor authentication in the real world" width="600" height="450" class="aligncenter size-full wp-image-32941" />

My favorite 2FA app is a rather new one called [2FAS](https://wordpress.org/plugins/2fas/) which is named after the company behind it. It's really quick to get started with and has a few really nice features which most others do not: trusted devices, and **backup codes** in case you lose your device or otherwise need to get in without it. They have their own app for your phone, but you can also use Google Authenticator, or Authy (my favorite as you can use it on your computer too).

## Put WordPress in its Own Directory

Not all hosts give you the freedom to do this, but if you can, [putting WordPress in its own directory](https://deliciousbrains.com/how-why-install-wordpress-core-subdirectory/) is a very effective way to sidestep a significant amount of malicious traffic knocking on your door.

<img src="https://cdn.deliciousbrains.com/content/uploads/2017/10/16172246/WordPress-in-its-own-directory.svg" alt="Diagram comparing WordPress files in a standard install to WordPress files in their own directory" class="aligncenter size-full wp-image-32940" />

There are other reasons to do this but from a security standpoint, some bots will simply assume your site is using a standard install. Requests for `/wp-login.php` and `/wp-admin/` will fail as 404s because they now reside at `/wp/wp-login.php` and `/wp/wp-admin/`. Even if you have a vulnerable plugin installed, if a bot comes by and attempts to exploit it with an assumed standard install path, it will simply miss the target.

Putting WordPress in its own directory also hardens your site to [directory traversal attacks](https://en.wikipedia.org/wiki/Directory_traversal_attack), which basically means an attack which exploits a vulnerability in a plugin to say, read the contents of your wp-config.php file by using an expected relative path to it from the plugin file.

E.g.

~~~
GET /wp-content/plugins/abcxyz-slider/slide-loader.php?image=../../../../wp-config.php
~~~

## Keep Regular Backups and Keep Them Far Away

If your server evaporated today, would your site be up and running again tomorrow? Backups are an integral part of running a site which is valuable to you. If your site is hacked somehow, and the damage is irreparable, you should be able to restore to a point before your site was compromised.

In order to be able to restore to a point before your site was hacked without notice, you will need automated backups going back several days. 30 days of backup history is a good number to start with and adjust as necessary for your situation.

**Never store your backups on your server**

This is important for two reasons:

1. If your site is ever compromised, the attacker may delete or infect your backups
1. If your backups became accessible (some plugins create backup files right in the uploads directory) a hacker could download your backup and use that to gain access to the live site

**Test performing a restore from backup**

The last thing you want to happen when things go wrong is to reach for your trusty backups and for them not to work, or even worse: find out they weren't being created the whole time. After restoring, make sure any database dumps or other sensitive files that were part of the backup are deleted or not publicly accessible.

## Use a Good Host

Having a solid host for your site can really go a long way in keeping your site safe. Particularly a host which specializes in WordPress specifically should offer:

- A dedicated instance for your site, isolated from all other sites they host
- Daily offsite backups of your file system and database
- Daily malware scanning and cleaning of WordPress files

## Disable Errors From Outputting to the Screen

If you've ever seen PHP errors or notices showing on your screen (usually near the top) then your site is leaking information which could be used against you by an attacker such as what plugins you have installed, or paths on the filesystem. Whether this is enabled or not is largely dependent on how PHP is configured on your server, but it can also be controlled by WordPress' debugging constants. You may want to add the following to your wp-config.php to prevent errors from being output to the screen. The best way to observe or audit the errors on your site is to enable debug logging, so the errors will be written to a file instead.

~~~
define( 'WP_DEBUG_DISPLAY', false );
define( 'WP_DEBUG_LOG', true );
~~~

You should also block access to the `wp-content/debug.log` file via HTTP for the same reason.

## Plugins and Themes

> The vulnerabilities most affecting WordPress website owners stem from the platform's extensible parts, specifically plugins and themes. These are the #1 attack vector being exploited by cyber criminals to hack and otherwise misuse WordPress sites.
[Codex - Hardening WordPress](https://codex.wordpress.org/Hardening_WordPress#Themes_.2F_Plugins)

Auditing your extensions is critical to being on top of keeping your site secure. Try to limit your extensions to those provided by reputable sources, both the author and where you are downloading it from. For free plugins and themes, be sure to get them from wordpress.org if available. For premium extensions, only download them directly from the vendor. Avoid free or "nulled" premium extensions as these can be modified to contain backdoors to allow the "street vendor" to easily gain full access to your site. Remember how your parents always told you to never take candy from strangers? THIS IS THAT CANDY.

Beware of themes which bundle plugins in the theme itself rather than requiring plugin dependencies be installed normally. This is because plugins that are bundled in a theme are not possible to update through the normal auto-update process thus relying on the theme to release updates for its dependencies as well.

Don't keep plugins or themes installed that you are not using. Even an inactive plugin can be a vulnerability because it is still a part of your codebase and publicly accessible from the web.

Prefer extensions which are updated regularly, and again, update your extensions regularly.

## Exercise the Principle of Least Privilege

The [principal of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege) is a term from the information security world which basically says that each part of the system should only have the access and permissions to the resources it needs to do its job and nothing more. Don't give any more power or access than is required. In WordPress terms, the easiest thing you can do is not make anyone an administrator on your site that doesn't need to be.

## Security Plugins and Services

Reviewing all of the security plugins available for WordPress could be a series in itself, but what article about security in WordPress would be complete without at least mentioning them?

At the time of this writing, the top 3 security plugins on the wordpress.org plugin repository are (in order of most active installs to least):
1. [Wordfence Security](https://wordpress.org/plugins/wordfence/)
2. [iThemes Security (formerly Better WP Security)](https://wordpress.org/plugins/better-wp-security/)
3. [Sucuri Security – Auditing, Malware Scanner and Security Hardening](https://wordpress.org/plugins/sucuri-scanner/)

These plugins offer many features to address the issues and practices outlined above and more. This post is not sponsored by any third-party, but it should help you make a more informed decision as to which plugin might be right for you, should you be considering one.

A few other products worth mentioning are [ManageWP](https://managewp.com) and the self-hosted [InfiniteWP](https://infinitewp.com/). These are third-party services which let you remotely administrate your WordPress installs and offer some great security functionality such vulnerability scanning and backups, even at the free tiers. ManageWP gives you more on the free tier but InfiniteWP is something you host yourself and uses add-ons for premium features.

## Closing

Securing your website is like trying to keep squirrels out of your birdfeeder; there are always going to be squirrels, you just have to make your feeder harder to reach than the others. Throughout this article, we've learned about many different ways that your site can be at risk of being hacked and how to harden it against them.

Of course security is a topic which can hardly be covered comprehensively in a single post, but hopefully, you learned a thing or two that you didn't know before.

<img src="https://cdn.deliciousbrains.com/content/uploads/2017/10/16174646/knowings-half-the-battle.gif" alt="Knowing is half the battle." width="375" height="281" class="aligncenter size-full wp-image-32947" />

What do you do to keep your site secure? Have any tips which you think everyone should know about WordPress security? Sound off in the comments below.
