import { Imports } from '../../../bin/contracts/Imports';
import { createImportStringFromList } from '../../../bin/frameworks/string/createImportStringFromList';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      createImportStringFromList();
    }).toThrow();
  });

  test('It should throw an error if zero-length array is provided', () => {
    expect(() => {
      // @ts-ignore
      createImportStringFromList([]);
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should correctly return a CSS standard RGBA string', () => {
    const imports: Imports = [
      'spacing',
      'colors',
      'borderWidths',
      'radii',
      'shadows',
      'fontSizes',
      'fontFamilies',
      'fontWeights',
      'lineHeights'
    ];
    expect(createImportStringFromList(imports)).toBe(`import spacing from 'tokens/spacing';
import colors from 'tokens/colors';
import borderWidths from 'tokens/borderWidths';
import radii from 'tokens/radii';
import shadows from 'tokens/shadows';
import fontSizes from 'tokens/fontSizes';
import fontFamilies from 'tokens/fontFamilies';
import fontWeights from 'tokens/fontWeights';
import lineHeights from 'tokens/lineHeights';
`);
  });

  test('It should correctly handle a custom value for "outputFolderTokens"', () => {
    expect(createImportStringFromList(['spacing'], 'src/tokens')).toBe(
      `import spacing from 'src/tokens/spacing';
`
    );
  });

  test('It should correctly handle a custom value for "outputFolderTokens" and "tokensRelativeImportPrefix"', () => {
    expect(createImportStringFromList(['spacing'], 'src/tokens', '../../')).toBe(
      `import spacing from '../../src/tokens/spacing';
`
    );
  });
});
