---
title: Version Assets
layout: project
subtitle: Automatically apply a content-based version on all of your assets to optimize browser caching.
repo: https://github.com/aaemnnosttv/version-assets
---

This is a very simple plugin which replaces the registered version of an enqueued asset (such as a stylesheet or javascript file) with a hash based on the file's content.

This guarantees that the browser will always serve the current version of the asset.

## Overview

Every stylesheet and script which is registered in the WordPress dependency management system allows you to specify a version for that file. This is usually the plugin or theme's version (e.g. `1.0`), and if not specified, defaults to the current WordPress version.

For the most part, this is OK and should not cause any issue. All plugins and themes that are installed from wordpress.org must increment their versions before a new version can be distributed.

It is possible however, for a stylesheet or script to be registered improperly, or with some arbitrary version. The most common offender is probably in our own custom theme or plugins.

If the content of the asset changes but the version does not, and it has already been loaded by a user's browser, the browser will serve the cached version and not download the updated one because the URLs will be exactly the same.

Version Assets makes sure that every asset served from your site has a unique version based on the content. If the content changes, the version will change to reflect that, regardless of how it was registered.

## Browser Caching Optimization

By default, plugin, theme, and even WordPress core updates can cause a browser to re-download a cached asset which hasn't changed, simply because the plugin/theme/core version has changed. With Version Assets, browsers will only need to download new assets, and those that have actually changed.

## Development

This is also useful for development. During development, it is not uncommon to use the latest version of an asset when refreshing the page. Version Assets will take care of this automatically, because the version will change every time the content of an asset changes. This allows you to avoid taking more drastic measures, such as disabling browser caching all together, or registering a different version (such as a timestamp) based on some conditional.
