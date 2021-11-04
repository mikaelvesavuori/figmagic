import { sanitizeString } from '../../../bin/frameworks/string/sanitizeString';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      sanitizeString();
    }).toThrow();
  });
});

describe('Success cases', () => {
  describe('No camelization', () => {
    test('It should remove characters that are not letters, numbers, dashes, and underscores', () => {
      expect(sanitizeString('$my-design-system-error500-001', false)).toBe(
        'my-design-system-error500-001'
      );
    });

    test('It should remove special characters', () => {
      expect(sanitizeString('@|[]§ª√¸˛ﬁª¸√üƒ¸@£[≈£|]§≈@§£\\//lakjhs', false)).toBe('lakjhs');
    });

    test('It should work with numbers', () => {
      expect(sanitizeString('123', false)).toBe('123');
    });

    test('It should work with lower-case letters', () => {
      expect(sanitizeString('text', false)).toBe('text');
    });

    test('It should work with mixed-case letters', () => {
      expect(sanitizeString('TeXt', false)).toBe('TeXt');
    });

    test('It should remove spaces and respect casing', () => {
      expect(sanitizeString('    Te xt   ', false)).toBe('Text');
    });
  });

  describe('Camelize', () => {
    test('It should remove spaces and capitalize first letter of the word coming after the removed space', () => {
      expect(sanitizeString('John Johnson')).toBe('johnJohnson');
    });

    test('It should lower-case the string', () => {
      expect(sanitizeString('ASDF')).toBe('asdf');
    });

    test('It should trim whitespace', () => {
      expect(sanitizeString('     text       ')).toBe('text');
    });

    test('It should not change already camelcased word', () => {
      expect(sanitizeString('camelCaseWord')).toBe('camelCaseWord');
    });

    test('It should convert snake case', () => {
      expect(sanitizeString('snake_case_word')).toBe('snakeCaseWord');
    });

    test('It should convert kebab case', () => {
      expect(sanitizeString('kebab-case-word')).toBe('kebabCaseWord');
    });

    test('It should consider mutiple spaces as a single space', () => {
      expect(sanitizeString('hello               world')).toBe('helloWorld');
    });

    test('It should consider all characters that are not letter nor digit as a space', () => {
      expect(sanitizeString('hello }[";-_world')).toBe('helloWorld');
    });
  });
});
