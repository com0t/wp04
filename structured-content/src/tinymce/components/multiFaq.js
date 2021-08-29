import {bindAddNewFaq, faqShortcode} from '../util';

export default function(editor) {
  return {
    text: editor.getLang('wpsc.multiFaqButtonText', 'Multi FAQ'),
    tooltip: editor.getLang('wpsc.multiFaqTooltip',
        'Adds multiple FAQ blocks to the page.'),
    onclick: () => {
      editor.windowManager.open({
        title: editor.getLang('wpsc.faqTitle', 'Featured Snippet FAQ'),
        minWidth: 500,
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
            type: 'textbox',
            name: 'sc_css_classes',
            label: editor.getLang('wpsc.cssClass', 'CSS class'),
            placeholder: editor.getLang('wpsc.cssClassPlaceholder',
                'additional css classes ...'),
            value: '',
          },
          {
            type: 'container',
            name: 'container',
            label: '',
            html: ` 
                    <form id="sc-start-point">
                    <div id="fields">
                        <fieldset id="fieldset-0" data-key="0">
                            <hr class="sc-hr">
                            <div>
                                <label>${editor.getLang('wpsc.titleTag',
                'Title Tag')}</label>
                                <select name="headlineTag" id="headlineTag-0">
                                    <option value="h2">h2</option>
                                    <option value="h3">h3</option>
                                    <option value="h4">h4</option>
                                    <option value="h5">h5</option>
                                    <option value="h6">h6</option>
                                    <option value="p">p</option>
                                </select>
                            </div>
                            <div>
                                <label>${editor.getLang('wpsc.question',
                'Question')}</label>
                                <input type="text" id="question-0" name="question" placeholder="${editor.getLang(
                'wpsc.questionPlaceholder', 'Enter Your Question here...')}">
                            </div>
                            <div>
                                <label>${editor.getLang('wpsc.answer',
                'Answer')}</label>
                                <textarea id="answer-0" rows="5" name="answer" placeholder="${editor.getLang(
                'wpsc.answerPlaceholder', 'Enter your answer here...')}"></textarea>
                            </div>
                            <div>
                                <div type="text" id="imageID-0" name="imageID"></div>
                                <div class="mce-btn">
                                    <button type="button" class="mce-select_image" data-target="imageID-0">${editor.getLang(
                'wpsc.addImage', 'Add Image')}</button>
                                </div>
                            </div> 
                        </fieldset>
                    </div>
                    <div class="mce-btn long">
                        <button id="addOne" type="button">${editor.getLang(
                'wpsc.addOne', 'Answer')}</button>
                    </div>
                </form>`,
          },
        ],
        onsubmit: ({data}) => editor.insertContent(faqShortcode(data)),
      });

      bindAddNewFaq(editor);
    },
  };
};
