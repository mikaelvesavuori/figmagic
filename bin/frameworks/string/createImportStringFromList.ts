import {
  errorCreateImportStringFromList,
  errorCreateImportStringFromListZeroLength
} from '../errors/errors';

/**
 * @description Convert list of imports to string literal for CSS file production
 *
 * @param importArray List of imports
 */
export function createImportStringFromList(importArray: any[]): string {
  if (!importArray) throw new Error(errorCreateImportStringFromList);
  if (!(importArray.length > 0)) throw new Error(errorCreateImportStringFromListZeroLength);

  let importString = ``;

  importArray.forEach((i) => {
    importString += `import ${i} from 'tokens/${i}';\n`;
  });

  return importString;
}
