import {
  ErrorCreateImportStringFromList,
  ErrorCreateImportStringFromListZeroLength
} from '../errors/errors';

/**
 * @description Convert list of imports to string literal for CSS file production
 */
export function createImportStringFromList(
  importArray: any[],
  outputFolderTokens = 'tokens'
): string {
  if (!importArray) throw new Error(ErrorCreateImportStringFromList);
  if (!(importArray.length > 0)) throw new Error(ErrorCreateImportStringFromListZeroLength);

  let importString = ``;
  const folder = outputFolderTokens;

  /**
   * TODO BUGFIX: Hardcoded path, should be according to config ("outputFolderTokens"...)
   * @see https://github.com/mikaelvesavuori/figmagic/issues/99
   */
  importArray.forEach((importItem: string) => {
    importString += `import ${importItem} from '${folder}/${importItem}';\n`;
  });

  return importString;
}
