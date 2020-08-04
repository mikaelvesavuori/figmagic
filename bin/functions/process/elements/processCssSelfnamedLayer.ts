import { parseCssFromElement } from '../parseCssFromElement';

import { msgProcessElementsCreatingElement } from '../../../meta/messages';

import { errorProcessElementsWrongElementCount } from '../../../meta/errors';

/**
 * Process CSS for layer with same name as self
 *
 * @exports
 * @function
 * @param {any} element - Element
 * @param {string} textElement - Text element
 * @param {string} css - CSS string
 * @param {any[]} imports - Imports array
 * @param {number} remSize - Rem size
 * @param {boolean} isTest - A boolean for if this is a test or not
 * @returns {Promise<object>} - Returns object with updated CSS and imports
 * @throws {errorProcessElementsWrongElementCount} - Throws error if no main element exists
 */
export async function processCssSelfnamedLayer(
  element: any,
  textElement: string,
  css: string,
  imports: any[],
  remSize: number,
  isTest: boolean
): Promise<object> {
  let updatedCss = css;
  let updatedImports = imports;

  const MAIN_ELEMENT = element.children.filter((e) => e.name === element.name);
  const TEXT_ELEMENT = textElement;

  if (MAIN_ELEMENT[0]) {
    if (MAIN_ELEMENT.length !== 1)
      throw new Error(`${errorProcessElementsWrongElementCount} ${element.name}!`);

    const FIXED_NAME = MAIN_ELEMENT[0].name.replace(/\s/gi, '');
    console.log(msgProcessElementsCreatingElement(MAIN_ELEMENT[0].name, FIXED_NAME));

    let elementStyling = await parseCssFromElement(
      MAIN_ELEMENT[0],
      TEXT_ELEMENT[0],
      remSize,
      isTest
    );

    updatedImports = updatedImports.concat(elementStyling.imports);
    updatedCss += elementStyling.css;
  }

  return { updatedCss, updatedImports };
}
