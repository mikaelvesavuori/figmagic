import { processNestedCss } from '../../../../bin/entities/FigmagicElement/logic/processNestedCss';

import { buttonCss, expectedButtonCss } from '../../../../testdata/css/buttonCss';
import {
  nestedButtonTextOnly,
  nestedButtonTextOnlyResult
} from '../../../../testdata/css/nestedButtonTextOnly';
import { nestedButton, nestedButtonResult } from '../../../../testdata/css/nestedButton';

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

  test('It should correctly process CSS (nested, text-only element) that has valid input', () => {
    expect(processNestedCss(nestedButtonTextOnly)).toBe(nestedButtonTextOnlyResult);
  });

  test('It should correctly process CSS (nested button element) that has valid input', () => {
    expect(processNestedCss(nestedButton)).toBe(nestedButtonResult);
  });
});
