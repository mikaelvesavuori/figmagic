import { FRAME as Frame } from '../../bin/contracts/Figma';

export const letterSpacingsFrame: Frame = {
  id: '2657:12',
  name: 'Letter Spacings',
  type: 'FRAME',
  blendMode: 'PASS_THROUGH',
  children: [
    {
      id: '2657:13',
      name: 'Tight',
      type: 'TEXT',
      blendMode: 'PASS_THROUGH',
      absoluteBoundingBox: {
        x: 1192,
        y: 819,
        width: 132,
        height: 19
      },
      constraints: {
        vertical: 'TOP',
        horizontal: 'LEFT'
      },
      fills: [
        {
          blendMode: 'NORMAL',
          type: 'SOLID',
          color: {
            r: 0,
            g: 0,
            b: 0,
            a: 1
          }
        }
      ],
      strokes: [],
      strokeWeight: 0,
      strokeAlign: 'OUTSIDE',
      effects: [],
      characters: 'Letter Spacing Tight',
      style: {
        fontFamily: 'Helvetica Neue',
        fontPostScriptName: 'HelveticaNeue',
        fontWeight: 400,
        paragraphSpacing: 1,
        textAutoResize: 'WIDTH_AND_HEIGHT',
        fontSize: 16,
        textAlignHorizontal: 'LEFT',
        textAlignVertical: 'CENTER',
        letterSpacing: -0.72,
        lineHeightPx: 18.75,
        lineHeightPercent: 100,
        lineHeightUnit: 'INTRINSIC_%'
      },
      layoutVersion: 1,
      characterStyleOverrides: [],
      styleOverrideTable: {}
    },
    {
      id: '2657:14',
      name: 'Wide',
      type: 'TEXT',
      blendMode: 'PASS_THROUGH',
      absoluteBoundingBox: {
        x: 1192,
        y: 780,
        width: 160,
        height: 19
      },
      constraints: {
        vertical: 'TOP',
        horizontal: 'LEFT'
      },
      fills: [
        {
          blendMode: 'NORMAL',
          type: 'SOLID',
          color: {
            r: 0,
            g: 0,
            b: 0,
            a: 1
          }
        }
      ],
      strokes: [],
      strokeWeight: 0,
      strokeAlign: 'OUTSIDE',
      effects: [],
      characters: 'Letter Spacing Wide',
      style: {
        fontFamily: 'Helvetica Neue',
        fontPostScriptName: 'HelveticaNeue',
        fontWeight: 400,
        paragraphSpacing: 1,
        textAutoResize: 'WIDTH_AND_HEIGHT',
        fontSize: 16,
        textAlignHorizontal: 'LEFT',
        textAlignVertical: 'CENTER',
        letterSpacing: 0.8,
        lineHeightPx: 18.75,
        lineHeightPercent: 100,
        lineHeightUnit: 'INTRINSIC_%'
      },
      layoutVersion: 1,
      characterStyleOverrides: [],
      styleOverrideTable: {}
    },
    {
      id: '2657:15',
      name: 'Regular',
      type: 'TEXT',
      blendMode: 'PASS_THROUGH',
      absoluteBoundingBox: {
        x: 1192,
        y: 741,
        width: 165,
        height: 19
      },
      constraints: {
        vertical: 'TOP',
        horizontal: 'LEFT'
      },
      fills: [
        {
          blendMode: 'NORMAL',
          type: 'SOLID',
          color: {
            r: 0,
            g: 0,
            b: 0,
            a: 1
          }
        }
      ],
      strokes: [],
      strokeWeight: 1,
      strokeAlign: 'OUTSIDE',
      exportSettings: [
        {
          suffix: '',
          format: 'PNG',
          constraint: {
            type: 'SCALE',
            value: 1
          }
        }
      ],
      effects: [],
      characters: 'Letter Spacing Regular',
      style: {
        fontFamily: 'Helvetica Neue',
        fontPostScriptName: 'HelveticaNeue',
        fontWeight: 400,
        paragraphSpacing: 1,
        textAutoResize: 'WIDTH_AND_HEIGHT',
        fontSize: 16,
        textAlignHorizontal: 'LEFT',
        textAlignVertical: 'CENTER',
        letterSpacing: 0,
        lineHeightPx: 18.75,
        lineHeightPercent: 100,
        lineHeightUnit: 'INTRINSIC_%'
      },
      layoutVersion: 1,
      characterStyleOverrides: [],
      styleOverrideTable: {}
    }
  ],
  absoluteBoundingBox: {
    x: 1152,
    y: 700,
    width: 593,
    height: 180
  },
  constraints: {
    vertical: 'TOP',
    horizontal: 'LEFT'
  },
  clipsContent: true,
  background: [
    {
      blendMode: 'NORMAL',
      type: 'SOLID',
      color: {
        r: 1,
        g: 1,
        b: 1,
        a: 1
      }
    }
  ],
  fills: [
    {
      blendMode: 'NORMAL',
      type: 'SOLID',
      color: {
        r: 1,
        g: 1,
        b: 1,
        a: 1
      }
    }
  ],
  strokes: [],
  strokeWeight: 1,
  strokeAlign: 'INSIDE',
  backgroundColor: {
    r: 1,
    g: 1,
    b: 1,
    a: 1
  },
  effects: []
};

export const letterSpacingsFrameNoStyle = {
  children: [
    {
      somethingElse: 123
    }
  ]
};

export const letterSpacingsFrameNoLetterSpacing = {
  name: 'test',
  children: [
    {
      name: 'foo',
      style: {
        letterSpacing: 0
      }
    }
  ]
};

export const letterSpacingUndefined = {
  name: 'test',
  children: [
    {
      name: 'foo',
      style: {
        fontSize: 16
      }
    }
  ]
};

export const mockedLetterSpacingFrame = {
  name: 'test',
  children: [
    {
      name: 'style1',
      style: {
        fontSize: 16,
        letterSpacing: 2
      }
    },
    {
      name: 'style2',
      style: {
        fontSize: 24,
        letterSpacing: 8
      }
    },
    {
      name: 'style3',
      style: {
        fontSize: 16,
        letterSpacing: 0.008
      }
    }
  ]
};
