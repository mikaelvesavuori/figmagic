import {
  ErrorCreateImportStringFromList,
  ErrorCreateImportStringFromListZeroLength
} from '../errors/errors';

/**
 * @description Convert list of imports to string literal for CSS file production
 */
export function createImportStringFromList(
  importArray: any[],
  outputFolderTokens = 'tokens',
  tokensRelativeImportPrefix = ''
): string {
  if (!importArray) throw new Error(ErrorCreateImportStringFromList);
  if (!(importArray.length > 0)) throw new Error(ErrorCreateImportStringFromListZeroLength);

  let importString = ``;

  importArray.forEach((importItem: string) => {
    importString += `import ${importItem} from '${tokensRelativeImportPrefix}${outputFolderTokens}/${importItem}';\n`;
  });

  return importString;
}
