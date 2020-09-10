import { ErrorLoadFile } from '../../../bin/frameworks/errors/errors';

describe('Failure cases', () => {
  test('It should throw an error if not given a path', () => {
    // @ts-ignore
    expect(() => ErrorLoadFile()).toThrowError();
  });
});

describe('Success cases', () => {
  test('It should show new and old values with separating marks', () => {
    expect(ErrorLoadFile('something')).toMatch('Could not find file: something!');
  });
});
