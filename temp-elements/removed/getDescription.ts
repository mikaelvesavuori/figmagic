import { ErrorGetDescription, ErrorExtractDescription } from '../../bin/frameworks/errors/errors';

/**
 * @description Get element description
 *
 * @param element String from Figma description block
 */
export function getDescription(element: any): string {
  if (!element) throw new Error(ErrorGetDescription);

  return element.description.match(/description=(.*)/)
    ? extractDescription(element.description)
    : element.description;
}

/**
 * Extract element description
 *
 * @param description String of description
 */
const extractDescription = (description: string): string => {
  if (!description) throw new Error(ErrorExtractDescription);

  return description
    .slice(description.indexOf('description=') + 12, description.length)
    .replace(/^\s*\n/gm, '');
};
