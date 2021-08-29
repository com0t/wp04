import {$, listen} from '../util';

export function bindImageButtons() {
  listen('click', '.mce-select_image', (event) => {

    event.preventDefault();

    const targetId = event.target.dataset.target;

    let idTarget = typeof targetId === 'undefined' ?
        $('.mce-image') :
        $(`#${targetId}`),
        val = typeof targetId === 'undefined';

    const customUploader = (
        wp.media.frames.file_frame = wp.media(
            {
              title: 'Add Image',
              button: {text: 'Add Image'},
              multiple: false,
            },
        )
    );

    customUploader.on('select', () => {
      const attachment = customUploader.state().
          get('selection').
          first().
          toJSON();

      val ? idTarget.value = attachment.id : idTarget.innerHTML = attachment.id;
    });

    customUploader.open();
  });
}