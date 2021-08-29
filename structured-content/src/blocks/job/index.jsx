/**
 /* Internal dependencies
 */
import { iconColor, icons } from '../../util/icons.jsx'
import { escapeQuotes } from '../../util/helper.jsx'
import SC_Button from '../../components/sc-buttons/index.jsx'
import InfoLabel from '../../components/info-label/index.jsx'
import VisibleLabel from '../../components/visible-label/index.jsx'
import DateDropdown from '../../components/date-dropdown/index.jsx'

/**
 /* WordPress dependencies
 */
const { __, _x } = wp.i18n // Import __() from wp.i18n
const { Fragment } = wp.element
const {
  RichText,
  PlainText,
  AlignmentToolbar,
  MediaUpload,
  InspectorControls,
  BlockControls,
} = wp.blockEditor
const { PanelRow, PanelBody, SelectControl, TextControl } = wp.components
const { registerBlockType } = wp.blocks

/* Block constants
*/
const name = 'job'
const blockTitle = _x('Job', 'Job block title', 'structured-content')
const icon = { src: icons[name], foreground: iconColor }

const keywords = [
  _x('job search', 'Job search', 'structured-content'),
  _x('job offer', 'Job offer', 'structured-content'),
  _x('structured-content', 'Structured content element job',
    'structured-content'),
]

const blockAttributes = {
  title: {
    type: 'string',
    default: 'Job Title',
  },
  titleTag: {
    type: 'string',
    default: 'h2',
  },
  description: {
    type: 'html',
    default: '',
  },
  valid_through: {
    type: 'string',
    default: '',
  },
  company_name: {
    type: 'string',
    default: '',
  },
  employment_type: {
    type: 'string',
    default: '',
  },
  same_as: {
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
  base_salary: {
    type: 'string',
    default: '',
  },
  currency_code: {
    type: 'string',
    default: '',
  },
  quantitative_value: {
    type: 'string',
    default: '',
  },
  logo_id: {
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
}
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
  title: blockTitle, // Block title.
  icon: icon,
  category: 'structured-content',
  keywords: keywords,

  attributes: blockAttributes,

  supports: {
    align: ['wide', 'full'],
    stackedOnMobile: true,
  },

  edit: ({
    attributes,
    className,
    isSelected,
    setAttributes,
  }) => {

    const {
      align,
      textAlign,
      titleTag,
      title,
      css_class,
      description,
      same_as,
      company_name,
      street_address,
      address_locality,
      postal_code,
      address_region,
      address_country,
      base_salary,
      currency_code,
      quantitative_value,
      valid_through,
      employment_type,
      logo_id,
      imageAlt,
      thumbnailImageUrl,
      html,
    } = attributes

    function onImageSelect (imageObject) {
      setAttributes({
        logo_id: imageObject.id,
        imageAlt: imageObject.alt,
        thumbnailImageUrl: imageObject.sizes.thumbnail.url,
      })
    }

    function onRemoveImage () {
      setAttributes({
        logo_id: null,
        imageAlt: null,
        thumbnailImageUrl: '',
      })
    }

    const employmentOptions = [
      {
        label: _x('Select a Type', 'Choose the employment type of the job offer.', 'structured-content'),
        value: '',
      },
      {
        label: _x('Full Time', 'You can work full time in the job.', 'structured-content'),
        value: 'FULL_TIME',
      },
      {
        label: _x('Part Time', 'You can work part time in the job.', 'structured-content'),
        value: 'PART_TIME',
      },
      {
        label: _x('Contractor', 'You can work as a contractor in the job.', 'structured-content'),
        value: 'CONTRACTOR',
      },
      {
        label: _x('Temporary', 'You can work temporary in the job.', 'structured-content'),
        value: 'TEMPORARY',
      },
      {
        label: _x('Intern', 'You can work as a intern in the job.', 'structured-content'),
        value: 'INTERN',
      },
      {
        label: _x('Volunteer', 'You can work as a volunteer in the job.', 'structured-content'),
        value: 'VOLUNTEER',
      },
      {
        label: _x('Per Diem', 'You can work per diem in the job.', 'structured-content'),
        value: 'PER_DIEM',
      },
      {
        label: _x('Other', 'You can work in some other way in the job.', 'structured-content'),
        value: 'OTHER',
      },
    ]

    const baseSalaryOptions = [
      {
        label: _x('Select a Type', 'Choose in which time unit the job is paid.', 'structured-content'),
        value: '',
      },
      {
        label: _x('Hourly', 'The job is paid by hours worked.', 'structured-content'),
        value: 'HOUR',
      },
      {
        label: _x('Daily', 'The job is paid by days worked.', 'structured-content'),
        value: 'DAY',
      },
      {
        label: _x('Weekly', 'The job is paid by weeks worked.', 'structured-content'),
        value: 'WEEK',
      },
      {
        label: _x('Monthly', 'The job is paid by month worked.', 'structured-content'),
        value: 'MONTH',
      },
      {
        label: _x('Yearly', 'The job is paid by yearly worked.', 'structured-content'),
        value: 'YEAR',
      },

    ]

    return [
      <Fragment>
        {isSelected && (
          <Fragment>
            <BlockControls>
              <AlignmentToolbar
                value={textAlign}
                onChange={(nextTextAlign) => setAttributes(
                  { textAlign: nextTextAlign })}
              />
            </BlockControls>
          </Fragment>
        )}
        {isSelected && (
          <Fragment>
            <InspectorControls>
              <PanelBody>
                <SelectControl
                  label={_x('Title tag', 'Select a tag of the job title.', 'structured-content')}
                  value={titleTag}
                  options={[
                    { label: 'H2', value: 'h2' },
                    { label: 'H3', value: 'h3' },
                    { label: 'H4', value: 'h4' },
                    { label: 'H5', value: 'h5' },
                    { label: 'p', value: 'p' },
                  ]}
                  onChange={(titleTag) => {
                    setAttributes({ titleTag: titleTag })
                  }}
                />
                <PanelRow>
                  <TextControl
                    label={_x('CSS class', 'Assign an optional CSS class for the job block', 'structured-content')}
                    className="w-100"
                    value={css_class}
                    placeholder={_x('Additional CSS classes.', 'Add the CSS class name of the job block.', 'structured-content')}
                    onChange={(css_class) => setAttributes(
                      { css_class: css_class })}
                  />
                </PanelRow>
              </PanelBody>
            </InspectorControls>
          </Fragment>
        )}
        <section
          className={
            className,
            align && `align${align}`,
            css_class ? css_class : `sc_card`
          }
          style={{
            textAlign: textAlign,
          }}>
          <div className="sc_toggle-bar">
            <div onClick={() => setAttributes({ html: !html })}>
              <VisibleLabel visible={html}/>
            </div>
            <InfoLabel
              url="https://developers.google.com/search/docs/data-types/job-posting"/>
          </div>
          <div>
            {wp.element.createElement(titleTag, {},
              <PlainText
                placeholder={_x('Enter your job title here...', 'Title of the job,', 'structured-content')}
                value={title}
                className="wp-block-structured-content-job__title"
                tag={titleTag}
                onChange={(value) => setAttributes({ title: value })}
                keepplaceholderonfocus="true"
              />,
            )}
            <div>
              <div className="answer" itemProp="text">
                <RichText
                  placeholder={_x('Enter your job description here...', 'Details/description about the job offer.', 'structured-content')}
                  value={description}
                  className="wp-block-structured-content-job__text"
                  onChange={(value) => setAttributes({ description: value })}
                  keepplaceholderonfocus="true"
                />
              </div>
            </div>
            <div className="sc_row" style={{ marginTop: 15 }}>
              <div className="sc_grey-box">
                <div className="sc_box-label">
                  {_x('Company', 'Details about the company/ job provider.', 'structured-content')}
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr',
                  gridColumnGap: 15,
                }}>
                  <div className="sc_company-infos">
                    <div className="sc_input-group">
                      <div className="sc_input-label">
                        {_x('Name', 'Name of the company/ job provider', 'structured-content')}
                      </div>
                      <TextControl
                        type="text"
                        value={company_name}
                        placeholder={_x('Company Name', 'Name of the company that provides the job.', 'structured-content')}
                        className="wp-block-structured-content-job__company_name"
                        onChange={(company_name) => setAttributes({ company_name: company_name })}
                      />
                    </div>
                    <div className="sc_input-group">
                      <div className="sc_input-label">
                        {_x('Same as (Website / Social Media)', 'Enter a additional profile URL of the job provider.', 'structured-content')}
                      </div>
                      <TextControl
                        type="url"
                        value={same_as}
                        placeholder={_x('https://your-website.com', 'Online URL of the job.', 'structured-content')}
                        className="wp-block-structured-content-job__same_as"
                        onChange={(same_as) => setAttributes({ same_as: same_as })}
                      />
                    </div>
                  </div>
                  <div className="sc_company-logo">
                    <div className="sc_input-group">
                      <div className="sc_input-label">
                        {_x('Logo', 'Add a company logo for your job offer.', 'structured-content')}
                      </div>
                      <div>
                        {!thumbnailImageUrl ?
                          <MediaUpload
                            onSelect={onImageSelect}
                            type="image"
                            value={logo_id}
                            render={({ open }) => (
                              <SC_Button action={open}
                                         className="no-margin-top">
                                {_x('Add Image', 'Add a image/logo for the job offer.', 'structured-content')}
                              </SC_Button>
                            )}
                          />
                          :
                          <div>
                            <div className="image-wrapper">
                              <img itemProp="image" src={thumbnailImageUrl}/>
                            </div>
                            <SC_Button action={onRemoveImage}
                                       className="no-margin-top">
                              {_x('Remove Image', 'Remove the image/logo for the job offer.', 'structured-content')}
                            </SC_Button>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sc_grey-box">
                <div className="sc_box-label">
                  {_x('Job Location', 'Address of the job offer', 'structured-content')}
                </div>
                <div className="sc_input-group">
                  <div className="sc_input-label">
                    {_x('Street', 'Insert the street name of the job location.', 'structured-content')}
                  </div>
                  <TextControl
                    placeholder={_x('Any Street 3A', 'The concrete street name of the job location.', 'structured-content')}
                    type="text"
                    value={street_address}
                    className="wp-block-structured-content-job__street_address"
                    onChange={(street_address) => setAttributes({ street_address: street_address })}
                  />
                </div>
                <div className="sc_row">
                  <div className="sc_input-group">
                    <div className="sc_input-label">
                      {_x('Postal Code', 'Insert postal code of the job location.', 'structured-content')}
                    </div>
                    <TextControl
                      placeholder={_x('Any Postal Code', 'The concrete postal code of the job location.', 'structured-content')}
                      type="text"
                      value={postal_code}
                      className="wp-block-structured-content-job__postal_code"
                      onChange={(postal_code) => setAttributes({ postal_code: postal_code })}
                    />
                  </div>
                  <div className="sc_input-group">
                    <div className="sc_input-label">
                      {_x('Locality', 'Enter the place name of the job location.', 'structured-content')}
                    </div>
                    <TextControl
                      placeholder={_x('Any city', 'The concrete city name of the job location.', 'structured-content')}
                      type="text"
                      value={address_locality}
                      className="wp-block-structured-content-job__address_locality"
                      onChange={(address_locality) => setAttributes({ address_locality: address_locality })}
                    />
                  </div>
                </div>
                <div className="sc_row">
                  <div className="sc_input-group">
                    <div className="sc_input-label">
                      {_x('Country ISO Code', 'Enter the iso code of the country of the job location.', 'structured-content')}
                    </div>
                    <TextControl
                      placeholder={__('US', 'structured-content')}
                      type="text"
                      value={address_country}
                      className="wp-block-structured-content-job__address_country"
                      onChange={(address_country) => setAttributes({ address_country: address_country })}
                    />
                  </div>
                  <div className="sc_input-group">
                    <div className="sc_input-label">
                      {_x('Region ISO Code', 'Enter the iso code of the region of the job location.', 'structured-content')}
                    </div>
                    <TextControl
                      placeholder={__('US-CA', 'structured-content')}
                      type="text"
                      value={address_region}
                      className="wp-block-structured-content-job__address_region"
                      onChange={(address_region) => setAttributes({ address_region: address_region })}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="sc_row" style={{ marginTop: 15 }}>
              <div className="sc_grey-box">
                <div className="sc_box-label">
                  {_x('Salary', 'Details on the salary of the job offer.', 'structured-content')}
                </div>
                <div className="sc_input-group">
                  <div className="sc_input-label">
                    {_x('Unit', 'In which time unit is the salary paid in the job?', 'structured-content')}
                  </div>
                  <SelectControl
                    value={base_salary}
                    className="w-100"
                    options={baseSalaryOptions}
                    onChange={(base_salary) => {
                      setAttributes({ base_salary: base_salary })
                    }}
                  />
                </div>
                <div className="sc_row">
                  <div className="sc_input-group">
                    <div className="sc_input-label">
                      {_x('Currency ISO Code', 'Select the currency ISO code in which the salary of the job is paid.', 'structured-content')}
                    </div>
                    <TextControl
                      placeholder={__('USD', 'structured-content')}
                      value={currency_code}
                      type="text"
                      className="wp-block-structured-content-job__currency"
                      onChange={(currency_code) => setAttributes({ currency_code: currency_code })}
                    />
                  </div>
                  <div className="sc_input-group">
                    <div className="sc_input-label">
                      {_x('Value', 'How much salary is paid?', 'structured-content')}
                    </div>
                    <TextControl
                      placeholder="40"
                      type="number"
                      value={quantitative_value}
                      className="wp-block-structured-content-job__quantitative_value"
                      onChange={(quantitative_value) => setAttributes({ quantitative_value: quantitative_value })}
                    />
                  </div>
                </div>
              </div>
              <div className="sc_grey-box">
                <div className="sc_box-label">
                  {_x('Job Meta', 'Details about the job offer.', 'structured-content')}
                </div>
                <div className="sc_input-group">
                  <div className="sc_input-label">
                    {_x('Employment Type', 'In what form do you want to employ the employee?', 'structured-content')}
                  </div>
                  <SelectControl
                    value={employment_type}
                    className="w-100"
                    options={employmentOptions}
                    onChange={(employment_type) => setAttributes({ employment_type: employment_type })}
                  />
                </div>
                <div className="sc_input-group">
                  <div className="sc_input-label">
                    {_x('Valid Through', 'Until when is the job offer valid?', 'structured-content')}
                  </div>
                  <DateDropdown
                    value={valid_through}
                    placeholder={_x('Select Valid Through', 'Until when is the job offer valid?', 'structured-content')}
                    onChange={(valid_through) => setAttributes({ valid_through: valid_through })}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>,
    ]
  },

  /**
   /* The save function defines the way in which the different attributes should be combined
   /* into the final markup, which is then serialized by Gutenberg into post_content.
   /*
   /* The "save" property must be specified and must be a valid function.
   /*
   /* @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   */
  save: function (props) {
    const { attributes } = props
    attributes.description = escapeQuotes(attributes.description)

    return null
  },
})
