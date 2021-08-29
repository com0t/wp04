import {$, dateSupported} from '../util';

export default function(editor) {
  let postfixDateLabel = dateSupported() ? '' : '(Format: 2019-08-22)',
      minWidth = dateSupported() ? 500 : 800;
  return {
    text: editor.getLang('wpsc.personButtonText', 'Person'),
    tooltip: editor.getLang('wpsc.personTooltip',
        'Adds a Person block to the page.'),
    onclick: () => {
      editor.windowManager.open({
        title:
            editor.getLang('wpsc.personPopupTitle', 'Featured Snippet Person'),
        minWidth: minWidth,
        height: 500,
        autoScroll: true,
        classes: 'sc-panel',
        body: [
          {
            type: 'checkbox',
            name: 'giveHTML',
            label: editor.getLang('wpsc.renderHTML', 'Render HTML'),
            checked: true,
          },
          {
            type: 'container',
            name: 'container',
            label: '',
            html: `<h1 style="font-weight: bold;">${editor.getLang(
                'wpsc.personal', 'Personal')}</h1>`,
          },
          {
            type: 'textbox',
            name: 'personName',
            label: editor.getLang('wpsc.name', 'Name'),
            value: '',
            placeholder: editor.getLang('wpsc.namePlaceholder',
                'Please enter your Name here ...'),
          },
          {
            type: 'textbox',
            name: 'personName',
            label: editor.getLang('wpsc.alt_name', 'Alternate Name'),
            value: '',
            placeholder: editor.getLang('wpsc.altNamePlaceholder',
                'Alternate Name here ...'),
          },
          {
            type: 'textbox',
            name: 'jobTitle',
            label: editor.getLang('wpsc.jobTitle', 'Job Title'),
            value: '',
            placeholder: editor.getLang('wpsc.jobTitlePlaceholder',
                'Please enter your job title here ...'),
          },
          {
            type: 'textbox',
            name: 'sc_img',
            label: editor.getLang('wpsc.image', 'Image'),
            value: '',
            classes: 'image',
          },
          {
            type: 'button',
            name: 'select_image',
            label: ' ',
            text: editor.getLang('wpsc.addImage', 'Add Image'),
            classes: 'select_image',
          },
          {
            type: 'textbox',
            name: 'birthdate',
            label: `${editor.getLang('wpsc.birthdate',
                'Birthdate')} ${postfixDateLabel}`,
            classes: 'sc_birthdate',
          },
          {
            type: 'container',
            name: 'container',
            label: '',
            html: `<h1 style="font-weight: bold;">${editor.getLang(
                'wpsc.contact', 'Contact')}</h1>`,
          },
          {
            type: 'textbox',
            name: 'email',
            label: editor.getLang('wpsc.email', 'E-Mail'),
            value: '',
            placeholder: editor.getLang('wpsc.contactEmail',
                'jane-doe@xyz.edu'),
            multiline: false,
          },
          {
            type: 'textbox',
            name: 'homepage',
            label: editor.getLang('wpsc.contactHomepage', 'URL'),
            value: '',
            placeholder: editor.getLang('wpsc.contactHomepagePlaceholder',
                'http://www.janedoe.com'),
            multiline: false,
          },
          {
            type: 'textbox',
            name: 'telephone',
            label: editor.getLang('wpsc.contactPhone', 'Telephone'),
            value: '',
            placeholder: editor.getLang('wpsc.contactPhonePlaceholder',
                '(425) 123-4567'),
            multiline: false,
          },
          {
            type: 'container',
            name: 'container',
            label: '',
            html: `<h1 style="font-weight: bold;">${editor.getLang(
                'wpsc.address', 'Address')}</h1>`,
          },
          {
            type: 'textbox',
            name: 'streetAddress',
            label: editor.getLang('wpsc.street', 'Street'),
            value: '',
            placeholder: editor.getLang('wpsc.streetPlaceholder',
                'Any Street 3A'),
          },
          {
            type: 'textbox',
            name: 'postalCode',
            label: editor.getLang('wpsc.zip', 'Postal Code'),
            value: '',
            placeholder: editor.getLang('wpsc.zipPlaceholder',
                'Any Postal Code'),
          },
          {
            type: 'textbox',
            name: 'addressLocality',
            label: editor.getLang('wpsc.locality', 'Locality'),
            value: '',
            placeholder: editor.getLang('wpsc.localityPlaceholder', 'Any City'),
          },
          {
            type: 'textbox',
            name: 'addressCountry',
            label: editor.getLang('wpsc.countryCode', 'Country ISO Code'),
            value: '',
            placeholder: editor.getLang('wpsc.countryCodePlaceholder', 'US'),
          },
          {
            type: 'textbox',
            name: 'addressRegion',
            label: editor.getLang('wpsc.regionCode', 'Region ISO Code'),
            value: '',
            placeholder: editor.getLang('wpsc.regionCodePlaceholder', 'US-CA'),
          },
          {
            type: 'container',
            name: 'container',
            label: '',
            html: `<h1 style="font-weight: bold;">${editor.getLang(
                'wpsc.colleagues', 'Colleagues')}</h1>`,
          },
          {
            type: 'textbox',
            name: 'colleague',
            label: editor.getLang('wpsc.colleagueLabel', 'Colleague'),
            value: '',
            placeholder: editor.getLang('wpsc.colleaguePlaceholder',
                'Comma seperated URLs'),
          },
          {
            type: 'container',
            name: 'container',
            label: '',
            html: `<h1 style="font-weight: bold;">${editor.getLang('wpsc.work',
                'Work')}</h1>`,
          },
          {
            type: 'textbox',
            name: 'works_for_name',
            label: editor.getLang('wpsc.works_for_name', 'Organisation Name'),
            value: '',
            placeholder: editor.getLang('wpsc.works_for_namePlaceholder',
                'Your Works Name'),
          },
          {
            type: 'textbox',
            name: 'works_for_alt',
            label: editor.getLang('wpsc.works_for_alt', 'Alternate Name'),
            value: '',
            placeholder: editor.getLang('wpsc.works_for_altPlaceholder',
                'Your Works Alternate Name'),
          },
          {
            type: 'textbox',
            name: 'works_for_url',
            label: editor.getLang('wpsc.works_for_url', 'Url'),
            value: '',
            placeholder: editor.getLang('wpsc.works_for_urlPlaceholder',
                'Organisation Website'),
          },
          {
            type: 'textbox',
            name: 'works_for_logo',
            label: editor.getLang('wpsc.works_for_logo', 'Logo'),
            value: '',
            placeholder: editor.getLang('wpsc.works_for_logoPlaceholder',
                'Organisation Logo'),
          },
          {
            type: 'container',
            name: 'container',
            label: '',
            html: `<h1 style="font-weight: bold;">${editor.getLang(
                'wpsc.sameAsHeadline', 'Same as')}</h1>`,
          },
          {
            type: 'textbox',
            name: 'same_as',
            label: editor.getLang('wpsc.sameAsLabel', 'Website / Social Media'),
            value: '',
            placeholder: editor.getLang('wpsc.sameAsPlaceholder',
                'https://xyz.com/me.html'),
          },
          {
            type: 'textbox',
            name: 'sc_cssClass',
            label: editor.getLang('wpsc.cssClass', 'CSS class'),
            value: '',
            default: '',
          },
        ],

        onsubmit: ({data}) => {
          editor.insertContent(
              `[sc_fs_person 
                html="${data.giveHTML}"
                person_name="${data.personName}" 
                job_title="${data.jobTitle}" 
                image_id="${data.sc_img}"
                birthdate="${data.birthdate}"
                street_address="${data.streetAddress}"
                address_locality="${data.addressLocality}"
                address_region="${data.addressRegion}"
                postal_code="${data.postalCode}"
                address_country="${data.addressCountry}"
                email="${data.email}"
                url="${data.homepage}"
                telephone="${data.telephone}"
                css_class="${data.sc_cssClass}"
                colleague="${data.colleague}"
                works_for_name="${data.works_for_name}"
                works_for_alt="${data.works_for_alt}"
                works_for_url="${data.works_for_url}"
                works_for_logo="${data.works_for_logo}"
                same_as="${data.same_as}"
              ]`,
          );
        },
      });
      if (dateSupported()) {
        $('.mce-sc_birthdate').type = 'date';
      }
    },
  };
};
