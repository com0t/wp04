<?php
/**
 * structured-content
 * faq.php
 *
 *
 * @category Production
 * @author anl
 * @package  Default
 * @date     2019-05-27 01:19
 */

foreach ( $atts['elements'] as $element ) {
	if ( ! isset( $element['visible'] ) || $element['visible'] == 1 ) : ?>
        <section class="<?php echo ( empty( $atts['css_class'] ) ) ? 'sc_fs_faq sc_card' : $atts['css_class']; ?>">
            <div>
				<?php echo '<' . $atts["question_tag"] . '>' . $element['question'] . '</' . $atts["question_tag"] . '>'; ?>
                <div>
					<?php if ( ! empty( $element['imageID'] ) ) : ?>
                        <figure class="sc_fs_faq__figure">
                            <a href="<?php echo $element['img_url']; ?>" title="<?php echo $element['img_alt']; ?>">
                                <img src="<?php echo $element['thumbnail_url']; ?>"
                                     alt="<?php echo $element['img_alt']; ?>"/>
                            </a>
                        </figure>
					<?php endif; ?>
                    <p>
						<?php echo htmlspecialchars_decode( do_shortcode( $element['answer'] ) ); ?>
                    </p>
                </div>
            </div>
        </section>
	<?php endif;
}
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
                    "text": "<?php echo str_replace( '"', '\"', $element['answer'] ); ?>"
                    <?php if ( ! empty( $element['imageID'] ) ) : ?>
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
