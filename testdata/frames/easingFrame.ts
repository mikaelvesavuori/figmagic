import { FRAME as Frame } from '../../bin/contracts/Figma';

export const easingFrame: Frame = {
  id: '2657:97',
  name: 'Easings',
  type: 'FRAME',
  blendMode: 'PASS_THROUGH',
  children: [
    {
      id: '63:0',
      name: 'ease-in',
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
      characters: 'cubic-bezier(0.50, 0, 1, 1)',
      style: {},
      characterStyleOverrides: [],
      styleOverrideTable: {}
    },
    {
      id: '2657:100',
      name: 'ease-out',
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
      characters: 'cubic-bezier(0, 0, 0.40, 1)',
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
      name: 'ease-inout',
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
      characters: 'cubic-bezier(0.45, 0, 0.40, 1)',
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

export const easingFrameInvalid = {
  children: [
    {
      somethingElse: 123
    }
  ]
};
