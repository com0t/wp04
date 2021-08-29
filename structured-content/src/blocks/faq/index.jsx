/**
 * Internal dependencies
 */
import {iconColor, icons} from '../../util/icons.jsx';
import SC_Button from '../../components/sc-buttons/index.jsx';
import InfoLabel from '../../components/info-label/index.jsx';

/**
 * WordPress dependencies
 */

const {__, _x} = wp.i18n;
const {Fragment} = wp.element;
const {dispatch, select} = wp.data;
const {
  AlignmentToolbar,
  InspectorControls,
  BlockControls,
  InnerBlocks,
} = wp.blockEditor;
const {
  PanelRow,
  PanelBody,
  SelectControl,
  TextControl,
  ToggleControl,
} = wp.components;
const {registerBlockType, createBlock} = wp.blocks;

/**
 * Block constants
 */
const name = 'faq';
const title = __('FAQ', 'structured-content');
const icon = {src: icons[name], foreground: iconColor};

const keywords = [
  _x('faq question', 'faq question', 'structured-content'),
  _x('faq answer', 'faq answer', 'structured-content'),
  _x('structured-content', 'structured content element faq',
      'structured-content'),
];

const blockAttributes = {
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
  summary: {
    type: 'boolean',
    default: false,
  },
  version: {
    type: Number,
  },
};

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered otherwise `undefined`.
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
   * The edit function describes the structure of your block in the context of the editor.
   * This represents what the editor will render when the block is used.
   *
   * The "edit" property must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   */
  edit: ({
           insertBlock,
           clientId,
           attributes,
           className,
           align,
           isSelected,
           setAttributes,
         }) => {

    const {
      textAlign,
      summary,
      version,
      title_tag,
      css_class,
    } = attributes;

    const ALLOWED_BLOCKS = ['structured-content/faq-item'];
    const TEMPLATE = [['structured-content/faq-item']];

    select('core/block-editor').
        getBlocksByClientId(clientId)[0].innerBlocks.forEach(function(block) {
      dispatch('core/block-editor').updateBlockAttributes(block.clientId, {
        title_tag: title_tag,
        summary: summary,
      });
    });

    setAttributes({version: 2});

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
                      label={_x('Title tag', 'Select a tag of the FAQ title.',
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
                            'Assign an optional CSS class for the FAQ block',
                            'structured-content')}
                        className="w-100"
                        value={css_class}
                        placeholder={_x('Additional CSS classes',
                            'Add the CSS class name of the job block.',
                            'structured-content')}
                        onChange={(css_class) => setAttributes(
                            {css_class: css_class})}
                    />
                  </PanelRow>
                  <PanelRow>
                    <ToggleControl
                        label={_x('Display as summary element',
                            'Display summary of the FAQ element.',
                            'structured-content')}
                        checked={summary}
                        onChange={() => setAttributes({summary: !summary})}
                    />
                  </PanelRow>
                </PanelBody>
              </InspectorControls>
            </Fragment>
        )}
        <div className="sc_multi-wrapper">
          <div className="sc_toggle-bar single">
            <InfoLabel
                url="https://developers.google.com/search/docs/data-types/faqpage"/>
          </div>
          <div>
            <InnerBlocks
                template={TEMPLATE}
                allowedBlocks={ALLOWED_BLOCKS}
            />
          </div>
          <SC_Button
              icon={true}
              action={() => dispatch('core/block-editor').
                  insertBlock(createBlock('structured-content/faq-item', {}),
                      undefined, clientId)}
          >
            {_x('Add One', 'Add another FAQ element.', 'structured-content')}
          </SC_Button>
        </div>
      </Fragment>,
    ];
  },

  /**
   * The save function defines the way in which the different attributes should be combined
   * into the final markup, which is then serialized by Gutenberg into post_content.
   *
   * The "save" property must be specified and must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   */
  save: (props) => {
    return (
        <InnerBlocks.Content/>
    );
  },

  /** Migrate old FAQ to New Version **/
  deprecated: [
    {
      attributes: {
        elements: {
          type: 'array',
          default: [],
        },
        question_tag: {
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
      },

      isEligible(attributes, innerBlocks) {
        return typeof attributes.elements !== 'undefined' &&
            innerBlocks.length === 0;
      },

      migrate(attributes) {

        let x = [];

        attributes.elements.forEach(element => {
          x.push(createBlock('structured-content/faq-item', {
            question: element.question,
            imageAlt: element.imageAlt,
            thumbnailImageUrl: element.thumbnailImageUrl,
            visible: element.visible,
          }, [
            createBlock('core/paragraph', {
              content: element.answer,
              fontSize: 'large',
            }),
          ]));
        });

        return [
          {
            ...attributes,
            title_tag: attributes.question_tag,
            version: 2,
          },
          x,
        ];
      },
      save: () => null,
    },
  ],
});
