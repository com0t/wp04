<?php
/**
 * structuredcontent
 * faq-old.php
 *
 * @author antonioleutsch
 * @package  Default
 * @date     2019-08-13 11:19
 * @version  GIT: 1.0
 *
 */

?>
<?php if ( $atts['html'] === 'true' ) : ?>
    <section class="<?php echo ( empty( $atts['css_class'] ) ) ? 'sc_fs_faq sc_card' : $atts['css_class']; ?>">
        <div>
			<?php
			echo $atts['headline_open_tag'];
			echo esc_attr( $atts['question'] );
			echo $atts['headline_close_tag'];
			?>
            <div>
				<?php if ( ! empty( $atts['img'] ) ) : ?>
                    <figure class="sc_fs_faq__figure">
                        <a href="<?php echo $atts['img_url']; ?>" title="<?php echo $atts['img_alt']; ?>">
                            <img src="<?php echo $atts['thumbnail_url']; ?>" alt="<?php echo $atts['img_alt']; ?>"/>
                        </a>
                        <meta content="<?php echo $atts['img_url'] ?>">
                        <meta content="<?php echo $atts['img_size'][0]; ?>">
                        <meta content="<?php echo $atts['img_size'][1]; ?>">
                    </figure>
				<?php endif; ?>
                <p>
					<?php echo htmlspecialchars_decode( do_shortcode( $content ) ); ?>
                </p>
            </div>
        </div>
    </section>
<?php endif; ?>

<script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "<?php echo esc_attr( $atts['question'] ); ?>",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "<?php echo str_replace( '"', '\"', $content ); ?>"
                    <?php if ( ! empty( $atts['img'] ) ) : ?>
                    ,
                    "image" : {
                        "@type" : "ImageObject",
                        "contentUrl" : "<?php echo $atts['img_url']; ?>"
                    }
                    <?php endif; ?>
                }
            }
        ]
    }
</script>
