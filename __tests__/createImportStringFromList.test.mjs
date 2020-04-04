import { createImportStringFromList } from '../bin/functions/helpers/createImportStringFromList';

test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    createImportStringFromList();
  }).toThrow();
});

test('It should throw an error if getting a zero-length array', () => {
  expect(() => {
    createImportStringFromList();
  }).toThrow();
});

test('It should correctly return a CSS standard RGBA string', () => {
  expect(
    createImportStringFromList([
      'spacing',
      'colors',
      'borderWidths',
      'radii',
      'shadows',
      'fontSizes',
      'fontFamilies',
      'fontWeights',
      'lineHeights'
    ])
  ).toBe(`import spacing from 'tokens/spacing.mjs';
import colors from 'tokens/colors.mjs';
import borderWidths from 'tokens/borderWidths.mjs';
import radii from 'tokens/radii.mjs';
import shadows from 'tokens/shadows.mjs';
import fontSizes from 'tokens/fontSizes.mjs';
import fontFamilies from 'tokens/fontFamilies.mjs';
import fontWeights from 'tokens/fontWeights.mjs';
import lineHeights from 'tokens/lineHeights.mjs';
`);
});
