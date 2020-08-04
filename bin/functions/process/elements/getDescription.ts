import { errorGetDescription, errorExtractDescription } from '../../../meta/errors';

/**
 * Get element description
 *
 * @exports
 * @function
 * @param {any} element - String from Figma description block
 * @returns {string} - Returns description string
 * @throws {errorAddDescriptionToElements} - Throws error if element is missing
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
 * @param {string} description - String of description
 * @returns {string} - Returns extractged description string
 * @throws {errorAddDescriptionToElements} - Throws error if description is missing
 */
const extractDescription = (description: string): string => {
  if (!description) throw new Error(errorExtractDescription);

  return description
    .slice(description.indexOf('description=') + 12, description.length)
    .replace(/^\s*\n/gm, '');
};
