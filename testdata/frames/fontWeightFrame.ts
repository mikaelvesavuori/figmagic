import { FRAME as Frame } from '../../bin/contracts/Figma';

export const fontWeightFrame: Frame = {
  id: '2605:24',
  name: 'Font Weights',
  type: 'FRAME',
  blendMode: 'PASS_THROUGH',
  children: [
    {
      id: '2856:0',
      name: 'Bold',
      type: 'TEXT',
      blendMode: 'PASS_THROUGH',
      absoluteBoundingBox: {
        x: 1608,
        y: 250,
        width: 74,
        height: 20
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
      characters: 'Font Bold',
      style: {
        fontFamily: 'Helvetica Neue',
        fontPostScriptName: 'HelveticaNeue-Bold',
        fontWeight: 700,
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
    },
    {
      id: '2605:26',
      name: 'Medium',
      type: 'TEXT',
      blendMode: 'PASS_THROUGH',
      absoluteBoundingBox: {
        x: 1467,
        y: 250,
        width: 98,
        height: 20
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
      characters: 'Font Medium',
      style: {
        fontFamily: 'Helvetica Neue',
        fontPostScriptName: 'HelveticaNeue-Medium',
        fontWeight: 500,
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
    },
    {
      id: '2605:27',
      name: 'Regular',
      type: 'TEXT',
      blendMode: 'PASS_THROUGH',
      absoluteBoundingBox: {
        x: 1321,
        y: 250,
        width: 92,
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
      characters: 'Font Regular',
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
    },
    {
      id: '2605:25',
      name: 'Light',
      type: 'TEXT',
      blendMode: 'PASS_THROUGH',
      absoluteBoundingBox: {
        x: 1192,
        y: 250,
        width: 70,
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
      characters: 'Font Light',
      style: {
        fontFamily: 'Helvetica Neue',
        fontPostScriptName: 'HelveticaNeue-Light',
        fontWeight: 300,
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
    y: 210,
    width: 593,
    height: 100
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

export const fontWeightFrameInvalid = {
  children: [
    {
      nameMismatch: 'Something',
      styleMismatch: {}
    }
  ]
};

export const fontWeightFrameFontWeightMismatch = {
  children: [
    {
      name: 'Something',
      style: {
        fontWeightMismatch: 100
      }
    }
  ]
};
