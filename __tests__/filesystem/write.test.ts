// TODO: TEST

import { write } from '../../bin/frameworks/filesystem/write';

describe('Failure cases', () => {
  test('It should throw an error if no parameter is provided', async () => {
    // @ts-ignore
    await expect(write()).rejects.toThrow();
  });
});

describe('Success cases', () => {
  /*
  test('It should normalize a percent unit to unitless, when given a width value, current unit string, and a conversion type as float', () => {
    expect(replaceMediaQuery(146.484375, 'percent', 'unitless')).toBe('1.46484375');
  });
  */
});
