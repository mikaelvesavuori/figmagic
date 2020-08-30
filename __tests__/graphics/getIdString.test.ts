import { getIdString } from '../../bin/app/process/graphics/getIdString';

describe('Failure cases', () => {
  test('It should throw an error if no parameter is provided', async () => {
    // @ts-ignore
    expect(getIdString()).toThrow();
  });
});

describe('Success cases', () => {
  /*
  test('It should normalize a percent unit to unitless, when given a width value, current unit string, and a conversion type as float', () => {
    expect(getFileList(146.484375, 'percent', 'unitless')).toBe('1.46484375');
  });
  */
});
