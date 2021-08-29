<?php
/**
 * structured-content
 * class-structuredcontent-shortcodes.php
 *
 *
 * @category Production
 * @author anl
 * @package  Default
 * @date     2019-05-27 01:17
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
class StructuredContent_Shortcodes {


	/**
	 * This plugin's instance.
	 *
	 * @var StructuredContent_Shortcodes
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

		add_shortcode( 'sc_fs_faq', [ $this, 'faq' ] );
		add_shortcode( 'sc_fs_multi_faq', [ $this, 'multi_faq' ] );
		add_shortcode( 'sc_fs_job', [ $this, 'job' ] );
		add_shortcode( 'sc_fs_event', [ $this, 'event' ] );
		add_shortcode( 'sc_fs_person', [ $this, 'person' ] );
		add_shortcode( 'sc_fs_course', [ $this, 'course' ] );

		add_filter( 'the_content', [ $this, 'fix_shortcodes' ] );
		add_filter( 'category_description', [ $this, 'fix_shortcodes' ] );
	}

	/**
	 * Registers the plugin.
	 */
	public static function register() {
		if ( null === self::$instance ) {
			self::$instance = new StructuredContent_Shortcodes();
		}
	}

	static public function multi_faq( $atts, $content = null ) {

		$merged_atts = shortcode_atts(
			[
				'css_class' => '',
				'count'     => '1',
				'html'      => true,
				'elements'  => [],
			], $atts );

		foreach ( $atts as $key => $merged_att ) {
			if ( strpos( $key, 'headline' ) !== false || strpos( $key, 'question' ) !== false || strpos( $key,
					'answer' ) !== false || strpos( $key, 'image' ) !== false ) {
				$merged_atts['elements'][ explode( '-', $key )[1] ][ substr( $key, 0, strpos( $key, '-' ) ) ] = $merged_att;
			}
		}

		foreach ( $merged_atts['elements'] as $key => $element ) {
			if ( ! empty( $element['image'] ) ) {
				$image_id       = intval( $element['image'] );
				$image_url      = wp_get_attachment_url( $image_id );
				$image_thumburl = wp_get_attachment_image_url( $image_id, [ 150, 150 ] );
				$image_meta     = wp_get_attachment_metadata( $image_id );
				if ( $image_thumburl !== false && $image_meta !== false && $image_url !== false ) {
					$merged_atts['elements'][ $key ]['img_url']       = $image_url;
					$merged_atts['elements'][ $key ]['thumbnail_url'] = $image_thumburl;
					$merged_atts['elements'][ $key ]['img_size']      = [
						$image_meta['width'],
						$image_meta['height']
					];
					if ( empty( $merged_atts['elements'][ $key ]['img_alt'] ) ) {
						$merged_atts['elements'][ $key ]['img_alt'] = get_post_meta( $image_id, '_wp_attachment_image_alt',
							true );
					}
				} else {
					$merged_atts['elements'][ $key ]['image'] = 0;
				}
			}
		}

		$atts = $merged_atts;

		ob_start();
		include STRUCTURED_CONTENT_PLUGIN_DIR . 'templates/shortcodes/multi-faq.php';
		$output = ob_get_contents();
		ob_end_clean();

		return $output;

	}

	static public function faq_item( $atts, $content ) {
		$atts = shortcode_atts( [
			'className'         => '',
			'question'          => '',
			'imageID'           => 'h2',
			'imageAlt'          => '',
			'thumbnailImageUrl' => '',
			'visible'           => true,
			'open'              => false,
		], $atts );

		$json = json_encode( [ 'atts' => $atts, 'content' => $content ] );

		return $json;
	}

	static public function faq( $atts, $content = null ) {

		if ( ! array_key_exists( 'version', $atts ) ) {


			$merged_atts = shortcode_atts(
				[
					'css_class'    => '',
					'question_tag' => 'h2',
					'elements'     => '',
				], $atts );


			if ( $merged_atts['elements'] === '' ) {

				$merged_atts = shortcode_atts(
					[
						'css_class' => '',
						'headline'  => 'h2',
						'img'       => 0,
						'img_alt'   => '',
						'question'  => '',
						'answer'    => '',
						'html'      => 'true',
						'elements'  => '',
					], $atts );

				if ( ! empty( $merged_atts['img'] ) ) {
					$image_id       = intval( $merged_atts['img'] );
					$image_url      = wp_get_attachment_url( $image_id );
					$image_thumburl = wp_get_attachment_image_url( $image_id, [ 150, 150 ] );
					$image_meta     = wp_get_attachment_metadata( $image_id );
					if ( $image_thumburl !== false && $image_meta !== false && $image_url !== false ) {
						$merged_atts['img_url']       = $image_url;
						$merged_atts['thumbnail_url'] = $image_thumburl;
						$merged_atts['img_size']      = [ $image_meta['width'], $image_meta['height'] ];
						if ( empty( $merged_atts['img_alt'] ) ) {
							$merged_atts['img_alt'] = get_post_meta( $image_id, '_wp_attachment_image_alt', true );
						}
					} else {
						$merged_atts['img'] = 0;
					}
				}
				$merged_atts['headline_open_tag']  = '<' . $merged_atts["headline"] . '>';
				$merged_atts['headline_close_tag'] = '</' . $merged_atts["headline"] . '>';

				$atts = $merged_atts;

				if ( isset( $atts['description'] ) && $atts['description'] !== '' ) {
					$content = $atts['description'];
				}

				ob_start();
				include STRUCTURED_CONTENT_PLUGIN_DIR . 'templates/shortcodes/faq-deprecated.php';
				$output = ob_get_contents();
				ob_end_clean();

				return $output;

			} else {

				if ( ! is_array( $merged_atts['elements'] ) ) {
					$a                       = str_replace( "'", '"', $merged_atts['elements'] );
					$a                       = unserialize( $a );
					$merged_atts['elements'] = $a;
				}

				foreach ( $merged_atts['elements'] as $key => $element ) {
					if ( ! empty( $element['imageID'] ) ) {
						$image_id       = intval( $element['imageID'] );
						$image_url      = wp_get_attachment_url( $image_id );
						$image_thumburl = wp_get_attachment_image_url( $image_id, [ 150, 150 ] );
						$image_meta     = wp_get_attachment_metadata( $image_id );
						if ( $image_thumburl !== false && $image_meta !== false && $image_url !== false ) {
							$merged_atts['elements'][ $key ]['img_url']       = $image_url;
							$merged_atts['elements'][ $key ]['thumbnail_url'] = $image_thumburl;
							$merged_atts['elements'][ $key ]['img_size']      = [
								$image_meta['width'],
								$image_meta['height']
							];
							if ( empty( $merged_atts['elements'][ $key ]['img_alt'] ) ) {
								$merged_atts['elements'][ $key ]['img_alt'] = get_post_meta( $image_id,
									'_wp_attachment_image_alt', true );
							}
						} else {
							$merged_atts['elements'][ $key ]['img'] = 0;
						}
					}
				}

				$atts = $merged_atts;

				ob_start();
				include STRUCTURED_CONTENT_PLUGIN_DIR . 'templates/shortcodes/faq.php';
				$output = ob_get_contents();
				ob_end_clean();

				return $output;
			}
		} else {

			$temp_content = preg_split( "/(\r\n|\r|\n)/", $content, - 1, PREG_SPLIT_NO_EMPTY );
			$elements     = [];

			foreach ( $temp_content as $key => $value ) {
				$elements[] = json_decode( $value );
			}

			$atts = shortcode_atts( [
				'css_class' => '',
				'title_tag' => 'h2',
				'summary'   => false,
				'elements'  => $elements
			], $atts );

			$allowedTags = [
				'h1',
				'h2',
				'h3',
				'h4',
				'h5',
				'h6',
				'br',
				'ol',
				'ul',
				'li',
				'a',
				'p',
				'p',
				'div',
				'b',
				'strong',
				'i',
				'em'
			];


			ob_start();
			include STRUCTURED_CONTENT_PLUGIN_DIR . 'templates/blocks/faq.php';
			$output = ob_get_contents();
			ob_end_clean();

			return $output;
		}

	}

	static public function job( $atts, $content = null ) {

		$merged_atts = shortcode_atts(
			[
				'css_class'          => '',
				'title_tag'          => 'h2',
				'html'               => 'true',
				'title'              => '',
				'description'        => '',
				'valid_through'      => '',
				'employment_type'    => '',
				'company_name'       => '',
				'same_as'            => '',
				'logo_id'            => '',
				'street_address'     => '',
				'address_locality'   => '',
				'address_region'     => '',
				'postal_code'        => '',
				'address_country'    => '',
				'currency_code'      => '',
				'quantitative_value' => '',
				'base_salary'        => '',
			], $atts );

		if ( ! empty( $merged_atts['logo_id'] ) ) {
			$image_id       = intval( $merged_atts['logo_id'] );
			$image_url      = wp_get_attachment_url( $image_id );
			$image_thumburl = wp_get_attachment_image_url( $image_id, [ 150, 150 ] );
			$image_meta     = wp_get_attachment_metadata( $image_id );
			if ( $image_thumburl !== false && $image_meta !== false && $image_url !== false ) {
				$merged_atts['logo_url']      = $image_url;
				$merged_atts['thumbnail_url'] = $image_thumburl;
				$merged_atts['logo_size']     = [ $image_meta['width'], $image_meta['height'] ];
				if ( empty( $merged_atts['logo_alt'] ) ) {
					$merged_atts['logo_alt'] = get_post_meta( $image_id, '_wp_attachment_image_alt', true );
				}
			} else {
				$merged_atts['logo'] = 0;
			}
		}
		$merged_atts['headline_open_tag']  = '<' . $merged_atts["title_tag"] . '>';
		$merged_atts['headline_close_tag'] = '</' . $merged_atts["title_tag"] . '>';

		$atts = $merged_atts;

		if ( isset( $atts['description'] ) && $atts['description'] !== '' ) {
			$content = $atts['description'];
		}

		ob_start();
		include STRUCTURED_CONTENT_PLUGIN_DIR . 'templates/shortcodes/job.php';
		$output = ob_get_contents();
		ob_end_clean();

		return $output;
	}

	static public function event( $atts, $content = null ) {

		$merged_atts = shortcode_atts(
			[
				'css_class' => '',
				'title_tag' => 'h2',
				'elements'  => '',
			], $atts );

		if ( $merged_atts['elements'] === '' ) {
			$single_atts            = shortcode_atts(
				[
					'html'                  => 'true',
					'title'                 => '',
					'description'           => $content,
					'event_location'        => '',
					'status'                => 'EventScheduled',
					'online_url'            => '',
					'prev_start_date'       => '',
					'event_attendance_mode' => '',
					'start_date'            => '',
					'end_date'              => '',
					'street_address'        => '',
					'address_locality'      => '',
					'address_region'        => '',
					'postal_code'           => '',
					'address_country'       => '',
					'currency_code'         => '',
					'price'                 => '',
					'image_id'              => '',
					'performer'             => '',
					'performer_name'        => '',
					'offer_availability'    => '',
					'offer_url'             => '',
					'offer_valid_from'      => '',
				], $atts
			);
			$single_atts['visible'] = $single_atts['html'] === 'true' ? true : false;
			unset( $single_atts['html'] );
			$merged_atts['elements'] = [ $single_atts ];
		}


		if ( ! empty( $merged_atts['image_id'] ) ) {
			$image_id       = intval( $merged_atts['image_id'] );
			$image_url      = wp_get_attachment_url( $image_id );
			$image_thumburl = wp_get_attachment_image_url( $image_id, [ 150, 150 ] );
			$image_meta     = wp_get_attachment_metadata( $image_id );
			if ( $image_thumburl !== false && $image_meta !== false && $image_url !== false ) {
				$merged_atts['img_url']       = $image_url;
				$merged_atts['thumbnail_url'] = $image_thumburl;
				$merged_atts['img_size']      = [ $image_meta['width'], $image_meta['height'] ];
				if ( empty( $merged_atts['img_alt'] ) ) {
					$merged_atts['img_alt'] = get_post_meta( $image_id, '_wp_attachment_image_alt', true );
				}
			} else {
				$merged_atts['img'] = 0;
			}
		}

		foreach ( $merged_atts['elements'] as $key => $element ) {

			$merged_atts['elements'][ $key ]['status']                = isset( $element['status'] ) && $element['status'] !== '' ? $element['status'] : __( 'EventScheduled' );
			$merged_atts['elements'][ $key ]['event_attendance_mode'] = isset( $element['event_attendance_mode'] ) && $element['event_attendance_mode'] != '' ? $element['event_attendance_mode'] : __( 'MixedEventAttendanceMode' );

			if ( ! empty( $element['image_id'] ) ) {
				$image_id       = intval( $element['image_id'] );
				$image_url      = wp_get_attachment_url( $image_id );
				$image_thumburl = wp_get_attachment_image_url( $image_id, [ 150, 150 ] );
				$image_meta     = wp_get_attachment_metadata( $image_id );
				if ( $image_thumburl !== false && $image_meta !== false && $image_url !== false ) {
					$merged_atts['elements'][ $key ]['img_url']       = $image_url;
					$merged_atts['elements'][ $key ]['thumbnail_url'] = $image_thumburl;
					$merged_atts['elements'][ $key ]['img_size']      = [
						$image_meta['width'],
						$image_meta['height']
					];
					if ( empty( $merged_atts['elements'][ $key ]['img_alt'] ) ) {
						$merged_atts['elements'][ $key ]['img_alt'] = get_post_meta( $image_id, '_wp_attachment_image_alt',
							true );
					}
				} else {
					$merged_atts['elements'][ $key ]['img'] = 0;
				}
			}
		}

		$merged_atts['headline_open_tag']  = '<' . $merged_atts["title_tag"] . '>';
		$merged_atts['headline_close_tag'] = '</' . $merged_atts["title_tag"] . '>';

		$atts = $merged_atts;


		ob_start();
		include STRUCTURED_CONTENT_PLUGIN_DIR . 'templates/shortcodes/event.php';
		$output = ob_get_contents();
		ob_end_clean();

		return $output;
	}

	static public function person( $atts, $content = null ) {

		$merged_atts = shortcode_atts(
			[
				'css_class'        => '',
				'html'             => 'true',
				'person_name'      => '',
				'alternate_name'   => '',
				'job_title'        => '',
				'image_id'         => '',
				'birthdate'        => '',
				'email'            => '',
				'telephone'        => '',
				'url'              => '',
				'colleague'        => '',
				'street_address'   => '',
				'address_locality' => '',
				'address_region'   => '',
				'postal_code'      => '',
				'address_country'  => '',
				'same_as'          => '',
				'works_for_name'   => '',
				'works_for_alt'    => '',
				'works_for_url'    => '',
				'works_for_logo'   => '',
			], $atts );

		if ( ! empty( $merged_atts['image_id'] ) ) {
			$image_id       = intval( $merged_atts['image_id'] );
			$image_url      = wp_get_attachment_url( $image_id );
			$image_thumburl = wp_get_attachment_image_url( $image_id, [ 150, 150 ] );
			$image_meta     = wp_get_attachment_metadata( $image_id );

			if ( $image_thumburl !== false && $image_meta !== false && $image_url !== false ) {
				$merged_atts['image_url']     = $image_url;
				$merged_atts['thumbnail_url'] = $image_thumburl;
				$merged_atts['image_size']    = [ $image_meta['width'], $image_meta['height'] ];
				if ( empty( $merged_atts['image_alt'] ) ) {
					$merged_atts['image_alt'] = get_post_meta( $image_id, '_wp_attachment_image_alt', true );
				}
			} else {
				$merged_atts['image'] = 0;
			}
		}

		if ( isset( $atts['description'] ) && $atts['description'] !== '' ) {
			$content = $atts['description'];
		}
		if ( isset( $atts['homepage'] ) && $atts['homepage'] !== '' ) {
			$merged_atts["url"] = $atts['homepage'];
		}

		if ( isset( $atts['colleague'] ) ) {
			$merged_atts['links'] = explode( ",", $atts['colleague'] );
		}

		if ( isset( $atts['colleagues'] ) ) {
			foreach ( $atts['colleagues'] as $colleague ) {
				$merged_atts['links'][] = $colleague['url'];
			}
		}

		if ( isset( $atts['same_as'] ) ) {
			if ( is_array( $atts['same_as'] ) ) {
				$same_as = [];
				foreach ( $merged_atts['same_as'] as $same ) {
					$same_as[] = $same['url'];
				}
				$merged_atts['same_as'] = $same_as;
			} else {
				$merged_atts['same_as'] = explode( ",", $atts['same_as'] );
			}
		} else {
			$merged_atts['same_as'] = [];
		}

		$atts = $merged_atts;

		ob_start();
		include STRUCTURED_CONTENT_PLUGIN_DIR . 'templates/shortcodes/person.php';
		$output = ob_get_contents();
		ob_end_clean();

		return $output;
	}

	static public function course( $atts, $content = null ) {
		$merged_atts = shortcode_atts(
			[
				'css_class' => '',
				'title_tag' => 'h2',
				'elements'  => '',
			], $atts );

		if ( $merged_atts['elements'] === '' ) {
			$single_atts            = shortcode_atts(
				[
					'html'             => 'true',
					'title'            => '',
					'description'      => $content,
					'provider_name'    => '',
					'provider_same_as' => '',
				], $atts
			);
			$single_atts['visible'] = $single_atts['html'] === 'true' ? true : false;
			unset( $single_atts['html'] );
			$merged_atts['elements'] = [ $single_atts ];
		}

		$merged_atts['headline_open_tag']  = '<' . $merged_atts["title_tag"] . '>';
		$merged_atts['headline_close_tag'] = '</' . $merged_atts["title_tag"] . '>';

		$atts = $merged_atts;

		ob_start();
		include STRUCTURED_CONTENT_PLUGIN_DIR . 'templates/shortcodes/course.php';
		$output = ob_get_contents();
		ob_end_clean();

		return $output;

	}

	/**
	 * Fixes empty Tags in Content of Shortcodes without using wp_autotop
	 *
	 * @param $content
	 *
	 * @return string
	 */
	public function fix_shortcodes( $content ) {
		$array   = [
			'<p>['    => '[',
			']</p>'   => ']',
			']<br />' => ']',
		];
		$content = strtr( $content, $array );

		return $content;
	}

}

StructuredContent_Shortcodes::register();
