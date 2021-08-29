/**
 * Custom icons
 */

const iconColor = '#f03009';

const icons = {};

const iconClasses = 'dashicon components-structuredcontent-svg';

/**
 * Block Icons
 */

icons.faq =
    <svg className={iconClasses} width="20" height="20" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <path
          d="M10 20a10 10 0 110-20 10 10 0 010 20zm2-13c0 .3-.2.8-.4 1L10 9.6c-.6.6-1 1.6-1 2.4v1h2v-1c0-.3.2-.8.4-1L13 9.4c.6-.6 1-1.6 1-2.4a4 4 0 10-8 0h2a2 2 0 114 0zm-3 8v2h2v-2H9z"/>
    </svg>;

icons.job =
    <svg className={iconClasses} width="20" height="20" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <path
          d="M9 12H1v6a2 2 0 002 2h14a2 2 0 002-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 012-2h4a2 2 0 012 2v1h4a2 2 0 012 2v6h-9V9H9v2zm3-8V2H8v1h4z"/>
    </svg>;

icons.event =
    <svg className={iconClasses} width="20" height="20" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <path
          d="M1 4c0-1.1.9-2 2-2h14a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z"/>
    </svg>;

icons.person =
    <svg className={iconClasses} width="20" height="20" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <path
          d="M0 2C0 .9.9 0 2 0h16a2 2 0 012 2v16a2 2 0 01-2 2H2a2 2 0 01-2-2V2zm7 4v2a3 3 0 106 0V6a3 3 0 00-6 0zm11 9.1a16 16 0 00-16 0V18h16v-2.9z"/>
    </svg>;

icons.course =
    <svg className={iconClasses} width="20" height="20" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <path
          d="M3.3 8l6.7 4 10-6-10-6L0 6h10v2H3.3zM0 8v8l2-2.2V9.2L0 8zm10 12l-5-3-2-1.2v-6l7 4.2 7-4.2v6L10 20z"/>
    </svg>;

/**
 * UI Icons
 */

icons.remove =
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="12" fill="#F0DADA"/>
      <path
          d="M17.25 7.8075L16.1925 6.75L12 10.9425L7.8075 6.75L6.75 7.8075L10.9425 12L6.75 16.1925L7.8075 17.25L12 13.0575L16.1925 17.25L17.25 16.1925L13.0575 12L17.25 7.8075Z"
          fill="#6A1B1B"/>
    </svg>;

icons.info =
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path
          d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM9 11v4h2V9H9v2zm0-6v2h2V5H9z"/>
    </svg>;

icons.openEye =
    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="12" fill="#DAF0E8"/>
      <path
          d="M12 6.375c-3.75 0-6.952 2.332-8.25 5.625 1.298 3.293 4.5 5.625 8.25 5.625s6.953-2.332 8.25-5.625c-1.297-3.293-4.5-5.625-8.25-5.625zm0 9.375c-2.07 0-3.75-1.68-3.75-3.75 0-2.07 1.68-3.75 3.75-3.75 2.07 0 3.75 1.68 3.75 3.75 0 2.07-1.68 3.75-3.75 3.75zm0-6A2.247 2.247 0 0 0 9.75 12 2.247 2.247 0 0 0 12 14.25 2.247 2.247 0 0 0 14.25 12 2.247 2.247 0 0 0 12 9.75z"
          fill="#114332"/>
    </svg>;

icons.closedEye =
    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="12" fill="#F2F3F3"/>
      <path
          d="M12 8.25c2.07 0 3.75 1.68 3.75 3.75 0 .488-.098.945-.27 1.373l2.19 2.19A8.863 8.863 0 0 0 20.242 12c-1.297-3.293-4.5-5.625-8.25-5.625-1.05 0-2.055.188-2.985.525l1.62 1.62A3.64 3.64 0 0 1 12 8.25zM4.5 6.202l1.71 1.71.345.346A8.853 8.853 0 0 0 3.75 12c1.298 3.293 4.5 5.625 8.25 5.625a8.832 8.832 0 0 0 3.285-.63l.315.315 2.197 2.19.953-.953L5.453 5.25l-.953.952zm4.148 4.148l1.162 1.162c-.037.158-.06.323-.06.488A2.247 2.247 0 0 0 12 14.25c.165 0 .33-.023.488-.06l1.162 1.162a3.717 3.717 0 0 1-1.65.398c-2.07 0-3.75-1.68-3.75-3.75 0-.592.15-1.148.398-1.65zm3.232-.585l2.362 2.362.015-.12a2.247 2.247 0 0 0-2.25-2.25l-.127.008z"
          fill="#000"/>
    </svg>;

icons.openSummary =
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <path
          d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12Z"
          fill="#DAF0E8"/>
      <path fill-rule="evenodd" clip-rule="evenodd"
            d="M11.4144 14.8283L12.1215 15.5354L17.7783 9.87857L16.3641 8.46436L12.1215 12.707L7.87883 8.46436L6.46461 9.87857L11.4144 14.8283Z"
            fill="#114332"/>
    </svg>;

icons.closedSummary =
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <path
          d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12Z"
          fill="#F2F3F3"/>
      <path fill-rule="evenodd" clip-rule="evenodd"
            d="M14.9499 12.7072L15.657 12.0001L10.0002 6.34326L8.58594 7.75748L12.8286 12.0001L8.58594 16.2428L10.0002 17.657L14.9499 12.7072Z"
            fill="black"/>
    </svg>;

icons.close =
    <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24">
      <g data-name="Layer 2">
        <path
            d="M13.41 12l4.3-4.29a1 1 0 10-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 00-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 000 1.42 1 1 0 001.42 0l4.29-4.3 4.29 4.3a1 1 0 001.42 0 1 1 0 000-1.42z"
            data-name="close"/>
      </g>
    </svg>;

icons.plus =
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path
          d="M11 9V5H9v4H5v2h4v4h2v-4h4V9h-4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20z"/>
    </svg>;

icons.minus =
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm5-11H5v2h10V9z"/>
    </svg>;

export {icons, iconColor};
