export function setHeight(el, val) {
  if (typeof val === 'function') val = val();
  if (typeof val === 'string') el.style.height = val;
  else el.style.height = val + 'px';
}

export function insertAfter(el, referenceNode) {
  referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
}

export function createElementFromHTML(htmlString) {
  let div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
}
