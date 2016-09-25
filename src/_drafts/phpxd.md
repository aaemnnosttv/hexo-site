---
title: phpxd
id: 611
categories:
  - Uncategorized
tags:
---

<pre class="lang:zsh decode:true ">alias phpxd='function __phpxd() {
	php -d zend_extension=/usr/local/opt/php70-xdebug/xdebug.so $(which $1) "${@:2}"
}; __phpxd'</pre>
&nbsp;