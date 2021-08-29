<?php
/**
 * structuredcontent
 * multi-faq.php
 *
 * @author antonioleutsch
 * @package  Default
 * @date     2019-08-22 14:55
 * @version  GIT: 1.0
 *
 */

if ( $atts['html'] === 'true' ) :
	foreach ( $atts['elements'] as $item ) { ?>
        <section class="<?php echo ( empty( $atts['css_class'] ) ) ? 'sc_fs_faq sc_card' : $atts['css_class']; ?>">
            <div>
				<?php
				echo '<' . $item['headline'] . '>';
				echo esc_attr( $item['question'] );
				echo '</' . $item['headline'] . '>';
				?>
                <div>
					<?php if ( ! empty( $item['image'] ) ) : ?>
                        <figure>
                            <a href="<?php echo $item['img_url']; ?>" title="<?php echo $item['img_alt']; ?>">
                                <img class="sc_fs_faq__image" src="<?php echo $item['thumbnail_url']; ?>"
                                     alt="<?php echo $item['img_alt']; ?>"/>
                            </a>
                        </figure>
					<?php endif; ?>
                    <p>
						<?php echo htmlspecialchars_decode( do_shortcode( $item['answer'] ) ); ?>
                    </p>
                </div>
            </div>
        </section>
	<?php }
endif;
?>

<script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
        <?php foreach ( $atts['elements'] as $element ) { ?>
            {
                "@type": "Question",
                "name": "<?php echo esc_attr( $element['question'] ); ?>",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "<?php echo $element['answer']; ?>"
                    <?php if ( ! empty( $element['image'] ) ) : ?>
                    ,
                    "image" : {
                        "@type" : "ImageObject",
                        "contentUrl" : "<?php echo $element['img_url']; ?>"
                    }
                    <?php endif; ?>
                }
            }
            <?php if ( $element !== end( $atts['elements'] ) ) {
		echo ',';
	} ?>
	<?php } ?>
        ]
    }
</script>
