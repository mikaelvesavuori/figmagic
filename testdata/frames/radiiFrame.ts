import { FRAME as Frame } from '../../bin/contracts/Figma';

export const radiiFrame: Frame = {
  id: '2657:106',
  name: 'Radii',
  type: 'FRAME',
  blendMode: 'PASS_THROUGH',
  children: [
    {
      id: '2657:115',
      name: 'Circle',
      type: 'RECTANGLE',
      blendMode: 'PASS_THROUGH',
      absoluteBoundingBox: {
        x: 1395,
        y: 1105,
        width: 50,
        height: 50
      },
      preserveRatio: true,
      constraints: {
        vertical: 'TOP',
        horizontal: 'LEFT'
      },
      fills: [
        {
          blendMode: 'NORMAL',
          type: 'SOLID',
          color: {
            r: 0.7686274647712708,
            g: 0.7686274647712708,
            b: 0.7686274647712708,
            a: 1
          }
        }
      ],
      strokes: [],
      strokeWeight: 1,
      strokeAlign: 'INSIDE',
      effects: [],
      cornerRadius: 100,
      rectangleCornerRadii: [100, 100, 100, 100]
    },
    {
      id: '2657:114',
      name: 'Soft',
      type: 'RECTANGLE',
      blendMode: 'PASS_THROUGH',
      absoluteBoundingBox: {
        x: 1325,
        y: 1104,
        width: 50,
        height: 50
      },
      preserveRatio: true,
      constraints: {
        vertical: 'TOP',
        horizontal: 'LEFT'
      },
      fills: [
        {
          blendMode: 'NORMAL',
          type: 'SOLID',
          color: {
            r: 0.7686274647712708,
            g: 0.7686274647712708,
            b: 0.7686274647712708,
            a: 1
          }
        }
      ],
      strokes: [],
      strokeWeight: 1,
      strokeAlign: 'INSIDE',
      effects: [],
      cornerRadius: 8,
      rectangleCornerRadii: [8, 8, 8, 8]
    },
    {
      id: '2657:113',
      name: 'Rounded',
      type: 'RECTANGLE',
      blendMode: 'PASS_THROUGH',
      absoluteBoundingBox: {
        x: 1255,
        y: 1104,
        width: 50,
        height: 50
      },
      preserveRatio: true,
      constraints: {
        vertical: 'TOP',
        horizontal: 'LEFT'
      },
      fills: [
        {
          blendMode: 'NORMAL',
          type: 'SOLID',
          color: {
            r: 0.7686274647712708,
            g: 0.7686274647712708,
            b: 0.7686274647712708,
            a: 1
          }
        }
      ],
      strokes: [],
      strokeWeight: 1,
      strokeAlign: 'INSIDE',
      effects: [],
      cornerRadius: 4,
      rectangleCornerRadii: [4, 4, 4, 4]
    },
    {
      id: '2657:112',
      name: 'Hard',
      type: 'RECTANGLE',
      blendMode: 'PASS_THROUGH',
      absoluteBoundingBox: {
        x: 1185,
        y: 1104,
        width: 50,
        height: 50
      },
      preserveRatio: true,
      constraints: {
        vertical: 'TOP',
        horizontal: 'LEFT'
      },
      fills: [
        {
          blendMode: 'NORMAL',
          type: 'SOLID',
          color: {
            r: 0.7686274647712708,
            g: 0.7686274647712708,
            b: 0.7686274647712708,
            a: 1
          }
        }
      ],
      strokes: [],
      strokeWeight: 1,
      strokeAlign: 'INSIDE',
      effects: []
    }
  ],
  absoluteBoundingBox: {
    x: 1152,
    y: 1080,
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

export const radiiFrameNoCornerRadius = {
  children: [
    {
      somethingElse: 123
    }
  ]
};
