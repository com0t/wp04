<?php
/**
 * structuredcontent
 * course.php
 *
 * @author antonioleutsch
 * @package  Default
 * @date     2019-10-13 16:41
 * @version  GIT: 1.0
 *
 */

foreach ( $atts['elements'] as $element ) {
	if ( ! isset( $element['visible'] ) || $element['visible'] == 1 ) : ?>
        <section class="<?php echo ( empty( $atts['css_class'] ) ) ? 'sc_fs_event sc_card' : $atts['css_class']; ?>">
			<?php
			echo $atts['headline_open_tag'];
			echo esc_attr( $element['title'] );
			echo $atts['headline_close_tag'];
			?>
            <p>
				<?php echo htmlspecialchars_decode( do_shortcode( $element['description'] ) ); ?>
            </p>
			<?php if ( ! empty( $element['provider_name'] ) && ! empty( $element['provider_same_as'] ) ) : ?>
                <div class="sc_grey-box">
                    <div class="sc_box-label">
						<?php echo __( 'Provider Information', 'structured-content' ) ?>
                    </div>
                    <div class="sc_row">
                        <div class="sc_input-group">
                            <div class="sc_input-label">
								<?php echo __( 'Provider Name', 'structured-content' ) ?>
                            </div>
                            <div class="wp-block-structured-content-event__location">
								<?php echo $element['provider_name'] ?>
                            </div>
                        </div>
                        <div class="sc_input-group">
                            <div class="sc_input-label">
								<?php echo __( 'Same as (Website / Social Media)', 'structured-content' ) ?>
                            </div>
                            <div class="wp-block-structured-content-event__sameAs">
                                <a href="<?php echo $element['provider_same_as'] ?>"><?php echo $element['provider_same_as'] ?></a>
                            </div>
                        </div>
                    </div>
                </div>
			<?php endif; ?>
        </section>
	<?php endif;
}

foreach ( $atts['elements'] as $element ) { ?>
    <script type="application/ld+json">
		{
			"@context": "http://schema.org",
			"@type": "Course",
			"name": "<?php echo $element['title'] ?>",
			"description": "<?php echo str_replace( '"', '\"', $element['description'] ); ?>"
            <?php if ( ! empty( $element['provider_name'] ) && ! empty( $element['provider_same_as'] ) ) : ?>
			,"provider": {
				"@type": "Organization",
				"name": "<?php echo $element['provider_name']; ?>",
				"sameAs": "<?php echo $element['provider_same_as']; ?>"
			}
			<?php endif; ?>
		}
    </script>
<?php }
