/**
 * Import CSS
 */
import './tinymce.css';
/**
 * Import Components
 */
import faq from './components/faq';
import multiFaq from './components/multiFaq';
import job from './components/job';
import event from './components/event';
import person from './components/person';
import course from './components/course';

import {bindImageButtons} from './util';

/**
 * Init the TinyMCE Popups
 */
(() => {
  if (typeof tinymce !== 'undefined') {
    tinymce.PluginManager.add('structured_content_dropdown', editor => {
          bindImageButtons();
          return editor.addButton('structured_content_dropdown', {
            icon: 'structured-content',
            type: 'menubutton',
            menu: [
              faq(editor),
              multiFaq(editor),
              job(editor),
              event(editor),
              person(editor),
              course(editor),
            ],
          });
        },
    );
  }
})();

