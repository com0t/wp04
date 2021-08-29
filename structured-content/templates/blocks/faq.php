<?php
/**
 * structured-content
 * faq.php
 *
 * @author antonioleutsch
 * @package  Default
 * @date     12.09.20 12:11
 * @version  GIT: 1.0
 *
 */
foreach ( $atts['elements'] as $element ) {
	if ( $element->atts->visible ) { ?>
        <<?php echo $atts['summary'] ? 'details' : 'section'; ?>
        class="<?php echo ( empty( $atts['css_class'] ) ) ? 'sc_fs_faq sc_card' : $atts['css_class']; ?>"
		<?php echo $atts['summary'] && $element->atts->open ? 'open' : ''; ?>
        >
		<?php if ( $atts['summary'] ) { ?>
            <summary>
		<?php } ?>
		<?php echo '<' . $atts['title_tag'] . '>' . esc_attr( $element->atts->question ) . '</' . $atts['title_tag'] . '>'; ?>
		<?php if ( $atts['summary'] ) { ?>
            </summary>
		<?php } ?>
        <div>
			<?php if ( $element->atts->thumbnailImageUrl ) { ?>
                <figure class="sc_fs_faq__figure">
                    <a
                            href="<?php echo $element->atts->thumbnailImageUrl ?>"
                            title="<?php echo $element->atts->imageAlt ?>"
                    >
                        <img
                                class="sc_fs_faq__image"
                                src="<?php echo $element->atts->thumbnailImageUrl ?>"
                                alt="<?php echo $element->atts->imageAlt ?>"
                        >
                    </a>
                </figure>
			<?php } ?>
            <div class="sc_fs_faq__content">
				<?php echo $element->content; ?>
            </div>
        </div>
        </<?php echo $atts['summary'] ? 'details' : 'section'; ?>>
	<?php }
} ?>

<script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
        <?php foreach ( $atts['elements'] as $element ) {
		// Remove not allowed Tags
		$content = strip_tags( $element->content, $allowedTags );
		// Remove Attributes from Tags
		$content = preg_replace( "/<([a-z][a-z0-9]*)[^>]*?(\/?)>/si", '<$1$2>', $content );
		?>
            {
                "@type": "Question",
                "name": "<?php echo esc_attr( $element->atts->question ); ?>",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "<?php echo addcslashes( $content, '"\\' ); ?>"
                    <?php if ( $element->atts->thumbnailImageUrl ) { ?>
                    ,
                    "image" : {
                        "@type" : "ImageObject",
                        "contentUrl" : "<?php echo $element->atts->thumbnailImageUrl; ?>"
                    }
                    <?php } ?>
                }
            }
            <?php echo $element !== end( $atts['elements'] ) ? ',' : '' ?>
	<?php } ?>
        ]
    }
</script>
