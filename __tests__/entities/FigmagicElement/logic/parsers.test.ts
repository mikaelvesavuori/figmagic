import {
  getPaddingY,
  getPaddingX,
  parsePadding
} from '../../../../bin/entities/FigmagicElement/logic/parsers';

const TEXT_ELEMENT = {
  id: '3005:102',
  name: 'Normal',
  type: 'TEXT',
  blendMode: 'PASS_THROUGH',
  absoluteBoundingBox: { x: 292, y: 57, width: 304, height: 40 },
  constraints: { vertical: 'SCALE', horizontal: 'SCALE' },
  fills: [{ blendMode: 'NORMAL', type: 'SOLID', color: [{}] }],
  strokes: [],
  strokeWeight: 1,
  strokeAlign: 'OUTSIDE',
  effects: [],
  characters: 'Normal',
  style: {
    fontFamily: 'Helvetica Neue',
    fontPostScriptName: 'HelveticaNeue-Bold',
    fontWeight: 700,
    paragraphSpacing: 1,
    textCase: 'UPPER',
    fontSize: 16,
    textAlignHorizontal: 'CENTER',
    textAlignVertical: 'CENTER',
    letterSpacing: 0.8,
    lineHeightPx: 18.75,
    lineHeightPercent: 100,
    lineHeightUnit: 'INTRINSIC_%'
  },
  characterStyleOverrides: [],
  styleOverrideTable: {}
};

const ELEMENT = {
  id: '3010:15',
  name: 'Normal',
  type: 'RECTANGLE',
  blendMode: 'PASS_THROUGH',
  absoluteBoundingBox: { x: 284, y: 53, width: 320, height: 48 },
  constraints: { vertical: 'SCALE', horizontal: 'SCALE' },
  fills: [{ blendMode: 'NORMAL', type: 'SOLID', color: [{}] }],
  strokes: [{ blendMode: 'NORMAL', type: 'SOLID', color: [{ Object }] }],
  strokeWeight: 1,
  strokeAlign: 'INSIDE',
  effects: [],
  cornerRadius: 8,
  rectangleCornerRadii: [8, 8, 8, 8]
};

const PADDING_PARAMS = {
  padding: { top: 0, bottom: 0, left: 16, right: 16 },
  spacing: {
    huge: '6rem',
    large: '4rem',
    big: '3rem',
    medium: '2rem',
    small: '1rem',
    tiny: '0.5rem'
  },
  remSize: 16
};

describe('Get padding Y', () => {
  describe('Failure cases', () => {
    test('It should throw an error if called without arguments', () => {
      // @ts-ignore
      expect(getPaddingY()).toBe(null);
    });

    test('It should throw an error if called without valid arguments', () => {
      expect(() => {
        // @ts-ignore
        getPaddingY({}, null);
      }).toThrowError();
    });
  });

  describe('Success cases', () => {
    test('It should return an object with padding', () => {
      expect(getPaddingY(TEXT_ELEMENT as any, ELEMENT as any)).toMatchObject({ bottom: 4, top: 4 });
    });
  });
});

describe('Get padding X', () => {
  describe('Failure cases', () => {
    test('It should throw an error if called with an element that does not contain absoluteBoundingBox', () => {
      // @ts-ignore
      expect(() => getPaddingX({ asdf: 1 }, { asdf: 1 })).toThrowError();
    });
  });

  describe('Success cases', () => {
    test('It should return null if called without any arguments', () => {
      // @ts-ignore
      expect(getPaddingX()).toBe(null);
    });

    test('It should return an object with padding', () => {
      expect(getPaddingX(TEXT_ELEMENT as any, ELEMENT as any)).toMatchObject({ left: 8, right: 8 });
    });
  });
});

describe('Parse padding', () => {
  describe('Failure cases', () => {
    test('It should throw an error if called without arguments', () => {
      // @ts-ignore
      expect(() => parsePadding()).toThrowError();
    });

    test('It should throw an error if missing params argument', () => {
      // @ts-ignore
      expect(() => parsePadding('cssString', [], null)).toThrowError();
    });
  });

  describe('Success cases', () => {
    test('It should parse padding, matching to a corresponding spacing token value', () => {
      // @ts-ignore
      expect(
        parsePadding('border-width: 10px;\n', ['border-widths'], PADDING_PARAMS)
      ).toMatchObject({
        css:
          'border-width: 10px;\npadding-left: ${spacing.small};\npadding-right: ${spacing.small};\n',
        imports: undefined
      });
    });
  });
});
