import {
  errorCreateImportStringFromList,
  errorCreateImportStringFromListZeroLength
} from '../../meta/errors.mjs';

/**
 * Convert list of imports to string literal for CSS file production
 *
 * @exports
 * @function
 * @param {array} importArray - List of imports
 * @returns {string} - Returns template literal string with import statements
 * @throws {errorCreateImportStringFromList} - Throws error if no importArray is provided
 * @throws {errorCreateImportStringFromListZeroLength} - Throws error if zero-length importArray is provided
 */
export function createImportStringFromList(importArray) {
  if (!importArray) throw new Error(errorCreateImportStringFromList);
  if (!importArray.length > 0) throw new Error(errorCreateImportStringFromListZeroLength);

  let importString = ``;

  importArray.map(i => {
    importString += `import ${i} from 'tokens/${i}.mjs';\n`;
  });

  return importString;
}
