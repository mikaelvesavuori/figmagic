import { errorAddDescriptionToElements } from '../../../meta/errors';

/**
 * Add description to list of elements
 *
 * @exports
 * @function
 * @param {object[]} elements - String from Figma description block
 * @param {object[]} components - Matching string (regex?)
 * @returns {any[]} - Returns array with description added
 * @throws {errorAddDescriptionToElements} - Throws error if elements or components missing
 */
export function addDescriptionToElements(elements, components): any[] {
  if (!elements || !components) throw new Error(errorAddDescriptionToElements);

  return elements.map((element: any) => {
    const _element = element;
    _element.description = components[element.id].description;
    return _element;
  });
}
