/**
 * Internal dependencies
 */
import {iconColor, icons} from '../../../util/icons.jsx';
import SC_Button from '../../../components/sc-buttons/index.jsx';
import VisibleLabel from '../../../components/visible-label/index.jsx';
import OpenLabel from '../../../components/open-label/index.jsx';

/**
 * WordPress dependencies
 */
const {__, _x} = wp.i18n; // Import __() from wp.i18n
const {Fragment} = wp.element;
const {PlainText, MediaUpload, InnerBlocks} = wp.blockEditor;
const {registerBlockType} = wp.blocks;
const {dispatch} = wp.data;

/**
 * Block constants
 */
const name = 'faq-item';
const title = _x('FAQ Item', 'FAQ item title', 'structured-content');
const icon = {src: icons['faq'], foreground: iconColor};

const keywords = [
  _x('faq question', 'faq question', 'structured-content'),
  _x('faq answer', 'faq answer', 'structured-content'),
  _x('structured-content', 'structured content element faq',
      'structured-content'),
];

const blockAttributes = {
  css_class: {
    type: 'string',
    default: '',
  },
  question: {
    type: 'string',
  },
  imageID: {
    type: 'string',
  },
  imageAlt: {
    type: 'string',
  },
  thumbnailImageUrl: {
    type: 'string',
  },
  visible: {
    type: 'boolean',
    default: true,
  },
  open: {
    type: 'boolean',
    default: false,
  },
};

registerBlockType(`structured-content/${name}`, {
  title: title,
  icon: icon,
  category: 'structured-content',
  keywords: keywords,

  attributes: blockAttributes,
  parent: ['structured-content/faq'],

  supports: {
    reusable: false,
    html: false,
    inserter: false,
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
           attributes,
           className,
           align,
           isSelected,
           setAttributes,
           clientId,
         }) => {

    const {
      css_class,
      question,
      imageID,
      imageAlt,
      thumbnailImageUrl,
      visible,
      open,
      title_tag = '',
      summary = false,
    } = attributes;

    function onImageSelect(imageObject) {
      setAttributes({
        imageID: imageObject.id,
        imageAlt: imageObject.alt,
        thumbnailImageUrl: imageObject.sizes.thumbnail.url,
      });
    }

    function onRemoveImage() {
      setAttributes({
        imageID: '',
        imageAlt: '',
        thumbnailImageUrl: '',
      });
    }

    const ALLOWED_BLOCKS = ['core/heading', 'core/paragraph', 'core/list'];

    const TEMPLATE = [
      [
        'core/paragraph',
        {
          placeholder: _x('Enter your answer here', 'Answer the question.',
              'structured-content'),
        },
      ],
    ];

    if (typeof title_tag === 'undefined')
      setAttributes({title_tag: 'h2'});

    if (typeof summary === 'undefined')
      setAttributes({summary: false});

    return [
      <Fragment>
        <section
            className={
              className,
              align && `align${align}`,
              css_class ? css_class : `sc_card`
            }
            style={{margin: '15px auto 0'}}
        >
          <div className="sc_toggle-bar">
            <div
                onClick={() => setAttributes({visible: !visible})}
                style={{float: 'left'}}
            >
              <VisibleLabel visible={visible}/>
            </div>
            {summary && (
                <div
                    onClick={() => setAttributes({open: !open})}
                    style={{float: 'left', marginLeft: 16, marginRight: 'auto'}}
                >
                  <OpenLabel open={open}/>
                </div>
            )}
            <div onClick={() => dispatch('core/block-editor').
                removeBlocks(clientId)}>
              {icons.remove}
            </div>
          </div>
          <div>
            {wp.element.createElement(title_tag, {className: 'question'},
                <PlainText
                    placeholder={_x('Enter Your Question here',
                        'Research a meaningful question', 'structured-content')}
                    value={question}
                    className="wp-block-structured-content-faq__title question"
                    tag={title_tag}
                    onChange={(question) => setAttributes(
                        {'question': question})}
                    keepplaceholderonfocus="true"
                />,
            )}
            <div>
              {!thumbnailImageUrl ?
                  <MediaUpload
                      onSelect={(media) => onImageSelect(media)}
                      type="image"
                      value={imageID}
                      render={({open}) => (
                          <SC_Button action={open} className="inline">
                            {_x('Add Image',
                                'Illustrate your FAQ with a meaningful image.',
                                'structured-content')}
                          </SC_Button>
                      )}
                  />
                  :
                  <figure className="sc_fs_faq__figure" style={{
                    position: 'relative',
                    marginRight: 0,
                    marginTop: 0,
                  }}>
                    <a href="#" title={imageAlt}>
                      <img
                          itemProp="image"
                          src={thumbnailImageUrl}
                          alt={imageAlt}
                      />
                    </a>
                    <SC_Button action={onRemoveImage}
                               className="delete no-margin-top">
                      {icons.close}
                    </SC_Button>
                  </figure>
              }
              <div className="answer" itemProp="text">
                <InnerBlocks
                    allowedBlocks={ALLOWED_BLOCKS}
                    template={TEMPLATE}
                    templateInsertUpdatesSelection={false}
                />
              </div>
            </div>
          </div>
        </section>
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
  save: () => {
    return (
        <InnerBlocks.Content/>
    );
  },
});
