import {$, datetimeLocalSupported} from '../util';

export default function(editor) {
  let postfixDateLabel = datetimeLocalSupported() ?
      '' :
      '(Format: 2019-08-22, 12:45)',
      minWidth = datetimeLocalSupported() ? 500 : 800;
  return {
    text: editor.getLang('wpsc.eventButtonText', 'Event'),
    tooltip: editor.getLang('wpsc.eventTooltip',
        'Adds a Event block to the page.'),
    onclick: () => {
      editor.windowManager.open({
        title: editor.getLang('wpsc.eventPopupTitle', 'Featured Snippet Event'),
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
            type: 'listbox',
            name: 'titleTag',
            label: editor.getLang('wpsc.titleTag', 'Title Tag'),
            values: [
              {text: 'h2', value: 'h2'},
              {text: 'h3', value: 'h3'},
              {text: 'h4', value: 'h4'},
              {text: 'h5', value: 'h5'},
              {text: 'h6', value: 'h6'},
              {text: 'p', value: 'p'},
            ],
            value: 'h2', // Sets the default
          },
          {
            type: 'textbox',
            name: 'title',
            label: editor.getLang('wpsc.event', 'Event Title'),
            value: '',
            placeholder: editor.getLang('wpsc.eventPlaceholder',
                'Enter Your Event Title...'),
          },
          {
            type: 'textbox',
            name: 'description',
            label: editor.getLang('wpsc.description', 'Description'),
            value: '',
            placeholder: editor.getLang('wpsc.eventDescriptionPlaceholder',
                'Enter your event description here...'),
            multiline: true,
            minHeight: 100,
          },
          {
            type: 'textbox',
            name: 'image_id',
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
            type: 'container',
            name: 'container',
            label: '',
            html: `<h1 style="font-weight: bold;">${editor.getLang(
                'wpsc.eventMeta', 'Event Meta')}</h1>`,
          },
          {
            type: 'textbox',
            name: 'eventLocation',
            label: editor.getLang('wpsc.name', 'Name'),
            value: '',
            placeholder: editor.getLang('wpsc.eventLocationNamePlaceholder',
                'Event Location Name'),
          },
          {
            type: 'listbox',
            name: 'status',
            label: editor.getLang('wpsc.event_status', 'Event Status'),
            values: [
              {
                text: editor.getLang('wpsc.eventScheduled', 'Scheduled'),
                value: 'EventScheduled',
              },
              {
                text: editor.getLang('wpsc.eventCancelled', 'Cancelled'),
                value: 'EventCancelled',
              },
              {
                text: editor.getLang('wpsc.eventMovedOnline', 'Moved Online'),
                value: 'EventMovedOnline',
              },
              {
                text: editor.getLang('wpsc.eventPostponed', 'Postponed'),
                value: 'EventPostponed',
              },
              {
                text: editor.getLang('wpsc.eventRescheduled', 'Rescheduled'),
                value: 'EventRescheduled',
              },
            ],
          },
          {
            type: 'textbox',
            name: 'prev_start_date',
            label: `${editor.getLang('wpsc.prev_start_date',
                'Previous Start Date')} ${postfixDateLabel}`,
            placeholder: editor.getLang('wpsc.prev_start_datePlaceholder',
                'optional'),
            classes: 'sc_prev_start_date',
          },
          {
            type: 'textbox',
            name: 'startDate',
            label: `${editor.getLang('wpsc.startDate',
                'Start Date')} ${postfixDateLabel}`,
            classes: 'sc_start_date',
          },
          {
            type: 'textbox',
            name: 'endDate',
            label: `${editor.getLang('wpsc.endDate',
                'End Date')} ${postfixDateLabel}`,
            classes: 'sc_end_date',
          },
          {
            type: 'container',
            name: 'container',
            label: '',
            html: `<h1 style="font-weight: bold;">${editor.getLang(
                'wpsc.eventLocation', 'Event Location')}</h1>`,
          },

          {
            type: 'listbox',
            name: 'event_attendance_mode',
            label: editor.getLang('wpsc.event_attendance_mode',
                'Attendance Mode'),
            values: [
              {
                text: editor.getLang('wpsc.offlineEventAttendanceMode',
                    'Offline'), value: 'OfflineEventAttendanceMode',
              },
              {
                text: editor.getLang('wpsc.onlineEventAttendanceMode',
                    'Online'),
                value: 'OnlineEventAttendanceMode',
              },
              {
                text: editor.getLang('wpsc.mixedEventAttendanceMode', 'Mixed'),
                value: 'MixedEventAttendanceMode',
              },
            ],
          },
          {
            type: 'textbox',
            name: 'online_url',
            label: editor.getLang('wpsc.online_url', 'URL'),
            value: '',
            placeholder: editor.getLang('wpsc.online_urlPlaceholder',
                'Online URL of Event'),
            multiline: false,
            classes: 'sc_online_url',
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
                'wpsc.performer', 'Performer')}</h1>`,
          },
          {
            type: 'listbox',
            name: 'performer',
            label: editor.getLang('wpsc.type', 'Type'),
            values: [
              {
                text: editor.getLang('wpsc.performingGroup',
                    'Performing Group'),
                value: 'PerformingGroup',
              },
              {
                text: editor.getLang('wpsc.performingPerson', 'Person'),
                value: 'Person',
              },
            ],
          },
          {
            type: 'textbox',
            name: 'performerName',
            label: editor.getLang('wpsc.performerName', 'Performer'),
            value: '',
            placeholder: editor.getLang('wpsc.performerNamePlaceholder',
                'John Doe'),
          },
          {
            type: 'container',
            name: 'container',
            label: '',
            html: `<h1 style="font-weight: bold;">${editor.getLang('wpsc.offer',
                'Offer')}</h1>`,
          },
          {
            type: 'listbox',
            name: 'offerAvailability',
            label: editor.getLang('wpsc.availability', 'Availability'),
            values: [
              {
                text: editor.getLang('wpsc.inStock', 'In Stock'),
                value: 'InStock',
              },
              {
                text: editor.getLang('wpsc.soldOut', 'Sold Out'),
                value: 'SoldOut',
              },
              {
                text: editor.getLang('wpsc.preOrder', 'Pre Order'),
                value: 'PreOrder',
              },
            ],
          },
          {
            type: 'textbox',
            name: 'offerUrl',
            label: editor.getLang('wpsc.ticketWebsite', 'Ticket Website'),
            value: '',
            placeholder: editor.getLang('wpsc.ticketWebsitePlaceholder',
                'https://your-website.com'),
            multiline: false,
          },
          {
            type: 'textbox',
            name: 'currencyCode',
            label: editor.getLang('wpsc.currencyCode', 'Currency ISO Code'),
            value: '',
            placeholder: editor.getLang('wpsc.currencyCodePlaceholder', 'USD'),
          },
          {
            type: 'textbox',
            name: 'price',
            label: editor.getLang('wpsc.price', 'Price'),
            value: '',
            placeholder: '40.00',
          },
          {
            type: 'textbox',
            name: 'offerValidFrom',
            label: `${editor.getLang('wpsc.validFrom',
                'Valid From')} ${postfixDateLabel}`,
            classes: 'sc_valid_from',
          },
          {
            type: 'container',
            name: 'container',
            label: '',
            html: `<h1 style="font-weight: bold;">${editor.getLang(
                'wpsc.additional', 'Additional')}</h1>`,
          },
          {
            type: 'textbox',
            name: 'cssClass',
            label: editor.getLang('wpsc.cssClass', 'CSS class'),
            value: '',
          },
        ],
        onsubmit: ({data}) => {
          editor.insertContent(
              `[sc_fs_event 
                html="${data.giveHTML}" 
                title="${data.title}" 
                title_tag="${data.titleTag}"
                event_location="${data.eventLocation}"
                status="${data.status}"
                ${data.online_url ? `online_url="${data.online_url}"` : ''}
                ${data.prev_start_date ?
                  `prev_start_date="${data.prev_start_date}"` :
                  ''}
                event_attendance_mode="${data.event_attendance_mode}"
                start_date="${data.startDate}"
                end_date="${data.endDate}"
                street_address="${data.streetAddress}"
                address_locality="${data.addressLocality}"
                address_region="${data.addressRegion}"
                postal_code="${data.postalCode}"
                address_country="${data.addressCountry}"
                image_id="${data.image_id}"
                performer="${data.performer}"
                performer_name="${data.performerName}"
                offer_availability="${data.offerAvailability}"
                offer_url="${data.offerUrl}"
                currency_code="${data.currencyCode}"
                price="${data.price}"
                offer_valid_from="${data.offerValidFrom}"
                css_class="${data.cssClass}"
            ]
                ${data.description}
            [/sc_fs_event]`,
          );
        },
      });
      if (datetimeLocalSupported()) {
        $('.mce-sc_prev_start_date').type = 'datetime-local';
        $('.mce-sc_start_date').type = 'datetime-local';
        $('.mce-sc_end_date').type = 'datetime-local';
        $('.mce-sc_valid_from').type = 'datetime-local';
      }
    },
  };
};
