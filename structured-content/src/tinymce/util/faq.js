import {$, $$} from './query';
import {createElementFromHTML, insertAfter, setHeight} from './dom';
import {listen} from './listen';

export function faqShortcode(data) {
  let shortcode = `[sc_fs_multi_faq `,
      fieldsets = $$('#sc-start-point fieldset');

  for (let i = 0; i < fieldsets.length; i++) {
    const key = fieldsets[i].dataset.key,
        headlineTag = $(`#headlineTag-${key}`).value,
        question = $(`#question-${key}`).value,
        answer = $(`#answer-${key}`).value,
        imageID = $(`#imageID-${key}`).innerHTML;

    shortcode += `headline-${key}="${headlineTag}" question-${key}="${question}" answer-${key}="${answer}" image-${key}="${imageID}" `;
  }

  shortcode += ` count="${fieldsets.length}" html="${data.giveHTML}" css_class="${data.sc_css_classes}"]`;

  return shortcode;
}

export function bindRemoveLastFaq() {
  listen('click', '.sc-removeLastFaq',
      () => $('#sc-start-point fieldset:last-of-type').remove());
}

export function bindAddNewFaq(editor) {
  listen('click', '#addOne', () => {

    let id = $$('#fields fieldset').length,
        baseHeight = $(`#fields #fieldset-${id - 1}`).offsetHeight,
        height = id === 1 ? baseHeight + 30 : baseHeight - 30,
        layoutWrapper = $(
            '.mce-container > .mce-container-body.mce-abs-layout'),
        nextField = $(`#fields #fieldset-${id - 1}`);

    const template = `
                    <fieldset id="fieldset-${id}" data-key="${id}">
                        <hr class="sc-hr">
                        <div>
                            <label>${editor.getLang('wpsc.titleTag',
        'Title Tag')}</label>
                            <select name="headlineTag" id="headlineTag-${id}">
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
                            <input type="text" id="question-${id}" name="question" placeholder="${editor.getLang(
        'wpsc.questionPlaceholder', 'Enter Your Question here...')}">
                        </div>
                        <div>
                            <label>${editor.getLang('wpsc.answer', 'Answer')}</label>
                            <textarea id="answer-${id}" rows="5" name="answer" placeholder="${editor.getLang(
        'wpsc.answerPlaceholder', 'Enter your answer here...')}"></textarea>
                        </div>
                        <div>
                            <div type="text" id="imageID-${id}" name="imageID"></div>
                            <div class="mce-btn">
                                <button type="button"  class="mce-select_image" data-target="imageID-${id}">${editor.getLang(
        'wpsc.addImage', 'Add Image')}</button>
                            </div>
                        </div>
                        <div class="mce-btn removeLast">
                            <button type="button" class="sc-removeLastFaq" data-target="bild-${id}">- ${editor.getLang(
        'wpsc.removeLastOne', 'Add Image')}</button>
                        </div>
                    </fieldset>
                `;

    setHeight(layoutWrapper, layoutWrapper.offsetHeight + height);
    insertAfter(createElementFromHTML(template), nextField);
    bindRemoveLastFaq();

  });

}
