import path from 'path';

import { checkIfExists } from '../../../bin/frameworks/filesystem/checkIfExists';

describe('Success cases', () => {
  test('It should return true if it finds a file', () => {
    const PATH = path.join('testdata', 'figma.json');
    const FILE_EXISTS = checkIfExists(PATH);
    expect(FILE_EXISTS).toBe(true);
  });

  test('It should return false if it does not find a file', () => {
    const PATH = path.join('testdata', 'ajhk3jhfkj3');
    const FILE_EXISTS = checkIfExists(PATH);
    expect(FILE_EXISTS).toBe(false);
  });
});
