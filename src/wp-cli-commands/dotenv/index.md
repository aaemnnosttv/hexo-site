---
title: WP-CLI Dotenv Command
layout: project
subtitle: Interact with a .env file from the command line.
repo: https://github.com/aaemnnosttv/wp-cli-dotenv-command
---

This command is dedicated to handling various tasks of managing an environment file for your WordPress install.

> By default WordPress does not use a dedicated environment file for environment-specific configuration and sensitive information.
> Relevant WordPress-based projects: [Bedrock](https://roots.io/bedrock/), [Suzie](http://getsuzie.com/), [WordPlate](https://wordplate.github.io/)

The `dotenv` command is especially useful for use within other scripts.

## Features

*   Generate a easy to read cli table of all defined keys and values in the file.
*   Add or update a value for a given key/variable in the file.
*   Get/print the value for a given key in the file.
*   Generate or regenerate keys and values for WordPress authentication salts in the file.
*   Remove one or more defined variables in the file.
*   Create a new environment file, optionally using another file as template

    *   Interactive prompting for setting values also possible.
    *   Generate salts for the new file at the same time.

[Check it out on GitHub](https://github.com/aaemnnosttv/wp-cli-dotenv-command)
