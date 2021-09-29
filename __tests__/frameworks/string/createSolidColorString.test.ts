import { createSolidColorString } from '../../../bin/frameworks/string/createSolidColorString';

import { flatH1Element } from '../../../testdata/elements/flatH1Element';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      createSolidColorString();
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should create a RGBA format (solid color) string from element', () => {
    // @ts-ignore
    expect(createSolidColorString(flatH1Element.children[0].fills[0])).toBe('rgba(51, 51, 51, 1)');
  });
});
