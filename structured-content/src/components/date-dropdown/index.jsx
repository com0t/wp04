/**
 * WordPress dependencies
 */
const {__} = wp.i18n;
const {Fragment} = wp.element;
const {Dropdown, DatePicker, TextControl} = wp.components;
const {__experimentalGetSettings, dateI18n} = wp.date;

import {dateSupported} from '../../tinymce/util';

export function DateDropdown({value, onChange, placeholder = 'Select Date'}) {

  const settings = __experimentalGetSettings();
  const supported = dateSupported();

  return (
      <Fragment>
        <Dropdown
            className="w-100"
            position="bottom left"
            renderToggle={({onToggle, isOpen}) => (
                <div>
                  {supported ?
                      <TextControl
                          type="date"
                          value={value}
                          onChange={value => onChange(value)}
                      />
                      :
                      <div
                          onClick={onToggle}
                          aria-expanded={isOpen}
                          className="components-text-control__input"
                          style={{
                            cursor: 'pointer',
                            backgroundColor: 'white',
                            width: '100%',
                          }}
                      >
                        {value ?
                            dateI18n(settings.formats.date, value) :
                            placeholder}
                      </div>
                  }
                </div>
            )}
            renderContent={() =>
                <DatePicker
                    currentDate={value}
                    onChange={value => onChange(dateI18n('Y-m-d', value))}
                />
            }
        />
      </Fragment>
  );
}

export default DateDropdown;
