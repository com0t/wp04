/**
 /* Internal dependencies
 */
import {iconColor, icons} from '../../util/icons.jsx';
import {
  escapeQuotes,
  findNextFreeID,
  removeElement,
} from '../../util/helper.jsx';

import SC_Button from '../../components/sc-buttons/index.jsx';
import InfoLabel from '../../components/info-label/index.jsx';
import VisibleLabel from '../../components/visible-label/index.jsx';
import DatetimeDropdown from '../../components/datetime-dropdown/index.jsx';

/**
 /* WordPress dependencies
 */

const {__, _x} = wp.i18n;

const {Fragment} = wp.element;

const {
  RichText,
  PlainText,
  AlignmentToolbar,
  MediaUpload,
  InspectorControls,
  BlockControls,
} = wp.blockEditor;

const {
  PanelRow,
  PanelBody,
  SelectControl,
  TextControl,
} = wp.components;

const {registerBlockType} = wp.blocks;

/* Block constants
*/
const name = 'event';
const title = _x('Event', 'Title of the event block', 'structured-content');
const icon = {src: icons[name], foreground: iconColor};

const keywords = [
  __('event', 'structured-content'),
  __('structured-content', 'structured-content'),
];

const blockAttributes = {
  elements: {
    type: 'array',
    default: [],
  },
  title_tag: {
    type: 'string',
    default: 'h2',
  },
  css_class: {
    type: 'string',
    default: '',
  },
  textAlign: {
    type: 'string',
  },
};

/**
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
  title: title,
  icon: icon,
  category: 'structured-content',
  keywords: keywords,

  attributes: blockAttributes,

  supports: {
    align: ['wide', 'full'],
    stackedOnMobile: true,
  },

  /**
   /* The edit function describes the structure of your block in the context of the editor.
   /* This represents what the editor will render when the block is used.
   /*
   /* The "edit" property must be a valid function.
   /*
   /* @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   */
  edit: ({
           attributes,
           className,
           isSelected,
           setAttributes,
         }) => {

    const {
      elements,
      align,
      textAlign,
      title_tag,
      css_class,
      visible,
    } = attributes;

    function onImageSelect(imageObject, index) {
      setAttributes(
          elements[index] = {
            ...elements[index],
            image_id: imageObject.id,
            image_alt: imageObject.alt,
            thumbnail_url: imageObject.sizes.thumbnail.url,
          },
      );
    }

    function onRemoveImage(index) {
      setAttributes(
          elements[index] = {
            ...elements[index],
            image_id: '',
            image_alt: '',
            thumbnail_url: '',
          },
      );
    }

    function addEvent() {
      let id = findNextFreeID(elements);
      setAttributes({
        elements: [
          ...elements,
          {
            id: id,
            title: '',
            description: '',
            event_location: '',
            status: '',
            online_url: '',
            prev_start_date: '',
            start_date: '',
            end_date: '',
            event_attendance_mode: '',
            street_address: '',
            address_locality: '',
            address_region: '',
            address_country: '',
            postal_code: '',
            imageID: '',
            imageAlt: '',
            thumbnailImageUrl: '',
            currency_code: '',
            price: '',
            performer: '',
            performer_name: '',
            offer_url: '',
            offer_availability: '',
            offer_valid_from: '',
            visible: true,
          },
        ],
      });
    }

    const performerOptions = [
      {
        label: _x('Select a Type',
            'Are you a group or a single person as event performer?',
            'structured-content'), value: null,
      },
      {
        label: _x('Performing Group',
            'You choose that you are a group as event performer',
            'structured-content'),
        value: 'PerformingGroup',
      },
      {
        label: _x('Person',
            'You choose that you are a person as event performer',
            'structured-content'), value: 'Person',
      },
    ];

    const availabilityOptions = [
      {
        label: _x('Select a Type', 'Is the event offer available?',
            'structured-content'), value: null,
      },
      {
        label: _x('In Stock', 'You choose that the event offer is in stock.',
            'structured-content'), value: 'InStock',
      },
      {
        label: _x('Sold Out', 'You choose that the event offer is sold out.',
            'structured-content'), value: 'SoldOut',
      },
      {
        label: _x('Pre Order',
            'You choose that you can pre order the event offer.',
            'structured-content'), value: 'PreOrder',
      },
    ];

    const eventStatusOptions = [
      {
        label: _x('Scheduled', 'You choose whether the event is scheduled.',
            'structured-content'), value: 'EventScheduled',
      },
      {
        label: _x('Cancelled', 'You choose whether the event is cancelled.',
            'structured-content'), value: 'EventCancelled',
      },
      {
        label: _x('Moved Online', 'You choose if the event takes place online.',
            'structured-content'),
        value: 'EventMovedOnline',
      },
      {
        label: _x('Postponed', 'You choose whether the event is postponed.',
            'structured-content'), value: 'EventPostponed',
      },
      {
        label: _x('Rescheduled', 'You choose whether the event is rescheduled.',
            'structured-content'),
        value: 'EventRescheduled',
      },
    ];

    const eventAttendanceOptions = [
      {
        label: _x('Select a Type',
            'Select which attendance mode the event has.',
            'structured-content'), value: null,
      },
      {
        label: _x('Offline', 'You specify that the event takes place offline.',
            'structured-content'),
        value: 'OfflineEventAttendanceMode',
      },
      {
        label: _x('Online', 'You specify that the event takes place online.',
            'structured-content'),
        value: 'OnlineEventAttendanceMode',
      },
      {
        label: _x('Mixed',
            'You specify that the event takes place online and offline.',
            'structured-content'),
        value: 'MixedEventAttendanceMode',
      },
    ];

    let eventRender = elements.sort(function(a, b) {
      return a.index - b.index;
    }).map((data, index) => {
      return (
          <section
              className={
                className,
                align && `align${align}`,
                css_class ? css_class : `sc_card`
              }
              style={{
                textAlign: textAlign,
                margin: '15px auto 0',
              }}
              key={`event-${index}`}
          >
            <div className="sc_toggle-bar">
              <div onClick={() => (setAttributes(elements[index] = {
                ...elements[index],
                visible: !elements[index].visible,
              }))}>
                <VisibleLabel visible={data.visible}/>
              </div>
              <div onClick={() => setAttributes(
                  {elements: removeElement(data.id, elements)})}>
                {icons.remove}
              </div>
            </div>
            <div>
              {wp.element.createElement(title_tag, {class: 'title'},
                  <PlainText
                      placeholder={_x('Enter Your Event Title...',
                          'Give the event a name.',
                          'structured-content')}
                      value={data.title}
                      className="wp-block-structured-content-event__title title"
                      tag={title_tag}
                      onChange={
                        (value) => (setAttributes(
                            elements[index] = {
                              ...elements[index],
                              title: value,
                            },
                        ))}
                      keepplaceholderonfocus="true"
                  />,
              )}
              {!data.thumbnail_url ?
                  <MediaUpload
                      onSelect={(media) => onImageSelect(media, index)}
                      type="image"
                      value={data.image_id}
                      render={({open}) => (
                          <SC_Button action={open} className="inline">
                            {_x('Add Image', 'Add an event image.',
                                'structured-content')}
                          </SC_Button>
                      )}
                  />
                  :
                  <figure style={{position: 'relative'}}>
                    <a href="#" title={data.image_alt}>
                      <img itemProp="image" src={data.thumbnail_url}
                           alt={data.image_alt}
                           style={{marginRight: '-1em', marginTop: 0}}/>
                    </a>
                    <SC_Button action={onRemoveImage.bind(this, index)}
                               className="delete no-margin-top">
                      {icons.close}
                    </SC_Button>
                  </figure>
              }
              <div className="description" itemProp="text">
                <RichText
                    placeholder={_x('Enter your event description here...',
                        'Describe the event for the visitors',
                        'structured-content')}
                    value={data.description}
                    className="wp-block-structured-content-event__text"
                    onChange={(value) => (setAttributes(
                        elements[index] = {
                          ...elements[index],
                          description: value,
                        },
                    ))}
                    keepplaceholderonfocus="true"
                />
              </div>
              <div className="sc_row w-100" style={{marginTop: 15}}>
                <div className="sc_grey-box">
                  <div className="sc_box-label">
                    {_x('Event Meta', 'Enter details of the event.',
                        'structured-content')}
                  </div>
                  <div className="sc_input-group">
                    <div className="sc_input-label">
                      {_x('Name', 'Where does the event take place?',
                          'structured-content')}
                    </div>
                    <TextControl
                        placeholder={_x('Event Location Name',
                            'What is the name of the venue?',
                            'structured-content')}
                        value={data.event_location}
                        type="text"
                        className="wp-block-structured-content-event__location"
                        onChange={(value) => (setAttributes(
                            elements[index] = {
                              ...elements[index],
                              event_location: value,
                            },
                        ))}
                    />
                  </div>
                  <div className="sc_input-group">
                    <div className="sc_input-label">
                      {_x('Event Status',
                          'What is the current status of the event?',
                          'structured-content')}
                    </div>
                    <SelectControl
                        value={data.status}
                        className="w-100"
                        options={eventStatusOptions}
                        onChange={(value) => (setAttributes(
                            elements[index] = {
                              ...elements[index],
                              status: value,
                            },
                        ))}
                    />
                  </div>
                  {data.status === 'EventRescheduled' &&
                  <div className="sc_input-group">
                    <div className="sc_input-label">
                      {_x('Previous Start Date',
                          'When should the event originally take place?',
                          'structured-content')}
                    </div>
                    <DatetimeDropdown
                        value={data.prev_start_date}
                        placeholder={
                          _x('Select Previous Start Date',
                              'When does the event take place?',
                              'structured-content',
                          )
                        }
                        onChange={
                          (value) => (setAttributes(
                              elements[index] = {
                                ...elements[index],
                                prev_start_date: value,
                              },
                          ))
                        }/>
                  </div>
                  }
                  <div className="sc_input-group">
                    <div className="sc_input-label">
                      {_x('Start Date', 'When does the event take place?',
                          'structured-content')}
                    </div>
                    <DatetimeDropdown
                        value={data.start_date}
                        placeholder={
                          _x('Select Start Date',
                              'When does the event take place?',
                              'structured-content',
                          )
                        }
                        onChange={
                          (value) => (setAttributes(
                              elements[index] = {
                                ...elements[index],
                                start_date: value,
                              },
                          ))
                        }/>
                  </div>
                  <div className="sc_input-group">
                    <div className="sc_input-label">
                      {_x('End Date', 'When does the event end?',
                          'structured-content')}
                    </div>
                    <DatetimeDropdown
                        value={data.end_date}
                        placeholder={
                          _x('Select End Date',
                              'When does the event take place?',
                              'structured-content',
                          )
                        }
                        onChange={
                          (value) => (setAttributes(
                              elements[index] = {
                                ...elements[index],
                                end_date: value,
                              },
                          ))
                        }/>
                  </div>
                </div>
                <div className="sc_grey-box">
                  <div className="sc_box-label">
                    {_x('Event Location', 'Details about the venue.',
                        'structured-content')}
                  </div>
                  <div className="sc_input-group">
                    <div className="sc_input-label">
                      {_x('Attendance Mode', 'How is the event held?',
                          'structured-content')}
                    </div>
                    <SelectControl
                        value={data.event_attendance_mode}
                        className="w-100"
                        options={eventAttendanceOptions}
                        onChange={(value) => (setAttributes(
                            elements[index] = {
                              ...elements[index],
                              event_attendance_mode: value,
                            },
                        ))}
                    />
                  </div>
                  {data.event_attendance_mode !==
                  'OfflineEventAttendanceMode' &&
                  <div className="sc_input-group">
                    <div className="sc_input-label">
                      {_x('URL', 'How is the URL of the Event?',
                          'structured-content')}
                    </div>
                    <TextControl
                        placeholder={_x('https://myevent.com',
                            'Online URL of the event.',
                            'structured-content')}
                        type="text"
                        value={data.online_url}
                        className="wp-block-structured-content-job__online_url"
                        onChange={(value) => (setAttributes(
                            elements[index] = {
                              ...elements[index],
                              online_url: value,
                            },
                        ))}
                    />
                  </div>
                  }
                  {data.event_attendance_mode !== 'OnlineEventAttendanceMode' &&
                  <Fragment>
                    <div className="sc_input-group">
                      <div className="sc_input-label">
                        {_x('Street',
                            'Insert the street name of the event location.',
                            'structured-content')}
                      </div>
                      <TextControl
                          placeholder={_x('Any Street 3A',
                              'The concrete street name of the event location.',
                              'structured-content')}
                          type="text"
                          value={data.street_address}
                          className="wp-block-structured-content-job__street_address"
                          onChange={(value) => (setAttributes(
                              elements[index] = {
                                ...elements[index],
                                street_address: value,
                              },
                          ))}
                      />
                    </div>
                    <div className="sc_row">
                      <div className="sc_input-group">
                        <div className="sc_input-label">
                          {_x('Postal Code',
                              'Insert postal code of the event location.',
                              'structured-content')}
                        </div>
                        <TextControl
                            placeholder={_x('Any Postal Code',
                                'The concrete postal code of the event location.',
                                'structured-content')}
                            type="text"
                            value={data.postal_code}
                            className="wp-block-structured-content-job__postal_code"
                            onChange={(value) => (setAttributes(
                                elements[index] = {
                                  ...elements[index],
                                  postal_code: value,
                                },
                            ))}
                        />
                      </div>
                      <div className="sc_input-group">
                        <div className="sc_input-label">
                          {_x('Locality', 'Enter the place name of the event',
                              'structured-content')}
                        </div>
                        <TextControl
                            placeholder={_x('Any city',
                                'The concrete city name of the event location.',
                                'structured-content')}
                            type="text"
                            value={data.address_locality}
                            className="wp-block-structured-content-job__address_locality"
                            onChange={(value) => (setAttributes(
                                elements[index] = {
                                  ...elements[index],
                                  address_locality: value,
                                },
                            ))}
                        />
                      </div>
                    </div>
                    <div className="sc_row">
                      <div className="sc_input-group">
                        <div className="sc_input-label">
                          {_x('Country ISO Code',
                              'Enter the iso code of the country where the event takes place.',
                              'structured-content')}
                        </div>
                        <TextControl
                            placeholder={__('US', 'structured-content')}
                            type="text"
                            value={data.address_country}
                            className="wp-block-structured-content-job__address_country"
                            onChange={(value) => (setAttributes(
                                elements[index] = {
                                  ...elements[index],
                                  address_country: value,
                                },
                            ))}
                        />
                      </div>
                      <div className="sc_input-group">
                        <div className="sc_input-label">
                          {_x('Region ISO Code',
                              'Enter the iso code of the region where the event takes place',
                              'structured-content')}
                        </div>
                        <TextControl
                            placeholder={__('US-CA', 'structured-content')}
                            type="text"
                            value={data.address_region}
                            className="wp-block-structured-content-job__address_region"
                            onChange={(value) => (setAttributes(
                                elements[index] = {
                                  ...elements[index],
                                  address_region: value,
                                },
                            ))}
                        />
                      </div>
                    </div>
                  </Fragment>
                  }
                </div>
              </div>
              <div className="sc_row w-100">
                <div className="sc_grey-box">
                  <div className="sc_box-label">
                    {_x('Performer', 'Details about the performer',
                        'structured-content')}
                  </div>
                  <div className="sc_input-group">
                    <div className="sc_input-label">
                      {_x('Type',
                          'Select which type of performer you are (group or person).',
                          'structured-content')}
                    </div>
                    <SelectControl
                        value={data.performer}
                        className="w-100"
                        options={performerOptions}
                        onChange={(value) => (setAttributes(
                            elements[index] = {
                              ...elements[index],
                              performer: value,
                            },
                        ))}
                    />
                  </div>

                  <div className="sc_input-group">
                    <div className="sc_input-label">
                      {_x('Name', 'Enter the name of the performer.',
                          'structured-content')}
                    </div>
                    <TextControl
                        placeholder={_x('John Doe',
                            'Concrete name of the performer.',
                            'structured-content')}
                        type="text"
                        value={data.performer_name}
                        onChange={(value) => (setAttributes(
                            elements[index] = {
                              ...elements[index],
                              performer_name: value,
                            },
                        ))}
                    />
                  </div>
                </div>
                <div className="sc_grey-box">
                  <div className="sc_box-label">
                    {_x('Offer', 'Details of the event offer.',
                        'structured-content')}
                  </div>
                  <div className="sc_row">
                    <div className="sc_input-group">
                      <div className="sc_input-label">
                        {_x('Availability',
                            'Selsct the availability of the event offer.',
                            'structured-content')}
                      </div>
                      <SelectControl
                          value={data.offer_availability}
                          className="w-100"
                          options={availabilityOptions}
                          onChange={(value) => (setAttributes(
                              elements[index] = {
                                ...elements[index],
                                offer_availability: value,
                              },
                          ))}
                      />
                    </div>

                    <div className="sc_input-group">
                      <div className="sc_input-label">
                        {_x('Ticket Website',
                            'Where to buy tickets of the event?',
                            'structured-content')}
                      </div>
                      <TextControl
                          placeholder={_x('https://your-website.com',
                              'Concrete URL where to buy tickets of the event.',
                              'structured-content')}
                          type="url"
                          value={data.offer_url}
                          onChange={(value) => (setAttributes(
                              elements[index] = {
                                ...elements[index],
                                offer_url: value,
                              },
                          ))}
                      />
                    </div>
                  </div>
                  <div className="sc_row">
                    <div className="sc_input-group">
                      <div className="sc_input-label">
                        {_x('Currency ISO Code',
                            'Select currency ISO code of the event price.',
                            'structured-content')}
                      </div>
                      <TextControl
                          placeholder={__('USD', 'structured-content')}
                          value={data.currency_code}
                          type="text"
                          onChange={(value) => (setAttributes(
                              elements[index] = {
                                ...elements[index],
                                currency_code: value,
                              },
                          ))}
                      />
                    </div>
                    <div className="sc_input-group">
                      <div className="sc_input-label">
                        {_x('Price', 'What is the ticket price of the event?',
                            'structured-content')}
                      </div>
                      <TextControl
                          placeholder="40"
                          type="number"
                          value={data.price}
                          onChange={(value) => (setAttributes(
                              elements[index] = {
                                ...elements[index],
                                price: value,
                              },
                          ))}
                      />
                    </div>
                  </div>
                  <div className="sc_input-group">
                    <div className="sc_input-label">
                      {_x('Valid From',
                          'From when are the event tickets valid?',
                          'structured-content')}
                    </div>
                    <DatetimeDropdown
                        value={data.offer_valid_from}
                        placeholder={
                          _x('Select Valid From',
                              'When does the event take place?',
                              'structured-content',
                          )
                        }
                        onChange={
                          (value) => (setAttributes(
                              elements[index] = {
                                ...elements[index],
                                offer_valid_from: value,
                              },
                          ))
                        }/>
                  </div>
                </div>
              </div>
            </div>
          </section>
      );
    });

    if (elements.length === 0) {
      addEvent();
    }

    return [
      <Fragment>
        {isSelected && (
            <Fragment>
              <BlockControls>
                <AlignmentToolbar
                    value={textAlign}
                    onChange={(nextTextAlign) => setAttributes(
                        {textAlign: nextTextAlign})}
                />
              </BlockControls>
            </Fragment>
        )}
        {isSelected && (
            <Fragment>
              <InspectorControls>
                <PanelBody>
                  <SelectControl
                      label={_x('Title tag',
                          'Select the tag of the event title.',
                          'structured-content')}
                      value={title_tag}
                      options={[
                        {label: 'H2', value: 'h2'},
                        {label: 'H3', value: 'h3'},
                        {label: 'H4', value: 'h4'},
                        {label: 'H5', value: 'h5'},
                        {label: 'p', value: 'p'},
                      ]}
                      onChange={(title_tag) => {
                        setAttributes({title_tag: title_tag});
                      }}
                  />
                  <PanelRow>
                    <TextControl
                        label={_x('CSS class',
                            'Assign an optional CSS class for the event block',
                            'structured-content')}
                        className="w-100"
                        value={css_class}
                        placeholder={_x('additional css classes ...',
                            'Add the css class name of the event block.',
                            'structured-content')}
                        onChange={(css_class) => setAttributes(
                            {css_class: css_class})}
                    />
                  </PanelRow>
                </PanelBody>
              </InspectorControls>
            </Fragment>
        )}
        <div className="sc_multi-wrapper">
          <div className="sc_toggle-bar single">
            <InfoLabel
                url="https://developers.google.com/search/docs/data-types/event"/>
          </div>
          <div>{eventRender}</div>
          <SC_Button action={addEvent} icon={true}>
            {__('Add One', 'structured-content')}
          </SC_Button>
        </div>
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

  deprecated: [
    {
      attributes: {
        title: {
          type: 'string',
          selector: '.wp-block-structured-content-event__title',
        },
        description: {
          type: 'string',
          selector: '.wp-block-structured-content-event__description',
          default: '',
        },
        event_location: {
          type: 'string',
          selector: '.wp-block-structured-content-event__location',
        },
        start_date: {
          type: 'string',
          default: '',
        },
        end_date: {
          type: 'string',
          default: '',
        },
        street_address: {
          type: 'string',
          selector: '.wp-block-structured-content-job__street_address',
          default: '',
        },
        address_locality: {
          type: 'string',
          selector: '.wp-block-structured-content-job__address_locality',
          default: '',
        },
        postal_code: {
          type: 'string',
          selector: '.wp-block-structured-content-job__postal_code',
          default: '',
        },
        address_region: {
          type: 'string',
          selector: '.wp-block-structured-content-job__address_region',
          default: '',
        },
        address_country: {
          type: 'string',
          selector: '.wp-block-structured-content-job__address_country',
          default: '',
        },
        image_id: {
          type: 'number',
          default: '',
        },
        image_alt: {
          type: 'string',
          default: '',
        },
        thumbnail_url: {
          type: 'string',
          default: '',
        },
        currency_code: {
          type: 'string',
          default: '',
        },
        price: {
          type: 'string',
          default: '',
        },
        html: {
          type: 'bool',
          default: true,
        },
        ...blockAttributes,
      },

      isEligible(attributes) {
        return typeof attributes.elements == 'undefined';
      },

      migrate: function(attributes) {
        return {
          ...attributes,
          elements: [
            {
              id: 0,
              title: attributes.title,
              description: attributes.description,
              event_location: attributes.event_location,
              start_date: attributes.start_date,
              end_date: attributes.end_date,
              street_address: attributes.street_address,
              address_locality: attributes.address_locality,
              address_region: attributes.address_region,
              address_country: attributes.address_country,
              postal_code: attributes.postal_code,
              imageID: attributes.imageID,
              imageAlt: attributes.imageAlt,
              thumbnailImageUrl: attributes.thumbnailImageUrl,
              currency_code: attributes.currency_code,
              price: attributes.price,
              visible: attributes.html,
            },
          ],
        };
      },

      save: function(props) {
        const {attributes} = props;
        attributes.description = escapeQuotes(attributes.description);
        return null;
      },
    },
  ],
});
