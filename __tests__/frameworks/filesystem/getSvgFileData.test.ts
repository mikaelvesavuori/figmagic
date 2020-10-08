import * as path from 'path';

import { getSvgFileData } from '../../../bin/frameworks/filesystem/getSvgFileData';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      getSvgFileData();
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should return an empty string if unable to find the specified file', () => {
    expect(getSvgFileData(path.join('akjslajsljka'))).toBe('');
  });

  // TODO: Test fails inexplicably on Windows?
  test('It should return SVG file data', () => {
    const SVG = `<svg width="55" height="56" viewBox="0 0 55 56" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M2.11131 28.0662L17.0333 51.499L52.1723 1.43805" stroke="#219653" stroke-width="5"/>\n</svg>`;
    expect(getSvgFileData(path.join('testdata', 'svg', 'check.svg'))).toBe(SVG);
  });
});
