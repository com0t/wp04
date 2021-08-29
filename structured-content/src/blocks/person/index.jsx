/**
 * Internal dependencies
 */
import {iconColor, icons} from '../../util/icons.jsx';
import SC_Button from '../../components/sc-buttons/index.jsx';
import InfoLabel from '../../components/info-label/index.jsx';
import VisibleLabel from '../../components/visible-label/index.jsx';
import {findNextFreeID, removeElement} from '../../util/helper.jsx';
import DateDropdown from '../../components/date-dropdown/index.jsx';

/**
 /* WordPress dependencies
 */
const {__, _x} = wp.i18n;
const {Fragment} = wp.element;
const {
  AlignmentToolbar,
  MediaUpload,
  InspectorControls,
  BlockControls,
} = wp.blockEditor;
const {PanelRow, PanelBody, TextControl} = wp.components;
const {registerBlockType} = wp.blocks;

/* Block constants
 */
const name = 'person';
const title = _x('Person', 'Person block title', 'structured-content');
const icon = {src: icons[name], foreground: iconColor};

const keywords = [
  _x('person search', 'person search', 'structured-content'),
  _x('person offer', 'person offer', 'structured-content'),
  _x('structured-content', 'structured content element person',
      'structured-content'),
];

const blockAttributes = {
  person_name: {
    type: 'string',
    default: '',
  },
  alternate_name: {
    type: 'string',
    default: '',
  },
  job_title: {
    type: 'string',
    default: '',
  },
  birthdate: {
    type: 'string',
    default: '',
  },
  street_address: {
    type: 'string',
    default: '',
  },
  address_locality: {
    type: 'string',
    default: '',
  },
  postal_code: {
    type: 'string',
    default: '',
  },
  address_region: {
    type: 'string',
    default: '',
  },
  address_country: {
    type: 'string',
    default: '',
  },
  email: {
    type: 'string',
    default: '',
  },
  homepage: {
    type: 'string',
    default: '',
  },
  telephone: {
    type: 'string',
    default: '',
  },
  image_id: {
    type: 'number',
    default: '',
  },
  imageAlt: {
    type: 'string',
    default: '',
  },
  thumbnailImageUrl: {
    type: 'string',
    default: '',
  },
  colleagues: {
    type: 'array',
    default: [],
  },
  same_as: {
    type: 'array',
    default: [],
  },
  works_for_name: {
    type: 'string',
  },
  works_for_alt: {
    type: 'string',
  },
  works_for_url: {
    type: 'string',
  },
  works_for_logo: {
    type: 'string',
  },
  css_class: {
    type: 'string',
    default: '',
  },
  textAlign: {
    type: 'string',
  },
  html: {
    type: 'bool',
    default: true,
  },
};
/* Register: aa Gutenberg Block.
/*
/* Registers a new block provided a unique name and an object defining its
/* behavior. Once registered, the block is made editor as an option to any
/* editor interface where blocks are implemented.
/*
/* @link https://wordpress.org/gutenberg/handbook/block-api/
/* @param  {string}   name     Block name.
/* @param  {Object}   settings Block settings.
/* @return {?WPBlock}          The block, if it has been successfully
/*                             registered otherwise `undefined`.
*/
registerBlockType(`structured-content/${name}`, {
  title: title, // Block title.
  icon: icon,
  category: 'structured-content',
  keywords: keywords,

  attributes: blockAttributes,

  supports: {
    align: ['wide', 'full'],
    stackedOnMobile: true,
  },

  edit: ({attributes, className, isSelected, setAttributes}) => {
    const {
      align,
      textAlign,
      css_class,
      job_title,
      person_name,
      birthdate,
      alternate_name,
      street_address,
      address_locality,
      postal_code,
      address_region,
      address_country,
      email,
      homepage,
      telephone,
      colleagues,
      image_id,
      thumbnailImageUrl,
      html,
      same_as,
      works_for_name,
      works_for_alt,
      works_for_url,
      works_for_logo,
    } = attributes;

    function onImageSelect(imageObject) {
      setAttributes({
        image_id: imageObject.id,
        imageAlt: imageObject.alt,
        thumbnailImageUrl: imageObject.sizes.thumbnail.url,
      });
    }

    function onRemoveImage() {
      setAttributes({
        image_id: null,
        imageAlt: null,
        thumbnailImageUrl: '',
      });
    }

    function addToColleague() {
      let id = findNextFreeID(colleagues);
      setAttributes({
        colleagues: [...colleagues, {id: id, url: ''}],
      });
    }

    function removeFromColleague(id) {
      setAttributes({colleagues: removeElement(id, colleagues)});
    }

    function addToSameAs() {
      let id = findNextFreeID(same_as);
      setAttributes({
        same_as: [...same_as, {id: id, url: ''}],
      });
    }

    function removeFromSameAs(id) {
      setAttributes({same_as: removeElement(id, same_as)});
    }

    function colleaguesSave() {
      let list = '';
      colleagues.map(function(value, index) {
        if (value.url !== '') list += `${value.url},`;
      });
      list = list.substr(0, list.length - 1);
      setAttributes({colleague: list});
    }

    function sameAsSave() {
      let list = '';
      same_as.map(function(value, index) {
        if (value.url !== '') list += `${value.url},`;
      });
      list = list.substr(0, list.length - 1);
      setAttributes({colleague: list});
    }

    function beforeSave() {
      sameAsSave();
      colleaguesSave();
    }

    let colleaguesUrls = colleagues.sort(function(a, b) {
      return a.index - b.index;
    }).map((data, index) => {
      return (
          <div
              style={{
                display: 'grid',
                gridTemplateColumns: '3fr auto',
                gridColumnGap: 5,
                lineHeight: 1,
              }}
              key={`url-${index}`}
          >
            <TextControl
                type="text"
                value={data.url}
                placeholder={
                  data.url !== ''
                      ? data.url
                      : _x(
                      'https://xyz.edu/students/alicejones.html',
                      'URL to a profile to one of your colleagues.',
                      'structured-content',
                      )
                }
                keepplaceholderonfocus="true"
                className={`wp-block-structured-content-person__repeater-${data.id}`}
                onChange={(value) => {
                  setAttributes(
                      (colleagues[index] = {id: data.id, url: value}),
                  );
                  colleaguesSave();
                }}
            />
            <div>
              <SC_Button
                  action={removeFromColleague.bind(this, data.id)}
                  icon={true}
                  className="inline"
                  differentIcon={icons.minus}
              />
            </div>
          </div>
      );
    });
    let sameAsUrls = same_as.sort(function(a, b) {
      return a.index - b.index;
    }).map((data, index) => {
      return (
          <div
              style={{
                display: 'grid',
                gridTemplateColumns: '3fr auto',
                gridColumnGap: 5,
                lineHeight: 1,
              }}
              key={`url-${index}`}
          >
            <TextControl
                type="text"
                value={data.url}
                placeholder={
                  data.url !== ''
                      ?
                      data.url
                      :
                      _x('https://xyz.com/me.html',
                          'Enter a additional profile URL to the person.',
                          'structured-content')
                }
                keepplaceholderonfocus="true"
                className={`wp-block-structured-content-person__repeater-${data.id}`}
                onChange={(value) => {
                  setAttributes(
                      (same_as[index] = {id: data.id, url: value}),
                  );
                  sameAsSave();
                }}
            />
            <div>
              <SC_Button
                  action={removeFromSameAs.bind(this, data.id)}
                  icon={true}
                  className="inline"
                  differentIcon={icons.minus}
              />
            </div>
          </div>
      );
    });
    return [
      <Fragment>
        {isSelected && (
            <Fragment>
              <BlockControls>
                <AlignmentToolbar
                    value={textAlign}
                    onChange={(nextTextAlign) =>
                        setAttributes({textAlign: nextTextAlign})
                    }
                />
              </BlockControls>
            </Fragment>
        )}
        {isSelected && (
            <Fragment>
              <InspectorControls>
                <PanelBody>
                  <PanelRow>
                    <TextControl
                        label={_x('CSS class',
                            'Assign an optional CSS class for the person block',
                            'structured-content')}
                        className="w-100"
                        value={css_class}
                        placeholder={_x(
                            'Additional CSS classes.',
                            'Add the CSS class for the person block.',
                            'structured-content',
                        )}
                        onChange={(css_class) =>
                            setAttributes({css_class: css_class})
                        }
                    />
                  </PanelRow>
                </PanelBody>
              </InspectorControls>
            </Fragment>
        )}
        <section
            className={
              (className,
              align && `align${align}`,
                  css_class ? css_class : `sc_card`)
            }
            style={{
              textAlign: textAlign,
            }}
        >
          <div className="sc_toggle-bar">
            <div
                onClick={() => {
                  setAttributes({html: !html});
                }}
            >
              <VisibleLabel visible={html}/>
            </div>
            <InfoLabel
                url="https://developers.google.com/search/docs/data-types/person-posting"/>
          </div>
          <div>
            <div className="sc_row mt-4" style={{marginTop: 15}}>
              <div className="sc_grey-box">
                <div className="sc_box-label">
                  {_x('Personal', 'Some details about the person.',
                      'structured-content')}
                </div>
                <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '2fr 1fr',
                      gridColumnGap: 15,
                    }}
                >
                  <div className="sc_person-infos">
                    <div className="sc_input-group">
                      <div className="sc_input-label">
                        {_x('Name', 'Name of the person.',
                            'structured-content')}
                      </div>
                      <TextControl
                          type="text"
                          value={person_name}
                          placeholder={_x(
                              'Please enter your name here.',
                              'Enter the name of the person.',
                              'structured-content',
                          )}
                          className="wp-block-structured-content-person__person_name"
                          onChange={(person_name) =>
                              setAttributes({person_name: person_name})
                          }
                      />
                    </div>
                    <div className="sc_input-group">
                      <div className="sc_input-label">
                        {_x('Alternate Name',
                            'Enter the alternate name of the person.',
                            'structured-content')}
                      </div>
                      <TextControl
                          type="text"
                          value={alternate_name}
                          placeholder={_x(
                              'Alternate name',
                              'Concrete alternate name of the person.',
                              'structured-content',
                          )}
                          className="wp-block-structured-content-person__alternate_name"
                          onChange={(alternate_name) =>
                              setAttributes({alternate_name: alternate_name})
                          }
                      />
                    </div>
                    <div className="sc_input-group" style={{marginTop: 15}}>
                      <div className="sc_input-label">
                        {_x('Job Title', 'Actual job title of the person',
                            'structured-content')}
                      </div>
                      <TextControl
                          type="text"
                          value={job_title}
                          placeholder={_x(
                              'Please enter your job title here.',
                              'Concrete job title of the person.',
                              'structured-content',
                          )}
                          className="wp-block-structured-content-person__job_title"
                          onChange={(job_title) =>
                              setAttributes({job_title: job_title})
                          }
                      />
                    </div>
                    <div className="sc_input-group">
                      <div className="sc_input-label">
                        {_x('Birthdate', 'Birthdate of the person.',
                            'structured-content')}
                      </div>
                      <DateDropdown
                          placeholder={
                            _x('Select Birthdate',
                                'Select Birthdate of the person',
                                'structured-content',
                            )
                          }
                          value={birthdate}
                          onChange={(birthdate) => setAttributes(
                              {birthdate: birthdate})}
                      />
                    </div>
                  </div>
                  <div className="sc_person-image">
                    <div className="sc_input-group">
                      <div className="sc_input-label">
                        {_x('Image', 'Image of the person.',
                            'structured-content')}
                      </div>
                      <div>
                        {!thumbnailImageUrl ? (
                            <MediaUpload
                                onSelect={onImageSelect}
                                type="image"
                                value={image_id}
                                render={({open}) => (
                                    <SC_Button
                                        action={open}
                                        className="no-margin-top"
                                    >
                                      {_x('Add Image',
                                          'Select image of the person now.',
                                          'structured-content')}
                                    </SC_Button>
                                )}
                            />
                        ) : (
                            <div>
                              <div className="image-wrapper">
                                <img itemProp="image" src={thumbnailImageUrl}/>
                              </div>
                              <SC_Button
                                  action={onRemoveImage}
                                  className="no-margin-top"
                              >
                                {_x('Remove Image',
                                    'Remove the image of the person.',
                                    'structured-content')}
                              </SC_Button>
                            </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sc_grey-box">
                <div className="sc_box-label">
                  {_x('Contact', 'How to get in touch with the person?',
                      'structured-content')}
                </div>
                <div className="sc_input-group">
                  <div className="sc_input-label">
                    {_x('E-Mail', 'E-Mail of the person.',
                        'structured-content')}
                  </div>
                  <TextControl
                      placeholder={_x('jane-doe@xyz.edu',
                          'Concrete email of the person.',
                          'structured-content')}
                      value={email}
                      type="email"
                      className="wp-block-structured-content-person__email"
                      onChange={(email) => setAttributes({email: email})}
                  />
                </div>
                <div className="sc_input-group" style={{marginTop: 15}}>
                  <div className="sc_input-label">
                    {_x('URL', 'URL to a profile of the person.',
                        'structured-content')}
                  </div>
                  <TextControl
                      placeholder={_x(
                          'http://www.janedoe.com',
                          'Concrete URL of the person.',
                          'structured-content',
                      )}
                      value={homepage}
                      type="url"
                      className="wp-block-structured-content-person__homepage"
                      onChange={(homepage) =>
                          setAttributes({homepage: homepage})
                      }
                  />
                </div>
                <div className="sc_input-group" style={{marginTop: 15}}>
                  <div className="sc_input-label">
                    {_x('Telephone', 'Telephone number of the person.',
                        'structured-content')}
                  </div>
                  <TextControl
                      placeholder={_x('(425) 123-4567',
                          'Enter concrete telephone number of the person.',
                          'structured-content')}
                      value={telephone}
                      type="tel"
                      className="wp-block-structured-content-person__telephone"
                      onChange={(telephone) =>
                          setAttributes({telephone: telephone})
                      }
                  />
                </div>
              </div>
            </div>
            <div className="sc_row" style={{marginTop: 15}}>
              <div className="sc_grey-box">
                <div className="sc_box-label">
                  {_x('Address', 'Address of the person.',
                      'structured-content')}
                </div>
                <div className="sc_input-group">
                  <div className="sc_input-label">
                    {_x('Street',
                        'Insert the street name where the person live.',
                        'structured-content')}
                  </div>
                  <TextControl
                      placeholder={_x('Any Street 3A',
                          'The concrete street name where the person live.',
                          'structured-content')}
                      type="text"
                      value={street_address}
                      className="wp-block-structured-content-person__street_address"
                      onChange={(street_address) =>
                          setAttributes({street_address: street_address})
                      }
                  />
                </div>
                <div className="sc_row">
                  <div className="sc_input-group">
                    <div className="sc_input-label">
                      {_x('Postal Code',
                          'Insert postal code where the person live.',
                          'structured-content')}
                    </div>
                    <TextControl
                        placeholder={_x('Any postal code',
                            'The concrete postal code where the person live.',
                            'structured-content')}
                        type="text"
                        value={postal_code}
                        className="wp-block-structured-content-person__postal_code"
                        onChange={(postal_code) =>
                            setAttributes({postal_code: postal_code})
                        }
                    />
                  </div>
                  <div className="sc_input-group">
                    <div className="sc_input-label">
                      {_x('Locality',
                          'Enter the place name where the person live.',
                          'structured-content')}
                    </div>
                    <TextControl
                        placeholder={_x('Any city',
                            'The concrete city name where the person live.',
                            'structured-content')}
                        type="text"
                        value={address_locality}
                        className="wp-block-structured-content-person__address_locality"
                        onChange={(address_locality) =>
                            setAttributes({address_locality: address_locality})
                        }
                    />
                  </div>
                </div>
                <div className="sc_row">
                  <div className="sc_input-group">
                    <div className="sc_input-label">
                      {_x('Country ISO Code',
                          'Enter the iso code of the country where the person live.',
                          'structured-content')}
                    </div>
                    <TextControl
                        placeholder={__('US', 'structured-content')}
                        type="text"
                        value={address_country}
                        className="wp-block-structured-content-person__address_country"
                        onChange={(address_country) =>
                            setAttributes({address_country: address_country})
                        }
                    />
                  </div>
                  <div className="sc_input-group">
                    <div className="sc_input-label">
                      {_x('Region ISO Code',
                          'Enter the iso code of the region where the person live.',
                          'structured-content')}
                    </div>
                    <TextControl
                        placeholder={__('US-CA', 'structured-content')}
                        type="text"
                        value={address_region}
                        className="wp-block-structured-content-person__address_region"
                        onChange={(address_region) =>
                            setAttributes({address_region: address_region})
                        }
                    />
                  </div>
                </div>
              </div>
              <div className="sc_grey-box">
                <div className="sc_box-label">
                  {_x('Colleague',
                      'URL to a profile to one of your colleagues.',
                      'structured-content')}
                </div>
                <div className="sc_input-group" style={{marginTop: 15}}>
                  <div className="sc_input-label">
                    {_x('URL',
                        'Enter the URL to a profile to one of your colleagues.',
                        'structured-content')}
                  </div>
                  <div>
                    <div>{colleaguesUrls}</div>
                    <SC_Button action={addToColleague} icon={true}>
                      {_x('Add One', 'Add another colleague.',
                          'structured-content')}
                    </SC_Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="sc_row" style={{marginTop: 15}}>
              <div className="sc_grey-box">
                <div className="sc_box-label">
                  {_x('Work', 'Details about the workplace of the person.',
                      'structured-content')}
                </div>
                <div className="sc_input-group">
                  <div className="sc_input-label">
                    {_x('Company Name',
                        'Name of the company the person works for.',
                        'structured-content')}
                  </div>
                  <TextControl
                      placeholder={_x('Enter company name.',
                          'Enter the name of the company the person works for.',
                          'structured-content')}
                      type="text"
                      value={works_for_name}
                      className="wp-block-structured-content-person__works_for_name"
                      onChange={(works_for_name) =>
                          setAttributes({works_for_name: works_for_name})
                      }
                  />
                </div>
                <div className="sc_input-group">
                  <div className="sc_input-label">
                    {_x('Alternate Company Name',
                        'Alternate name of the company the person works for.',
                        'structured-content')}
                  </div>
                  <TextControl
                      placeholder={_x(
                          'Alternate name',
                          'Enter the alternate name of the company the person works for.',
                          'structured-content',
                      )}
                      type="text"
                      value={works_for_alt}
                      className="wp-block-structured-content-person__works_for_alt"
                      onChange={(works_for_alt) =>
                          setAttributes({works_for_alt: works_for_alt})
                      }
                  />
                </div>
                <div className="sc_row">
                  <div className="sc_input-group">
                    <div className="sc_input-label">
                      {_x('URL',
                          'URL of the company website the person works for.',
                          'structured-content')}
                    </div>
                    <TextControl
                        placeholder={_x(
                            'https://xyz.com',
                            'Enter URL of the company website the person works for.',
                            'structured-content',
                        )}
                        type="url"
                        value={works_for_url}
                        className="wp-block-structured-content-person__works_for_url"
                        onChange={(works_for_url) =>
                            setAttributes({works_for_url: works_for_url})
                        }
                    />
                  </div>
                  <div className="sc_input-group">
                    <div className="sc_input-label">
                      {_x('Logo',
                          'URL to the logo of the company the person works for.',
                          'structured-content')}
                    </div>
                    <TextControl
                        placeholder={_x(
                            'https://xyz.com/logo.jpg',
                            'Enter the URL to the logo of the company the person works for.',
                            'structured-content',
                        )}
                        type="url"
                        value={works_for_logo}
                        className="wp-block-structured-content-person__works_for_logo"
                        onChange={(works_for_logo) =>
                            setAttributes({works_for_logo: works_for_logo})
                        }
                    />
                  </div>
                </div>
              </div>
              <div className="sc_grey-box">
                <div className="sc_box-label">
                  {_x('Same As', 'Profile URL of the person.',
                      'structured-content')}
                </div>
                <div className="sc_input-group" style={{marginTop: 15}}>
                  <div className="sc_input-label">
                    {_x('URL', 'URL to a profile of the person.',
                        'structured-content')}
                  </div>
                  <div>
                    <div>{sameAsUrls}</div>
                    <SC_Button action={addToSameAs} icon={true}>
                      {_x('Add One',
                          'Add another URL to a profile of the person.',
                          'structured-content')}
                    </SC_Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>,
    ];
  },

  /**
   /* The save function defines the way in which the different attributes should be combined
   /* into the final markup, which is then serialized by Gutenberg into post_content.
   /*
   /* The "save" property must be specified and must be a valid function.
   /*
   /* @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   */
  save: function(props) {
    return null;
  },
});
