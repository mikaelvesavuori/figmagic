import { calculateDegree2Point } from '../../../bin/frameworks/string/calculateDegree2Point';

import { points1, points2, points3, points4, points5 } from '../../../testdata/gradient';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      calculateDegree2Point();
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should return 180', () => {
    expect(calculateDegree2Point(points1[0], points1[1])).toBe(180);
  });

  test('It should return 90', () => {
    expect(calculateDegree2Point(points2[0], points2[1])).toBe(90);
  });

  // The below cases will not be equal to Figma's own calculated values
  test('It should return 140.38', () => {
    expect(calculateDegree2Point(points3[0], points3[1])).toBe(140.38);
  });

  test('It should return 135', () => {
    expect(calculateDegree2Point(points4[0], points4[1])).toBe(135);
  });

  test('It should return 118.26', () => {
    expect(calculateDegree2Point(points5[0], points5[1])).toBe(118.26);
  });
});
