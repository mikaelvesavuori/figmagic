import { ErrorAddDescriptionToElements } from '../../../app/errors/errors';

/**
 * @description Add description to list of elements
 *
 * @param elements String from Figma description block
 * @param components Matching string (regex?)
 */
// TODO: Add real types
export function addDescriptionToElements(elements: object[], components: object[]): any[] {
  if (!elements || !components) throw new Error(ErrorAddDescriptionToElements);

  return elements.map((element: any) => {
    const _element = element;
    _element.description = components[element.id].description;
    return _element;
  });
}
