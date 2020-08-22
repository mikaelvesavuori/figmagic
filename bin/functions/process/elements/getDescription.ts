import { errorGetDescription, errorExtractDescription } from '../../../meta/errors';

/**
 * Get element description
 *
 * @param element String from Figma description block
 */
export function getDescription(element: any): string {
  if (!element) throw new Error(errorGetDescription);

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
  if (!description) throw new Error(errorExtractDescription);

  return description
    .slice(description.indexOf('description=') + 12, description.length)
    .replace(/^\s*\n/gm, '');
};
