import { createEnumStringOutOfObject } from '../../../bin/frameworks/string/createEnumStringOutOfObject';

import { enumDataTestObject, enumDataExpectedResponse } from '../../../testdata/enumData';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      createEnumStringOutOfObject();
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should return a correct enum-format response', () => {
    expect(createEnumStringOutOfObject(enumDataTestObject)).toBe(enumDataExpectedResponse);
  });
});
