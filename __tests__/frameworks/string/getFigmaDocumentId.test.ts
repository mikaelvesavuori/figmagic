import { getFigmaDocumentId } from '../../../bin/frameworks/string/getFigmaDocumentId';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      getFigmaDocumentId();
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should return the document ID substring if a full URL is provided', () => {
    expect(
      getFigmaDocumentId(
        'https://www.figma.com/file/lkf32lkncowicdschjlkskhclsjskdh/SomeFileName-€#JH'
      )
    ).toBe('lkf32lkncowicdschjlkskhclsjskdh');
  });

  test('It should return the string as-is if it does not begin with "https://www.figma.com/file/"', () => {
    expect(getFigmaDocumentId('lkf32lkncowicdschjlkskhclsjskdh')).toBe(
      'lkf32lkncowicdschjlkskhclsjskdh'
    );
  });
});
