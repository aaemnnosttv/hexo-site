---
title: Upgrading OpenSSL version in Homebrew PHP
id: 574
categories:
  - Uncategorized
tags:
---

`brew update`

`brew uninstall curl`

<span class="s1">`brew install curl --with-openssl --with-nghttp2 --with-gssapi --with-libidn`</span>

`brew uninstall php70`

<span class="s1">`brew install php70 --with-homebrew-curl`</span>