import { FRAME as Frame } from '../../bin/contracts/Figma';

export const delayFrame: Frame = {
  id: '2657:97',
  name: 'Delays',
  type: 'FRAME',
  blendMode: 'PASS_THROUGH',
  children: [
    {
      id: '63:0',
      name: 'Decimal',
      type: 'TEXT',
      blendMode: 'PASS_THROUGH',
      absoluteBoundingBox: {},
      constraints: {},
      fills: [],
      strokes: [],
      strokeWeight: 1,
      strokeAlign: 'OUTSIDE',
      exportSettings: [],
      effects: [],
      characters: '0.5',
      style: {},
      characterStyleOverrides: [],
      styleOverrideTable: {}
    },
    {
      id: '2657:100',
      name: 'Fast',
      type: 'TEXT',
      blendMode: 'PASS_THROUGH',
      absoluteBoundingBox: {},
      constraints: {},
      fills: [],
      strokes: [],
      strokeWeight: 1,
      strokeAlign: 'OUTSIDE',
      exportSettings: [],
      effects: [],
      characters: '200',
      style: {},
      characterStyleOverrides: [],
      styleOverrideTable: {}
    },
    {
      id: '2657:100',
      name: 'Ignore - Helper text only',
      type: 'TEXT',
      blendMode: 'PASS_THROUGH',
      absoluteBoundingBox: {},
      constraints: {},
      fills: [],
      strokes: [],
      strokeWeight: 1,
      strokeAlign: 'OUTSIDE',
      exportSettings: [],
      effects: [],
      characters: 'Example text',
      style: {},
      characterStyleOverrides: [],
      styleOverrideTable: {}
    },
    {
      id: '2657:101',
      name: 'Medium',
      type: 'TEXT',
      blendMode: 'PASS_THROUGH',
      absoluteBoundingBox: {},
      constraints: {},
      fills: [],
      strokes: [],
      strokeWeight: 1,
      strokeAlign: 'OUTSIDE',
      exportSettings: [],
      effects: [],
      characters: '400',
      style: {},
      characterStyleOverrides: [],
      styleOverrideTable: {}
    },
    {
      id: '2657:99',
      name: 'Slow',
      type: 'TEXT',
      blendMode: 'PASS_THROUGH',
      absoluteBoundingBox: {},
      constraints: {},
      fills: [],
      strokes: [],
      strokeWeight: 1,
      strokeAlign: 'OUTSIDE',
      exportSettings: [],
      effects: [],
      characters: '750',
      style: {},
      characterStyleOverrides: [],
      styleOverrideTable: {}
    }
  ],
  absoluteBoundingBox: { x: 1152, y: 931, width: 593, height: 75 },
  constraints: { vertical: 'TOP', horizontal: 'LEFT' },
  clipsContent: true,
  background: [{ blendMode: 'NORMAL', type: 'SOLID', color: { r: 1, g: 1, b: 1, a: 1 } }],
  fills: [{ blendMode: 'NORMAL', type: 'SOLID', color: { r: 1, g: 1, b: 1, a: 1 } }],
  strokes: [],
  strokeWeight: 1,
  strokeAlign: 'INSIDE',
  backgroundColor: { r: 1, g: 1, b: 1, a: 1 },
  effects: []
};

export const delayFrameInvalid = {
  children: [
    {
      somethingElse: 123
    }
  ]
};
