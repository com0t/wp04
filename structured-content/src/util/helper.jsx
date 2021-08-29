/**
 * External dependencies
 */

export const escapeQuotes = (string) => {
  return string.replace(/"/g, '&quot;');
};

export const findNextFreeID = (searchable_array) => {
  return Math.max(...searchable_array.map(element => element.id)) !==
  -Infinity ? Math.max(...searchable_array.map(element => element.id)) + 1 : 0;
};

export const removeElement = (id, elements) => {
  return elements.filter(f => {
    return f.id !== id;
  });
};

export const getInnerBlocks = (props, fallBack = null) => {
  return props.hasOwnProperty('innerBlocks') ? props.innerBlocks : fallBack;
};