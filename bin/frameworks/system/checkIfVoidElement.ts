/**
 * @description Check if given element is a void element ("self-closing").
 */
export function checkIfVoidElement(elementName: string): boolean {
  if (!elementName) return false;

  const elements = [
    'area',
    'base',
    'basefont',
    'bgsound',
    'br',
    'col',
    'command',
    'embed',
    'frame',
    'hr',
    'image',
    'img',
    'input',
    'isindex',
    'keygen',
    'link',
    'menuitem',
    'meta',
    'nextid',
    'param',
    'source',
    'track',
    'wbr'
  ];

  return elements.includes(elementName);
}
