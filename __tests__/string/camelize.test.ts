import { camelize } from '../../bin/frameworks/string/camelize';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      camelize();
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should remove spaces and capitalize first letter of the word coming after the removed space', () => {
    expect(camelize('John Johnson')).toBe('johnJohnson');
  });

  test('It should lower-case the string', () => {
    expect(camelize('ASDF')).toBe('asdf');
  });

  test('It should trim whitespace', () => {
    expect(camelize('     text       ')).toBe('text');
  });

  test('It should not change already camelcased word', () => {
    expect(camelize('camelCaseWord')).toBe('camelCaseWord');
  });

  test('It should convert snake case', () => {
    expect(camelize('snake_case_word')).toBe('snakeCaseWord');
  });

  test('It should convert kebab case', () => {
    expect(camelize('kebab-case-word')).toBe('kebabCaseWord');
  });

  test('It should consider mutiple spaces as a single space', () => {
    expect(camelize('hello               world')).toBe('helloWorld');
  });

  test('It should consider all characters that are not letter nor digit as a space', () => {
    expect(camelize('hello }[";-_world')).toBe('helloWorld');
  });
});
