<?php
/**
 * structuredcontent
 * person.php
 *
 *
 * @category Production
 * @author anl
 * @package  Default
 * @date     2019-07-13 00:49
 * @license  http://structuredcontent.com/license.txt structuredcontent License
 * @version  GIT: 1.0
 * @link     https://structuredcontent.com/
 */

?>
<?php
if ( ! isset( $atts['html'] ) || $atts['html'] === 'true' ) : ?>
    <section class="<?php echo ( empty( $atts['css_class'] ) ) ? 'sc_fs_person sc_card' : $atts['css_class']; ?>">
        <div class="sc_row">
            <div class="sc_grey-box">
                <div class="sc_box-label">
					<?php echo __( 'Personal', 'structured-content' ) ?>
                </div>
                <div class="sc_company">
                    <div class="sc_person-infos">
                        <div class="sc_input-group">
                            <div class="sc_input-label">
								<?php echo __( 'Name', 'structured-content' ) ?>
                            </div>
                            <div class="wp-block-structured-content-person__personName">
								<?php echo $atts['person_name'] ?>
                            </div>
                        </div>
						<?php if ( ! empty( $atts['alternate_name'] ) ) { ?>
                            <div class="sc_input-group">
                                <div class="sc_input-label">
									<?php echo __( 'Alternate Name', 'structured-content' ) ?>
                                </div>
                                <div class="wp-block-structured-content-person__personName">
									<?php echo $atts['alternate_name'] ?>
                                </div>
                            </div>
						<?php } ?>
						<?php if ( ! empty( $atts['job_title'] ) ) { ?>
                            <div class="sc_input-group">
                                <div class="sc_input-label">
									<?php echo __( 'Job Title', 'structured-content' ) ?>
                                </div>
                                <div class="wp-block-structured-content-person__jobTitle">
									<?php echo $atts['job_title'] ?>
                                </div>
                            </div>
						<?php } ?>
						<?php if ( ! empty( $atts['birthdate'] ) ) { ?>
                            <div class="sc_input-group">
                                <div class="sc_input-label">
									<?php echo __( 'Birthdate', 'structured-content' ) ?>
                                </div>
                                <div class="wp-block-structured-content-person__jobTitle">
									<?php echo date_i18n( get_option( 'date_format' ), strtotime( $atts['birthdate'] ) ) ?>
                                </div>
                            </div>
						<?php } ?>
                    </div>
					<?php
					if ( ! empty( $atts['image_url'] ) ) : ?>
                        <div class="sc_person-image">
                            <div class="sc_input-group">
                                <div class="sc_input-label">
									<?php echo __( 'Image', 'structured-content' ) ?>
                                </div>
                                <div>
                                    <figure class="sc_person-image-wrapper">
                                        <a href="<?php echo $atts['image_url']; ?>"
                                           title="<?php echo $atts['image_alt']; ?>">
                                            <img src="<?php echo $atts['thumbnail_url']; ?>"
                                                 alt="<?php echo $atts['image_alt']; ?>"/>
                                        </a>
                                        <meta content="<?php echo $atts['image_url'] ?>">
                                        <meta content="<?php echo $atts['image_size'][0]; ?>">
                                        <meta content="<?php echo $atts['image_size'][1]; ?>">
                                    </figure>
                                </div>
                            </div>
                        </div>
					<?php
					endif; ?>
                </div>
            </div>
            <div class="sc_grey-box">
                <div class="sc_box-label">
					<?php echo __( 'Contact', 'structured-content' ) ?>
                </div>
                <div class="sc_input-group">
                    <div class="sc_input-label">
						<?php echo __( 'E-Mail', 'structured-content' ) ?>
                    </div>
                    <div class="wp-block-structured-content-person__email">
                        <a href="mailto:<?php echo $atts['email'] ?>"><?php echo $atts['email'] ?></a>
                    </div>
                </div>
                <div class="sc_input-group">
                    <div class="sc_input-label">
						<?php echo __( 'URL', 'structured-content' ) ?>
                    </div>
                    <div class="wp-block-structured-content-person__url">
                        <a href="<?php echo $atts['url'] ?>"><?php echo $atts['url'] ?></a>
                    </div>
                </div>
                <div class="sc_input-group">
                    <div class="sc_input-label">
						<?php echo __( 'Telephone', 'structured-content' ) ?>
                    </div>
                    <div class="wp-block-structured-content-person__telephone">
                        <a href="tel:<?php echo $atts['telephone'] ?>"><?php echo $atts['telephone'] ?></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="sc_row">
            <div class="sc_grey-box">
                <div class="sc_box-label">
					<?php echo __( 'Address', 'structured-content' ) ?>
                </div>
                <div class="sc_input-group">
                    <div class="sc_input-label">
						<?php echo __( 'Street', 'structured-content' ) ?>
                    </div>
                    <div class="wp-block-structured-content-person__streetAddress">
						<?php echo $atts['street_address'] ?>
                    </div>
                </div>
                <div class="sc_row">
                    <div class="sc_input-group">
                        <div class="sc_input-label">
							<?php echo __( 'Postal Code', 'structured-content' ) ?>
                        </div>
                        <div class="wp-block-structured-content-person__postalCode">
							<?php echo $atts['postal_code'] ?>
                        </div>
                    </div>
                    <div class="sc_input-group">
                        <div class="sc_input-label">
							<?php echo __( 'Locality', 'structured-content' ) ?>
                        </div>
                        <div class="wp-block-structured-content-person__addressLocality">
							<?php echo $atts['address_locality'] ?>
                        </div>
                    </div>
                </div>
                <div class="sc_row">
                    <div class="sc_input-group">
                        <div class="sc_input-label">
							<?php echo __( 'Country ISO Code', 'structured-content' ) ?>
                        </div>
                        <div class="wp-block-structured-content-person__addressCountry">
							<?php echo $atts['address_country'] ?>
                        </div>
                    </div>
                    <div class="sc_input-group">
                        <div class="sc_input-label">
							<?php echo __( 'Region ISO Code', 'structured-content' ) ?>
                        </div>
                        <div class="wp-block-structured-content-person__addressRegion">
							<?php echo $atts['address_region'] ?>
                        </div>
                    </div>
                </div>
            </div>
            <div class="sc_grey-box">
                <div class="sc_box-label">
					<?php echo __( 'Colleague', 'structured-content' ) ?>
                </div>
                <div class="sc_input-group">
                    <div class="sc_input-label">
						<?php echo __( 'URL', 'structured-content' ) ?>
                    </div>
                    <div class="wp-block-structured-content-person__colleague_url">
                        <ul>
							<?php
							if ( isset( $atts['links'] ) && ! empty( $atts['links'] ) ) {
								foreach ( $atts['links'] as $url ) { ?>
                                    <li><a href="<?php echo $url ?>"><?php echo $url ?></a></li>
									<?php
								}
							} ?>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="sc_row">
			<?php
			if ( isset( $atts['works_for_name'] ) ) { ?>
                <div class="sc_grey-box">
                    <div class="sc_box-label">
						<?php echo __( 'Work', 'structured-content' ) ?>
                    </div>
                    <div class="sc_input-group">
                        <div class="sc_input-label">
							<?php echo __( 'Organisation Name', 'structured-content' ) ?>
                        </div>
                        <div class="wp-block-structured-content-person__workName">
							<?php echo $atts['works_for_name'] ?>
                        </div>
                    </div>
					<?php
					if ( isset( $atts['works_for_alt'] ) ) { ?>
                        <div class="sc_input-group">
                            <div class="sc_input-label">
								<?php echo __( 'Alternate Name', 'structured-content' ) ?>
                            </div>
                            <div class="wp-block-structured-content-person__workAlt">
								<?php echo $atts['works_for_alt'] ?>
                            </div>
                        </div>
						<?php
					} ?>
					<?php
					if ( isset( $atts['works_for_url'] ) || $atts['works_for_logo'] ) { ?>
                        <div class="sc_row">
							<?php
							if ( isset( $atts['works_for_url'] ) ) { ?>
                                <div class="sc_input-group">
                                    <div class="sc_input-label">
										<?php echo __( 'Url', 'structured-content' ) ?>
                                    </div>
                                    <div class="wp-block-structured-content-person__workURL">
                                        <a href="<?php echo $atts['works_for_url'] ?>"><?php echo $atts['works_for_url'] ?></a>
                                    </div>
                                </div>
								<?php
							} ?>
							<?php
							if ( isset( $atts['works_for_logo'] ) ) { ?>
                                <div class="sc_input-group">
                                    <div class="sc_input-label">
										<?php echo __( 'Logo', 'structured-content' ) ?>
                                    </div>
                                    <div class="wp-block-structured-content-person__workLogo">
                                        <figure class="sc_person-image-wrapper">
                                            <a href="<?php echo $atts['works_for_logo']; ?>"
                                               title="<?php echo $atts['works_for_name']; ?>">
                                                <img src="<?php echo $atts['works_for_logo'] ?>"
                                                     alt="<?php echo $atts['works_for_name'] ?>">
                                            </a>
                                        </figure>

                                    </div>
                                </div>
								<?php
							} ?>
                        </div>
						<?php
					} ?>
                </div>
				<?php
			} ?>
            <div class="sc_grey-box">
                <div class="sc_box-label">
					<?php echo __( 'Same as', 'structured-content' ) ?>
                </div>
                <div class="sc_input-group">
                    <div class="sc_input-label">
						<?php echo __( 'URL', 'structured-content' ) ?>
                    </div>
                    <div class="wp-block-structured-content-person__samAs_url">
                        <ul>
							<?php
							if ( isset( $atts['same_as'] ) && ! empty( $atts['same_as'] ) ) {
								foreach ( $atts['same_as'] as $url ) { ?>
                                    <li><a href="<?php echo $url ?>"><?php echo $url ?></a></li>
									<?php
								}
							} ?>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
<?php endif; ?>
<script type="application/ld+json">
    {
        "@context": "http://schema.org",
        "@type": "Person",
        <?php if ( ! empty( $atts['street_address'] ) || ! empty( $atts['address_locality'] ) || ! empty( $atts['address_region'] ) || ! empty( $atts['postal_code'] ) || ! empty( $atts['address_country'] ) ) { ?>
        "address" : {
            "@type" : "PostalAddress",
            <?php if ( ! empty( $atts['street_address'] ) ) { ?>
            "streetAddress" : "<?php echo $atts['street_address'] ?>",
            <?php } ?>
		<?php if ( ! empty( $atts['address_locality'] ) ) { ?>
            "addressLocality" : "<?php echo $atts['address_locality'] ?>",
            <?php } ?>
		<?php if ( ! empty( $atts['address_region'] ) ) { ?>
            "addressRegion" : "<?php echo $atts['address_region'] ?>",
            <?php } ?>
		<?php if ( ! empty( $atts['postal_code'] ) ) { ?>
            "postalCode" : "<?php echo $atts['postal_code'] ?>",
            <?php } ?>
		<?php if ( ! empty( $atts['address_country'] ) ) { ?>
            "addressCountry": "<?php echo $atts['address_country'] ?>"
            <?php } ?>
        },
        <?php } ?>
        <?php if ( isset( $atts['links'] ) && ! empty( $atts['links'] ) ) {
		echo '"colleague": [';
		foreach ( $atts['links'] as $link => $url ) :
			echo '"' . $url . '"';
			echo $link !== count( $atts['links'] ) - 1 ? ", \n" : " \n";
		endforeach;
		echo '],';
	} ?>
	    <?php if ( ! empty( $atts['birthdate'] ) ) { ?>
            "birthDate": "<?php echo $atts['birthdate']; ?>",
        <?php } ?>
	    <?php if ( ! empty( $atts['email'] ) ) { ?>
            "email": "<?php echo $atts['email']; ?>",
        <?php } ?>
        <?php if ( ! empty( $atts['image_id'] ) ) { ?>
            "image": "<?php echo wp_get_attachment_url( $atts['image_id'] ) ?>",
        <?php } ?>
        <?php if ( ! empty( $atts['job_title'] ) ) { ?>
            "jobTitle": "<?php echo $atts['job_title']; ?>",
        <?php } ?>
        <?php if ( ! empty( $atts['person_name'] ) ) { ?>
            "name": "<?php echo $atts['person_name']; ?>",
        <?php } ?>
        <?php if ( ! empty( $atts['telephone'] ) ) { ?>
            "telephone": "<?php echo $atts['telephone']; ?>",
        <?php } ?>
        <?php if ( ! empty( $atts['url'] ) ) { ?>
            "url": "<?php echo $atts['url']; ?>",
        <?php } ?>
        <?php if ( ! empty( $atts['alternate_name'] ) ) { ?>
            "alternateName" : "<?php echo $atts['alternate_name'] ?>",
        <?php } ?>
        <?php if ( isset( $atts['same_as'] ) && count( $atts['same_as'] ) > 0 ) { ?>
        "sameAs" : [
            <?php foreach ( $atts['same_as'] as $link => $url ) :
                echo '"' . $url . '"';
                echo $link !== count( $atts['same_as'] ) - 1 ? ", \n" : " \n";
            endforeach; ?>
            ],
        <?php } ?>
        <?php if ( isset( $atts['works_for_name'] ) && ! empty( $atts['works_for_name'] ) ) { ?>
        "worksFor": {
            "@type": "Organization",
            "name": "<?php echo $atts['works_for_name'] ?>"
            <?php
		if ( isset( $atts['works_for_alt'] ) ) { ?>
                ,"alternateName": "<?php echo $atts['works_for_alt'] ?>"
            <?php } ?>
		<?php
		if ( isset( $atts['works_for_url'] ) ) { ?>
                ,"url": "<?php echo $atts['works_for_url'] ?>"
            <?php } ?>
		<?php
		if ( isset( $atts['works_for_logo'] ) ) { ?>
                ,"logo": "<?php echo $atts['works_for_logo'] ?>"
            <?php } ?>
        }
        <?php  } ?>
    }
</script>
