import { getPaddingY } from '../../../../bin/entities/FigmagicElement/logic/parsers/getPaddingY';
import { getPaddingX } from '../../../../bin/entities/FigmagicElement/logic/parsers/getPaddingX';
import { parsePadding } from '../../../../bin/entities/FigmagicElement/logic/parsers/parsePadding';
import { parseHeight } from '../../../../bin/entities/FigmagicElement/logic/parsers/parseHeight';
import { getBackgroundColor } from '../../../../bin/entities/FigmagicElement/logic/parsers/getBackgroundColor';
import { parseBackgroundColor } from '../../../../bin/entities/FigmagicElement/logic/parsers/parseBackgroundColor';
import { parseBorderWidth } from '../../../../bin/entities/FigmagicElement/logic/parsers/parseBorderWidth';
import { getBorderColor } from '../../../../bin/entities/FigmagicElement/logic/parsers/getBorderColor';
import { parseBorderColor } from '../../../../bin/entities/FigmagicElement/logic/parsers/parseBorderColor';
import { parseBorderRadius } from '../../../../bin/entities/FigmagicElement/logic/parsers/parseBorderRadius';
import { getShadow } from '../../../../bin/entities/FigmagicElement/logic/parsers/getShadow';
import { parseShadow } from '../../../../bin/entities/FigmagicElement/logic/parsers/parseShadow';
import { updateParsing } from '../../../../bin/entities/FigmagicElement/logic/parsers/updateParsing';
import { Imports } from '../../../../bin/contracts/Imports';

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

const PADDING_PARAMS: any = {
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

const HEIGHT_PARAMS = {
  spacing: {
    huge: '6rem',
    large: '4rem',
    big: '3rem',
    medium: '2rem',
    small: '1rem',
    tiny: '0.5rem'
  },
  height: 48,
  remSize: 16
};

const BG_ELEMENT = {
  id: '3010:15',
  name: 'Normal',
  type: 'RECTANGLE',
  blendMode: 'PASS_THROUGH',
  absoluteBoundingBox: { x: 284, y: 53, width: 320, height: 48 },
  constraints: { vertical: 'SCALE', horizontal: 'SCALE' },
  fills: [
    {
      blendMode: 'NORMAL',
      type: 'SOLID',
      color: {
        r: 0.7411764860153198,
        g: 0.7411764860153198,
        b: 0.7411764860153198,
        a: 1
      }
    }
  ],
  strokes: [{ blendMode: 'NORMAL', type: 'SOLID', color: [{}] }],
  strokeWeight: 1,
  strokeAlign: 'INSIDE',
  effects: [],
  cornerRadius: 8,
  rectangleCornerRadii: [8, 8, 8, 8]
};

const LINEAR_GRADIENT_ELEMENT = {
  id: '3227:778',
  name: 'Blue 4',
  type: 'RECTANGLE',
  blendMode: 'PASS_THROUGH',
  absoluteBoundingBox: { x: 468, y: 282, width: 100, height: 40 },
  constraints: { vertical: 'TOP', horizontal: 'LEFT' },
  fills: [
    {
      opacity: 0.800000011920929,
      blendMode: 'NORMAL',
      type: 'GRADIENT_LINEAR',
      gradientHandlePositions: [
        { x: 1.6829973346702458e-9, y: 0.4499999024131663 },
        { x: 1.0000000016829973, y: 0.4499999024131663 },
        { x: 2.014016540107928e-9, y: 0.12255282472897211 }
      ],
      gradientStops: [
        {
          color: {
            r: 0.24597221612930298,
            g: 0.6398308873176575,
            b: 0.7666666507720947,
            a: 0.949999988079071
          },
          position: 0.09375
        },
        {
          color: {
            r: 0.33725491166114807,
            g: 0.800000011920929,
            b: 0.9490196108818054,
            a: 0.019999999552965164
          },
          position: 0.9375
        }
      ]
    }
  ],
  strokes: [],
  strokeWeight: 1,
  strokeAlign: 'INSIDE',
  effects: []
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
        parsePadding(
          'border-width: 10px;\n',
          ['border-widths'] as unknown as Imports[],
          PADDING_PARAMS
        )
      ).toMatchObject({
        css: "border-width: 10px;\npadding-left: ${spacing['small']};\npadding-right: ${spacing['small']};\n",
        imports: undefined
      });
    });
  });
});

describe('Parse height', () => {
  describe('Failure cases', () => {
    test('It should throw an error if called without arguments', () => {
      // @ts-ignore
      expect(() => parseHeight()).toThrowError();
    });

    test('It should throw an error if missing params argument', () => {
      // @ts-ignore
      expect(() => parseHeight('cssString', [], null)).toThrowError();
    });
  });

  describe('Success cases', () => {
    const CSS = `width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;`;

    test('It should parse height, matching to a corresponding spacing token value', () => {
      // @ts-ignore
      expect(parseHeight(CSS, [], HEIGHT_PARAMS)).toMatchObject({
        css: "width: 100%;\nbox-sizing: border-box;\nborder: 0;\nborder-style: solid;\nwidth: 100%;\nbox-sizing: border-box;\nborder: 0;\nborder-style: solid;height: ${spacing['big']};\n",
        imports: undefined
      });
    });
  });
});

describe('Get background color', () => {
  describe('Failure cases', () => {
    test('It should throw an error if called without arguments', () => {
      // @ts-ignore
      expect(() => getBackgroundColor()).toThrowError();
    });
  });

  describe('Success cases', () => {
    test('It should return null if missing "fills" property', () => {
      // @ts-ignore
      expect(getBackgroundColor({ somethingElse: 123 })).toBe(null);
    });

    test('It should get background color (single)', () => {
      // @ts-ignore
      expect(getBackgroundColor(BG_ELEMENT)).toBe('rgba(189, 189, 189, 1)');
    });

    test('It should get background color (linear gradient)', () => {
      // @ts-ignore
      expect(getBackgroundColor(LINEAR_GRADIENT_ELEMENT)).toBe(
        'linear-gradient(90deg, rgba(63, 163, 195, 0.95) 9%, rgba(86, 204, 242, 0.02) 94%)'
      );
    });
  });
});

const CSS = `width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
height: \${spacing['big']};`;

const IMPORTS: Imports[] = ['spacing'] as unknown as Imports[];

const PARAMS: any = {
  colors: {
    green3: 'rgba(111, 207, 151, 1)',
    green2: 'rgba(39, 174, 96, 1)',
    green1: 'rgba(33, 150, 83, 1)',
    blue3: 'rgba(86, 204, 242, 1)',
    blue2: 'rgba(45, 156, 219, 1)',
    blue1: 'rgba(47, 128, 237, 1)',
    yellow: 'rgba(242, 201, 76, 1)',
    orange: 'rgba(242, 153, 74, 1)',
    red: 'rgba(235, 87, 87, 1)',
    neon: 'rgba(228, 255, 193, 1)',
    gray5: 'rgba(242, 242, 242, 1)',
    gray4: 'rgba(224, 224, 224, 1)',
    gray3: 'rgba(189, 189, 189, 1)',
    gray2: 'rgba(130, 130, 130, 1)',
    gray1: 'rgba(79, 79, 79, 1)',
    white: 'rgba(255, 255, 255, 1)',
    black: 'rgba(51, 51, 51, 1)'
  },
  backgroundColor: 'rgba(47, 128, 237, 1)',
  remSize: 16,
  outputFormatColors: 'rgba'
};

describe('Parse background color', () => {
  describe('Failure cases', () => {
    test('It should throw an error if called without arguments', () => {
      // @ts-ignore
      expect(() => parseBackgroundColor()).toThrowError();
    });
  });

  describe('Success cases', () => {
    test('It should parse background colors', () => {
      expect(parseBackgroundColor(CSS, IMPORTS, PARAMS)).toMatchObject({
        css:
          'width: 100%;\n' +
          'box-sizing: border-box;\n' +
          'border: 0;\n' +
          'border-style: solid;\n' +
          'width: 100%;\n' +
          'box-sizing: border-box;\n' +
          'border: 0;\n' +
          'border-style: solid;\n' +
          'width: 100%;\n' +
          'box-sizing: border-box;\n' +
          'border: 0;\n' +
          'border-style: solid;\n' +
          'width: 100%;\n' +
          'box-sizing: border-box;\n' +
          'border: 0;\n' +
          'border-style: solid;\n' +
          "height: ${spacing['big']};background-color: ${colors['blue1']};\n",
        imports: undefined
      });
    });
  });
});

const BORDER_WIDTH_IMPORTS = ['spacing', 'colors'];
const BORDER_WIDTH_PARAMS = {
  borderWidths: { chunky: '8px', fat: '4px', regular: '2px', hairline: '1px' },
  borderWidth: '1px',
  remSize: 16
};

describe('Parse border width', () => {
  describe('Failure cases', () => {
    test('It should throw an error if called without arguments', () => {
      // @ts-ignore
      expect(() => parseBorderWidth()).toThrowError();
    });
  });

  describe('Success cases', () => {
    test('It should parse border widths', () => {
      // @ts-ignore
      expect(parseBorderWidth(CSS, BORDER_WIDTH_IMPORTS, BORDER_WIDTH_PARAMS)).toMatchObject({
        css:
          'width: 100%;\n' +
          'box-sizing: border-box;\n' +
          'border: 0;\n' +
          'border-style: solid;\n' +
          'width: 100%;\n' +
          'box-sizing: border-box;\n' +
          'border: 0;\n' +
          'border-style: solid;\n' +
          'width: 100%;\n' +
          'box-sizing: border-box;\n' +
          'border: 0;\n' +
          'border-style: solid;\n' +
          'width: 100%;\n' +
          'box-sizing: border-box;\n' +
          'border: 0;\n' +
          'border-style: solid;\n' +
          "height: ${spacing['big']};border-width: ${borderWidths['hairline']};\n",
        imports: undefined
      });
    });
  });
});

describe('Get border color', () => {
  describe('Failure cases', () => {
    test('It should throw an error if called without arguments', () => {
      // @ts-ignore
      expect(() => getBorderColor()).toThrowError();
    });

    test('It should throw an error if missing "color" property', () => {
      expect(() =>
        // @ts-ignore
        getBorderColor({ strokes: [{ type: 'SOLID', somethingElse: 123 }] })
      ).toThrowError();
    });
  });

  const BORDER_COLOR_ELEMENT = {
    id: '3010:15',
    name: 'Normal',
    type: 'RECTANGLE',
    blendMode: 'PASS_THROUGH',
    absoluteBoundingBox: { x: 284, y: 53, width: 320, height: 48 },
    constraints: { vertical: 'SCALE', horizontal: 'SCALE' },
    fills: [{ blendMode: 'NORMAL', type: 'SOLID', color: [{}] }],
    strokes: [
      {
        blendMode: 'NORMAL',
        type: 'SOLID',
        color: {
          r: 0.7411764860153198,
          g: 0.7411764860153198,
          b: 0.7411764860153198,
          a: 1
        }
      }
    ],
    strokeWeight: 1,
    strokeAlign: 'INSIDE',
    effects: [],
    cornerRadius: 8,
    rectangleCornerRadii: [8, 8, 8, 8]
  };

  describe('Success cases', () => {
    test('It should receive null if missing "strokes" property', () => {
      // @ts-ignore
      expect(getBorderColor({})).toBe(null);
    });

    test('It should get border colors', () => {
      // @ts-ignore
      expect(getBorderColor(BORDER_COLOR_ELEMENT)).toBe(`rgba(189, 189, 189, 1)`);
    });
  });
});

const BORDER_COLOR_IMPORTS = ['spacing', 'border-color'];
const BORDER_COLOR_PARAMS = {
  colors: {
    green3: 'rgba(111, 207, 151, 1)',
    green2: 'rgba(39, 174, 96, 1)',
    green1: 'rgba(33, 150, 83, 1)',
    blue3: 'rgba(86, 204, 242, 1)',
    blue2: 'rgba(45, 156, 219, 1)',
    blue1: 'rgba(47, 128, 237, 1)',
    yellow: 'rgba(242, 201, 76, 1)',
    orange: 'rgba(242, 153, 74, 1)',
    red: 'rgba(235, 87, 87, 1)',
    neon: 'rgba(228, 255, 193, 1)',
    gray5: 'rgba(242, 242, 242, 1)',
    gray4: 'rgba(224, 224, 224, 1)',
    gray3: 'rgba(189, 189, 189, 1)',
    gray2: 'rgba(130, 130, 130, 1)',
    gray1: 'rgba(79, 79, 79, 1)',
    white: 'rgba(255, 255, 255, 1)',
    black: 'rgba(51, 51, 51, 1)'
  },
  borderColor: 'rgba(45, 156, 219, 1)',
  remSize: 16
};

describe('Parse border color', () => {
  describe('Failure cases', () => {
    test('It should throw an error if called without arguments', () => {
      // @ts-ignore
      expect(() => parseBorderColor()).toThrowError();
    });
  });

  describe('Success cases', () => {
    test('It should parse border colors', () => {
      // @ts-ignore
      expect(parseBorderColor(CSS, BORDER_COLOR_IMPORTS, BORDER_COLOR_PARAMS)).toMatchObject({
        css:
          'width: 100%;\n' +
          'box-sizing: border-box;\n' +
          'border: 0;\n' +
          'border-style: solid;\n' +
          'width: 100%;\n' +
          'box-sizing: border-box;\n' +
          'border: 0;\n' +
          'border-style: solid;\n' +
          'width: 100%;\n' +
          'box-sizing: border-box;\n' +
          'border: 0;\n' +
          'border-style: solid;\n' +
          'width: 100%;\n' +
          'box-sizing: border-box;\n' +
          'border: 0;\n' +
          'border-style: solid;\n' +
          "height: ${spacing['big']};border-color: ${colors['blue2']};\n",
        imports: undefined
      });
    });
  });
});

const BORDER_RADIUS_IMPORTS = ['spacing', 'colors', 'borderWidths', 'colors'];
const BORDER_RADIUS_PARAMS = {
  radii: { circle: '100px', soft: '8px', rounded: '4px', hard: '0px' },
  borderRadius: '8px',
  remSize: 16
};

describe('Parse border radius', () => {
  describe('Failure cases', () => {
    test('It should throw an error if called without arguments', () => {
      // @ts-ignore
      expect(() => parseBorderRadius()).toThrowError();
    });
  });

  describe('Success cases', () => {
    test('It should parse border radii', () => {
      // @ts-ignore
      expect(parseBorderRadius(CSS, BORDER_RADIUS_IMPORTS, BORDER_RADIUS_PARAMS)).toMatchObject({
        css:
          'width: 100%;\n' +
          'box-sizing: border-box;\n' +
          'border: 0;\n' +
          'border-style: solid;\n' +
          'width: 100%;\n' +
          'box-sizing: border-box;\n' +
          'border: 0;\n' +
          'border-style: solid;\n' +
          'width: 100%;\n' +
          'box-sizing: border-box;\n' +
          'border: 0;\n' +
          'border-style: solid;\n' +
          'width: 100%;\n' +
          'box-sizing: border-box;\n' +
          'border: 0;\n' +
          'border-style: solid;\n' +
          "height: ${spacing['big']};border-radius: ${radii['soft']};\n",
        imports: undefined
      });
    });
  });
});

describe('Get shadow', () => {
  describe('Failure cases', () => {
    test('It should throw an error if called without arguments', () => {
      // @ts-ignore
      expect(() => getShadow()).toThrowError();
    });
  });

  const SHADOW_ELEMENT = {
    id: '2874:36',
    name: 'Normal',
    type: 'RECTANGLE',
    blendMode: 'PASS_THROUGH',
    absoluteBoundingBox: { x: 284, y: 211, width: 320, height: 48 },
    constraints: { vertical: 'CENTER', horizontal: 'LEFT_RIGHT' },
    fills: [{ blendMode: 'NORMAL', type: 'SOLID', color: [{}] }],
    strokes: [{ blendMode: 'NORMAL', type: 'SOLID', color: [{}] }],
    strokeWeight: 2,
    strokeAlign: 'INSIDE',
    effects: [
      {
        type: 'DROP_SHADOW',
        visible: true,
        color: {
          r: 0.7686274647712708,
          g: 0.7686274647712708,
          b: 0.7686274647712708,
          a: 1
        },
        blendMode: 'NORMAL',
        offset: { x: 0, y: 0 },
        radius: 5
      }
    ],
    styles: { effect: '2657:133' },
    cornerRadius: 4,
    rectangleCornerRadii: [4, 4, 4, 4]
  };

  describe('Success cases', () => {
    test('It should receive null if missing "effects" property', () => {
      // @ts-ignore
      expect(getShadow({})).toBe(null);
    });

    test('It should get shadow', () => {
      // @ts-ignore
      expect(getShadow(SHADOW_ELEMENT)).toBe(`0px 0px 5px rgba(196, 196, 196, 1)`);
    });
  });
});

describe('Parse shadow', () => {
  describe('Failure cases', () => {
    test('It should throw an error if called without arguments', () => {
      // @ts-ignore
      expect(() => parseShadow()).toThrowError();
    });
  });

  const SHADOW_CSS = `width: 100%;
  box-sizing: border-box;
  border: 0;
  border-style: solid;
  width: 100%;
  box-sizing: border-box;
  border: 0;
  border-style: solid;
  width: 100%;
  box-sizing: border-box;
  border: 0;
  border-style: solid;
  width: 100%;
  box-sizing: border-box;
  border: 0;
  border-style: solid;
  height: \${spacing['big']};box-shadow: \${shadows['soft']};`;

  const SHADOW_IMPORTS = ['spacing', 'spacing', 'colors', 'borderWidths', 'colors', 'radii'];
  const SHADOW_PARAMS = {
    shadows: {
      deepMulti: '0px 4px 20px rgba(0, 0, 0, 0.1), 0px 4px 4px rgba(0, 0, 0, 0.17)',
      deep: '3px 3px 3px rgba(196, 196, 196, 0.75)',
      medium: '0px 0px 5px rgba(0, 0, 0, 0.5)',
      soft: '0px 0px 5px rgba(196, 196, 196, 1)'
    },
    shadow: '0px 0px 5px rgba(196, 196, 196, 1)',
    remSize: 16
  };

  describe('Success cases', () => {
    test('It should parse shadow', () => {
      // @ts-ignore
      expect(parseShadow(SHADOW_CSS, SHADOW_IMPORTS, SHADOW_PARAMS)).toMatchObject({
        css: `width: 100%;
  box-sizing: border-box;
  border: 0;
  border-style: solid;
  width: 100%;
  box-sizing: border-box;
  border: 0;
  border-style: solid;
  width: 100%;
  box-sizing: border-box;
  border: 0;
  border-style: solid;
  width: 100%;
  box-sizing: border-box;
  border: 0;
  border-style: solid;
  height: \${spacing['big']};box-shadow: \${shadows['soft']};box-shadow: \${shadows['soft']};\n`,
        imports: undefined
      });
    });
  });
});

describe('Update parsing', () => {
  describe('Failure cases', () => {
    test('It should throw an error if called without arguments', () => {
      // @ts-ignore
      expect(() => updateParsing()).toThrowError();
    });
  });

  const PARSING_CSS = `width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
height: \${spacing['big']};
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
height: \${spacing['big']};
background-color: \${colors['blue1']};
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
height: \${spacing['big']};
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
height: \${spacing['big']};
background-color: \${colors['blue1']};
border-width: \${borderWidths['hairline'];
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
height: \${spacing['big']};
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
height: \${spacing['big']};
background-color: \${colors['blue1']};
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
height: \${spacing['big']};
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
height: \${spacing['big']};
background-color: \${colors['blue1']};
border-width: \${borderWidths['hairline'];
border-color: \${colors['blue2']};
`;

  const PARSING_UPDATED_CSS = `border-radius: \${radii['soft']};`;

  const PARSING_IMPORTS: Imports[] = [
    'spacing',
    'colors',
    'borderWidths',
    'colors'
  ] as unknown as Imports[];

  const PARSING_UPDATED_IMPORTS: Imports[] = ['radii'] as unknown as Imports[];

  describe('Success cases', () => {
    test('It should update parsing', () => {
      // @ts-ignore
      expect(
        updateParsing(PARSING_CSS, PARSING_UPDATED_CSS, PARSING_IMPORTS, PARSING_UPDATED_IMPORTS)
      ).toMatchObject({
        css: `width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
height: \${spacing['big']};
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
height: \${spacing['big']};
background-color: \${colors['blue1']};
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
height: \${spacing['big']};
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
height: \${spacing['big']};
background-color: \${colors['blue1']};
border-width: \${borderWidths['hairline'];
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
height: \${spacing['big']};
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
height: \${spacing['big']};
background-color: \${colors['blue1']};
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
height: \${spacing['big']};
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
width: 100%;
box-sizing: border-box;
border: 0;
border-style: solid;
height: \${spacing['big']};
background-color: \${colors['blue1']};
border-width: \${borderWidths['hairline'];
border-color: \${colors['blue2']};
border-radius: \${radii['soft']};`,
        imports: undefined
      });
    });
  });
});
