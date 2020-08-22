import { errorGetElementType } from '../../../meta/errors';

/**
 * Get the type of HTML element this represents
 *
 * @param element Element
 */
export function getElementType(element: Element): string {
  if (!element) throw new Error(errorGetElementType);

  return element.description.match(/element=(.*)/)
    ? element.description.match(/element=(.*)/)[1]
    : 'div';
}
