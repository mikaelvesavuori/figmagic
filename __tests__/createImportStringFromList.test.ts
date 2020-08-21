import { createImportStringFromList } from '../bin/functions/helpers/createImportStringFromList';

/*
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
*/

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
  ).toBe(`import spacing from 'tokens/spacing';
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
