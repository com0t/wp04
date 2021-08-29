<?php
/**
 * structuredcontent
 * class-structuredcontent-block-assets.php
 *
 *
 * @category Production
 * @author anl
 * @package  Default
 * @date     2019-05-26 17:28
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


/**
 * Load general assets for our blocks.
 *
 * @since 1.0.0
 */
class StructuredContent_Block_Assets {


	/**
	 * This plugin's instance.
	 *
	 * @var StructuredContent_Block_Assets
	 */
	private static $instance;
	/**
	 * The base URL path (without trailing slash).
	 *
	 * @var string $_url
	 */
	private $_url;
	/**
	 * The plugin version.
	 *
	 * @var string $_version
	 */
	private $_version;
	/**
	 * The plugin version.
	 *
	 * @var string $_slug
	 */
	private $_slug;

	/**
	 * The Constructor.
	 */
	private function __construct() {
		$this->_version = STRUCTURED_CONTENT_VERSION;
		$this->_slug    = 'structured-content';
		$this->_url     = untrailingslashit( plugins_url( '/', dirname( __FILE__ ) ) );

		add_action( 'init', [ $this, 'block_assets' ] );
		add_action( 'init', [ $this, 'editor_assets' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'admin_style' ] );

	}

	/**
	 * Registers the plugin.
	 */
	public static function register() {
		if ( null === self::$instance ) {
			self::$instance = new StructuredContent_Block_Assets();
		}
	}

	/**
	 * Enqueue block assets for use within Gutenberg.
	 *
	 * @access public
	 */
	public function block_assets() {
		// Styles.
		wp_enqueue_style(
			$this->_slug . '-frontend',
			$this->_url . '/dist/blocks.style.build.css',
			[],
			$this->_version
		);
	}

	/**
	 * Enqueue  assets for use within Dashboard.
	 *
	 * @access public
	 */
	public function admin_style() {
		wp_enqueue_style( $this->_slug . '-editor', $this->_url . '/dist/blocks.editor.build.css', [], $this->_version );
	}

	/**
	 * Enqueue block assets for use within Gutenberg.
	 *
	 * @access public
	 */
	public function editor_assets() {

		wp_register_script(
			$this->_slug . '-editor',
			$this->_url . '/dist/blocks.build.js',
			[
				'wp-blocks',
				'wp-i18n',
				'wp-element',
				'wp-editor',
				'wp-plugins',
				'wp-components',
				'wp-edit-post',
				'wp-api',
				'wp-date'
			],
			time(),
			true
		);

		wp_set_script_translations( $this->_slug . '-editor', 'structured-content', STRUCTURED_CONTENT_PLUGIN_DIR . 'languages' );

	}

}

StructuredContent_Block_Assets::register();
