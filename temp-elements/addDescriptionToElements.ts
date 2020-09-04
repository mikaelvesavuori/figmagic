import { ErrorAddDescriptionToElements } from '../../../frameworks/errors/errors';

/**
 * @description Add description to list of elements
 *
 * @param elements String from Figma description block
 * @param components Matching string (regex?)
 */
// TODO: Add real types
export function addDescriptionToElements(
  elements: Record<string, unknown>[],
  components: any
): any[] {
  if (!elements || !components) throw new Error(ErrorAddDescriptionToElements);

  return elements.map((element: any) => {
    element.description = components[element.id].description;
    return element;
  });
}
