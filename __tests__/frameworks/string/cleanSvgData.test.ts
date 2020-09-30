import { svgData } from '../../../testdata/svg/svg';

import { cleanSvgData } from '../../../bin/frameworks/string/cleanSvgData';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      cleanSvgData();
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should remove width and height properties from SVG data string', () => {
    expect(cleanSvgData(svgData)).toBe(
      `<svg viewBox="0 0 55 56" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M2.11131 28.0662L17.0333 51.499L52.1723 1.43805" stroke="#219653" stroke-width="5"/>\n</svg>`
    );
  });
});
