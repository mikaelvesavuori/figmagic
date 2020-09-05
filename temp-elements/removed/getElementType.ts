import { ErrorGetElementType } from '../../bin/frameworks/errors/errors';

/**
 * @description Get the type of HTML element this represents
 *
 * @param element Element
 */
export function getElementType(element: any): string {
  if (!element) throw new Error(ErrorGetElementType);

  return element.description.match(/element=(.*)/)
    ? element.description.match(/element=(.*)/)[1]
    : 'div';
}
