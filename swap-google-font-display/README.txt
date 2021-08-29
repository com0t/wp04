=== Swap Google Fonts Display ===

Contributors: gijo
Donate link: https://www.buymeacoffee.com/gijovarghese
Tags: fonts, google fonts, web font
Requires at least: 3.0.1
Tested up to: 5.8
Stable tag: 1.0.6
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Inject font-display: swap to Google Fonts to ensure text remains visible during webfont load

== Description ==

## Quick Links

- What is [flash of invisible text](https://wpspeedmatters.com/fix-foit-font-in-wordpress/)? (or "ensure text remains visible during webfont load")
- Join our [Facebook Group](https://www.facebook.com/groups/wpspeedmatters/), a community of WordPress speed enthusiasts
- [Buy me a coffee](https://www.buymeacoffee.com/gijovarghese)

## How it Works?

Swap Google Fonts Display plugin will find all Google Fonts in a webpage and set its font-display to swap

By default browser will wait until the Google Fonts are downloaded to display the font. This is the reason for the error **'ensure text remains visible during webfont load'** in [Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)

Luckily Google Fonts now supports setting `font-display` via a new query parameter. By setting `font-display` to swap, the browser uses the fallback font and when downloading actual font is complete, it just swaps the font!

**Note**: Plugin can't add `font-display: swap` to dynamically (via JS) injected Google Fonts

== Installation ==

Just install the plugin and active it. No further configuration is needed.

== Changelog ==

= 1.0.6 =

- Bug fixes while using W3 Total Cache
- Bug fixes while using custom wp-includes folder

= 1.0.5 =

- Support for W3 Total Cache

= 1.0.4 =

- Automatically add font-display:swap to all css files when using LiteSpeed cache

= 1.0.3 =

- Checks entire HTML for Google Fonts (previously <head> only)

= 1.0.2 =

- Support for Web Font Loader

= 1.0.1 =

- Removed unwanted CSS and JS files
- Removed unwanted boilerplate php files
- Prevent multiple display swaps (if already added by theme/plugins)
- Added donation link

= 1.0 =

- First release!
