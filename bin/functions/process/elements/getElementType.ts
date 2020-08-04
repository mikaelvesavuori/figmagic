import { errorGetElementType } from '../../../meta/errors';

/**
 * Get the type of HTML element this represents
 *
 * @exports
 * @function
 * @param {any} element - Element
 * @returns {string} - Returns string with element type
 * @throws {errorGetElementType} - Throws error if no element provided
 */
export function getElementType(element: any): string {
  if (!element) throw new Error(errorGetElementType);

  return element.description.match(/element=(.*)/)
    ? element.description.match(/element=(.*)/)[1]
    : 'div';
}
