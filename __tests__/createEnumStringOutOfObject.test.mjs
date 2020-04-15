import { createEnumStringOutOfObject } from '../bin/functions/helpers/createEnumStringOutOfObject.mjs';

import { enumDataTestObject, enumDataExpectedResponse } from '../testdata/enumData.mjs';

test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    createEnumStringOutOfObject();
  }).toThrow();
});

test('It should return a correct enum-format response', () => {
  expect(createEnumStringOutOfObject(enumDataTestObject)).toBe(enumDataExpectedResponse);
});
