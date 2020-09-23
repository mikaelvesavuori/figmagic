import { processNestedCss } from '../../../../bin/entities/FigmagicElement/logic/processNestedCss';

import { buttonCss, expectedButtonCss } from '../../../../testdata/css/buttonCss';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      processNestedCss();
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should correctly process CSS that has valid input', () => {
    expect(processNestedCss(buttonCss)).toBe(expectedButtonCss);
  });
});
