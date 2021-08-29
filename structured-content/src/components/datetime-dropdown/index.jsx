/**
 * WordPress dependencies
 */
const {__} = wp.i18n;
const {Fragment} = wp.element;
const {Dropdown, DateTimePicker} = wp.components;
const {__experimentalGetSettings, dateI18n} = wp.date;

export function DatetimeDropdown({
                                   value,
                                   onChange,
                                   placeholder = 'Select Date',
                                 }) {

  const settings = __experimentalGetSettings();

  // To know if the current timezone is a 12 hour time with look for an "a" in the time format.
  // We also make sure this a is not escaped by a "/".
  const is12HourTime = /a(?!\\)/i.test(
      settings.formats.time.toLowerCase() // Test only the lower case a
          .replace(/\\\\/g, '') // Replace "//" with empty strings
          .split('').reverse().join(''), // Reverse the string and test for "a" not followed by a slash
  );

  return (
      <Fragment>
        <Dropdown
            className="w-100"
            position="bottom left"
            renderToggle={({onToggle, isOpen}) => (
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
                      dateI18n(settings.formats.datetimeAbbreviated, value) :
                      placeholder}
                </div>
            )}
            renderContent={() =>
                <DateTimePicker
                    currentDate={value}
                    onChange={value => onChange(value)}
                    is12Hour={is12HourTime}
                />
            }
        />
      </Fragment>
  );
}

export default DatetimeDropdown;
