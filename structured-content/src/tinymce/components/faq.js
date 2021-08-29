export default function(editor) {
  return {
    text: editor.getLang('wpsc.faqButtonText', 'Single FAQ'),
    tooltip: editor.getLang('wpsc.faqTooltip', 'Adds a FAQ block to the page.'),
    onclick: () => {
      editor.windowManager.open({
        title: editor.getLang('wpsc.faqTitle', 'Featured Snippet FAQ'),
        minWidth: 500,
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
            name: 'sc_headline',
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
            name: 'sc_question',
            label: editor.getLang('wpsc.question', 'Question'),
            value: '',
            placeholder: editor.getLang('wpsc.questionPlaceholder',
                'Enter Your Question here...'),
            multiline: true,
          },
          {
            type: 'textbox',
            name: 'sc_answer',
            label: editor.getLang('wpsc.answer', 'Answer'),
            value: '',
            placeholder: editor.getLang('wpsc.answerPlaceholder',
                'Enter your answer here...'),
            multiline: true,
            minHeight: 100,
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
            name: 'sc_img_description',
            label: editor.getLang('wpsc.imageDescription', 'Image Description'),
            value: '',
            multiline: true,
          },
          {
            type: 'textbox',
            name: 'sc_css_classes',
            label: editor.getLang('wpsc.cssClass', 'CSS class'),
            placeholder: editor.getLang('wpsc.cssClassPlaceholder',
                'additional css classes ...'),
            value: '',
          },
        ],
        onsubmit: ({data}) =>
            editor.insertContent(
                `[sc_fs_faq html="${data.giveHTML}" headline="${data.sc_headline}" img="${data.sc_img}" question="${data.sc_question}" img_alt="${data.sc_img_description}" css_class="${data.sc_css_classes}"]
                ${data.sc_answer}
               [/sc_fs_faq]`,
            ),
      });
    },
  };
};
