import { createEnumStringOutOfObject } from '../bin/frameworks/helpers/createEnumStringOutOfObject';

import { enumDataTestObject, enumDataExpectedResponse } from '../testdata/enumData';

/*
test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    createEnumStringOutOfObject();
  }).toThrow();
});
*/

test('It should return a correct enum-format response', () => {
  expect(createEnumStringOutOfObject(enumDataTestObject)).toBe(enumDataExpectedResponse);
});
