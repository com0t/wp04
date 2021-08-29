//  Import CSS.
import '../style/editor.scss';
import '../style/style.scss';

/**
 * WordPress dependencies
 */
const {getCategories, setCategories} = wp.blocks;

const categoryIcon =
    <svg
        className="components-structuredcontent-logo-icon components-structuredcontent-logo-icon--red components-panel__icon"
        width="67" height="10" fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{margin: '3.5px 10px'}}>
      <g clipPath="url(#clip0)" fill="#F03009">
        <path
            d="M15.3 9.7h3.8l2.6-5.3.4-.9.1 1 .9 5.2h3.6L31.4.3h-3.3l-2.4 5.3-.4 1-.1-1-.9-5.3h-3.5l-2.7 5.3-.4 1v-1L17 .3h-3.3l1.5 9.4zM38.5.3h-5.9L31 9.7h3.3l.5-2.8h3.8c3 0 4-1.9 4-3.5 0-2.6-2.4-3-4-3zm-1 4.5h-2.3l.4-2.3h2.2c.7 0 1.3.2 1.3 1 0 .6-.2 1.3-1.6 1.3zM47.8 10c4.6 0 5.6-2 5.6-3.5 0-2-1.7-2.5-3.5-2.7l-2.2-.3c-.8 0-1-.2-1-.6 0-.5.4-.6 1.5-.6 1.4 0 2.8.1 3.7 1.1L54 1.6C52.7.2 50.4 0 48.6 0c-4.3 0-5.2 1.8-5.2 3.3C43.4 5 45 5.9 46.7 6l2.3.3c.7 0 1 .2 1 .5 0 .5-.6.8-1.9.8-1.3 0-2.9-.4-4-1.5L41.8 8C43 9.5 45.1 10 47.8 10zM60 10c3 0 5-1.2 6.1-3.4L63 5.8c-.4 1-1.2 1.7-2.7 1.7-1.2 0-2.4-.5-2.4-2.2 0-1.3.6-2.8 2.9-2.8 1 0 2 .4 2.4 1.7l3.6-.7C66 1.1 63.7 0 60.8 0c-4.6 0-6.6 2.7-6.6 5.4 0 3.2 2.7 4.6 5.9 4.6zM10.7 4.2V2.4H9.2l.3-2H7.2l-.4 2h-2l.4-2H2.9l-.4 2h-2v1.8h1.7l-.3 1.5H0v1.9h1.6l-.4 2h2.3l.4-2h2l-.4 2h2.3l.4-2h2.1V5.7H8.5l.3-1.5h2zM6.2 5.7h-2l.3-1.5h2l-.3 1.5z"/>
      </g>
      <defs>
        <clipPath id="clip0">
          <path fill="#fff" d="M0 0h66.7v10H0z"/>
        </clipPath>
      </defs>
    </svg>;

setCategories([
  // Add a StructuredContent block category
  {
    slug: 'structured-content',
    title: 'Structured Content',
    icon: categoryIcon,
  },
  ...getCategories().filter(({slug}) => slug !== 'structured-content'),
]);