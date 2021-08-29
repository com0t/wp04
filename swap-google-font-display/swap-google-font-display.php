<?php
/**
 * The plugin bootstrap file
 * 
 * @package swap-google-font-display
 * @version 1.0.6
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * Plugin Name:       Swap Google Fonts Display
 * Plugin URI:        https://wordpress.org/plugins/swap-google-font-display/
 * Description:       Inject font-display: swap to Google Fonts to ensure text remains visible during webfont load
 * Version:           1.0.6
 * Author:            Gijo Varghese
 * Author URI:        https://wpspeedmatters.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       swap-google-font-display
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

define( 'GOOGLE_FONT_DISPLAY_SWAPPER_VERSION', '1.0.6' );

// Inject dispaly=swap to Google Fonts
function google_fonts_ds_inject_display_swap($html) {

    // Remove existing display swaps
    $html = str_replace("&#038;display=swap", "", $html);
	
	// Add font-display=swap as a querty parameter to Google fonts
    $html = str_replace("googleapis.com/css?family", "googleapis.com/css?display=swap&family", $html);

    // Fix for Web Font Loader
    $html = preg_replace("/(WebFontConfig\['google'\])(.+[\w])(.+};)/", '$1$2&display=swap$3', $html);

    return $html;
  
}

// Capture HTML
function google_fonts_ds_capture_html() {
    ob_start("google_fonts_ds_inject_display_swap");
}
add_action('init', 'google_fonts_ds_capture_html', 1);

// Add custom links in plugins list
function google_fonts_ds_links($links) {
    $plugin_shortcuts = array(
        '<a href="https://www.buymeacoffee.com/gijovarghese" target="_blank" style="color:#3db634;">Buy developer a coffee</a>'
    );
    return array_merge($links, $plugin_shortcuts);
}
add_filter('plugin_action_links_' . plugin_basename(__FILE__), 'google_fonts_ds_links');


// Add font-display:swap using LiteSpeed cache
function google_fonts_ds_litespee_cache($content, $file_type, $urls) {
    if ($file_type === 'css')
        $content =  str_replace('@font-face{','@font-face{font-display:swap;', $content);
    return $content;
}
add_filter('litespeed_optm_cssjs', 'google_fonts_ds_litespee_cache', 10, 3);;