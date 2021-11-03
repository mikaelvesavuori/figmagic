import { normalizeUnits } from '../../../bin/frameworks/string/normalizeUnits';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      normalizeUnits();
    }).toThrow();
  });

  test('It should throw an error if trying to convert to rem but having no remSize provided', () => {
    expect(() => {
      normalizeUnits(400, 'px', 'rem');
    }).toThrow();
  });

  test('It should throw an error if being passed an invalid newUnit, since it cannot set rootSize', () => {
    expect(() => {
      normalizeUnits(400, 'px', 'asdf');
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should normalize a percent unit to unitless, when given a width value, current unit string, and a conversion type as float', () => {
    expect(normalizeUnits(146.484375, 'percent', 'unitless')).toBe('1.46484375');
  });

  test('It should normalize a letter-spacing unit to a converted pixel value, when given a width value, current unit string, and a conversion type as string', () => {
    expect(normalizeUnits(100, 'px', 'px', 16)).toBe('100px');
  });

  test('It should normalize a px value to base rem size, when given a width value, current unit string, and a conversion type as string', () => {
    expect(normalizeUnits(48, 'px', 'rem', 16)).toBe('3rem');
  });
});
