<?php
/**
 * structured-content
 * class-structuredcontent-tinymce.php
 *
 *
 * @category Production
 * @author anl
 * @package  Default
 * @date     2019-05-27 01:00
 */


// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Load registration for our blocks.
 *
 * @since 1.6.0
 */
class StructuredContent_Register_TinyMCE {


	/**
	 * This plugin's instance.
	 *
	 * @var StructuredContent_Register_TinyMCE
	 */
	private static $instance;
	/**
	 * The Plugin version.
	 *
	 * @var string $_slug
	 */
	private $_slug;

	/**
	 * The Constructor.
	 */
	private function __construct() {
		$this->_slug = 'structured-content';

		add_action( 'init', [ $this, 'register_tinymce' ], 99 );
		add_action( 'after_wp_tiny_mce', [ $this, 'tinymce_extra_vars' ] );
		add_filter( 'mce_external_languages', [ $this, 'wpsc_tinymce_languages' ] );
	}

	/**
	 * Registers the plugin.
	 */
	public static function register() {
		if ( null === self::$instance ) {
			self::$instance = new StructuredContent_Register_TinyMCE();
		}
	}

	/**
	 * Add actions to enqueue assets.
	 *
	 * @access public
	 */
	public function register_tinymce() {

		if ( ! current_user_can( 'edit_posts' ) && ! current_user_can( 'edit_pages' ) ) {
			return;
		}

		if ( get_user_option( 'rich_editing' ) !== 'true' ) {
			return;
		}

		add_filter( 'mce_external_plugins', [ $this, 'add_buttons' ] );
		add_filter( 'mce_buttons', [ $this, 'register_buttons' ] );
	}

	public function add_buttons( $plugin_array ) {
		$plugin_array['structured_content_dropdown'] = STRUCTURED_CONTENT_PLUGIN_URL . 'dist/tinymce.js';

		return $plugin_array;
	}

	public function register_buttons( $buttons ) {
		array_push( $buttons, 'structured_content_dropdown' );

		return $buttons;
	}

	public function tinymce_extra_vars() {
	    $json = json_encode( [ 'structured_content_dropdown_name' => esc_html__( 'Structured Content', 'structured-content' ), ] );
	    echo "<script>const structured_content_tinymce = $json</script>";
	}

	public function wpsc_tinymce_languages( $wpsc_locales ) {
		$wpsc_locales['wpsc'] = STRUCTURED_CONTENT_PLUGIN_DIR . '/languages/structured-content-js.php';

		return $wpsc_locales;
	}
}

StructuredContent_Register_TinyMCE::register();
