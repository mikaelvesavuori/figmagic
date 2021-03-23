import {
  getElement,
  getText,
  getExtraProps,
  getImports
} from '../../../bin/frameworks/filesystem/getDataHelpers';

describe('Success cases', () => {
  describe('No input', () => {
    test('getElement should return "div" if provided no input', () => {
      // @ts-ignore
      expect(getElement()).toBe('div');
    });

    test('getText should return empty string if provided no input', () => {
      // @ts-ignore
      expect(getText()).toBe('');
    });

    test('getExtraProps should return empty string if provided no input', () => {
      // @ts-ignore
      expect(getExtraProps()).toBe('');
    });

    test('getImports should return empty string if provided no input', () => {
      // @ts-ignore
      expect(getImports()).toBe('');
    });
  });

  describe('Empty metadata', () => {
    test('getElement should return "div" if provided metadata without "element" field', () => {
      expect(getElement({})).toBe('div');
    });

    test('getText should return "div" if provided metadata without "text" field', () => {
      expect(getText({})).toBe('');
    });

    test('getExtraProps should return "div" if provided metadata without "extraProps" field', () => {
      expect(getExtraProps({})).toBe('');
    });

    test('getImports should return "div" if provided metadata without "element" field', () => {
      expect(getImports({}, 'tokens')).toBe('');
    });

    test('getImports should return "div" element if provided metadata with zero-length "imports" field', () => {
      expect(getImports({ imports: [] }, 'tokens')).toBe('');
    });
  });

  describe('Valid metadata', () => {
    test('getElement should return metadata element if provided metadata with "imports" field', () => {
      expect(getElement({ element: 'h1' })).toBe('h1');
    });

    test('getText should return metadata element if provided metadata with "imports" field', () => {
      expect(getText({ text: 'h1' })).toBe('h1');
    });

    test('getExtraProps should return metadata element if provided metadata with "imports" field', () => {
      expect(getExtraProps({ extraProps: 'h1' })).toBe('h1');
    });

    test('getImports should return metadata element if provided metadata with "imports" field', () => {
      expect(getImports({ imports: [{}] }, 'tokens')).toBeTruthy();
    });
  });
});
