export function datetimeLocalSupported() {
  let input = document.createElement('input');
  input.setAttribute('type', 'datetime-local');
  return input.type === 'datetime-local';
}

export function dateSupported() {
  let input = document.createElement('input');
  input.setAttribute('type', 'date');
  return input.type === 'date';
}