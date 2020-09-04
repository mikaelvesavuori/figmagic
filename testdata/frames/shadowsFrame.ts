import { FRAME as Frame } from '../../bin/contracts/Figma';

export const shadowsFrame: Frame = {
  id: '2657:121',
  name: 'Shadows',
  type: 'FRAME',
  blendMode: 'PASS_THROUGH',
  children: [
    {
      id: '3085:2',
      name: 'DeepMulti',
      type: 'RECTANGLE',
      blendMode: 'PASS_THROUGH',
      absoluteBoundingBox: {
        x: 1395,
        y: 1405,
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
      effects: [
        {
          type: 'DROP_SHADOW',
          visible: true,
          color: {
            r: 0,
            g: 0,
            b: 0,
            a: 0.10000000149011612
          },
          blendMode: 'NORMAL',
          offset: {
            x: 0,
            y: 4
          },
          radius: 20
        },
        {
          type: 'DROP_SHADOW',
          visible: true,
          color: {
            r: 0,
            g: 0,
            b: 0,
            a: 0.17000000178813934
          },
          blendMode: 'NORMAL',
          offset: {
            x: 0,
            y: 4
          },
          radius: 4
        }
      ],
      styles: {
        effect: '3085:4'
      }
    },
    {
      id: '2657:127',
      name: 'Deep',
      type: 'RECTANGLE',
      blendMode: 'PASS_THROUGH',
      absoluteBoundingBox: {
        x: 1325,
        y: 1405,
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
      effects: [
        {
          type: 'DROP_SHADOW',
          visible: true,
          color: {
            r: 0.7686274647712708,
            g: 0.7686274647712708,
            b: 0.7686274647712708,
            a: 0.75
          },
          blendMode: 'NORMAL',
          offset: {
            x: 3,
            y: 3
          },
          radius: 3
        }
      ],
      styles: {
        effect: '2657:135'
      }
    },
    {
      id: '2657:125',
      name: 'Medium',
      type: 'RECTANGLE',
      blendMode: 'PASS_THROUGH',
      absoluteBoundingBox: {
        x: 1255,
        y: 1405,
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
      effects: [
        {
          type: 'DROP_SHADOW',
          visible: true,
          color: {
            r: 0,
            g: 0,
            b: 0,
            a: 0.5
          },
          blendMode: 'NORMAL',
          offset: {
            x: 0,
            y: 0
          },
          radius: 5
        }
      ],
      styles: {
        effect: '2657:134'
      }
    },
    {
      id: '2657:126',
      name: 'Soft',
      type: 'RECTANGLE',
      blendMode: 'PASS_THROUGH',
      absoluteBoundingBox: {
        x: 1185,
        y: 1405,
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
          offset: {
            x: 0,
            y: 0
          },
          radius: 5
        }
      ],
      styles: {
        effect: '2657:133'
      }
    }
  ],
  absoluteBoundingBox: {
    x: 1152,
    y: 1380,
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

export const shadowsFrameMultipleShadows: Frame = {
  id: '2657:121',
  name: 'Shadows',
  type: 'FRAME',
  blendMode: 'PASS_THROUGH',
  children: [
    {
      id: '2657:127',
      name: 'Deep',
      type: 'RECTANGLE',
      blendMode: 'PASS_THROUGH',
      absoluteBoundingBox: { x: 463, y: 1055, width: 50, height: 50 },
      preserveRatio: true,
      constraints: { vertical: 'TOP', horizontal: 'LEFT' },
      fills: [
        {
          blendMode: 'NORMAL',
          type: 'SOLID',
          color: { r: 1, g: 1, b: 1, a: 1 }
        }
      ],
      strokes: [],
      strokeWeight: 1,
      strokeAlign: 'INSIDE',
      effects: [
        {
          type: 'DROP_SHADOW',
          visible: true,
          color: {
            r: 0.7686274647712708,
            g: 0.7686274647712708,
            b: 0.7686274647712708,
            a: 0.75
          },
          blendMode: 'NORMAL',
          offset: { x: 3, y: 3 },
          radius: 3
        },
        {
          type: 'DROP_SHADOW',
          visible: true,
          color: {
            r: 0.7686274647712708,
            g: 0.7686274647712708,
            b: 0.7686274647712708,
            a: 0.75
          },
          blendMode: 'NORMAL',
          offset: { x: 3, y: 3 },
          radius: 3
        }
      ],
      styles: { effect: '2657:135' }
    }
  ],
  absoluteBoundingBox: { x: 290, y: 1034, width: 331, height: 93 },
  constraints: { vertical: 'TOP', horizontal: 'LEFT' },
  clipsContent: true,
  background: [
    {
      blendMode: 'NORMAL',
      type: 'SOLID',
      color: { r: 1, g: 1, b: 1, a: 1 }
    }
  ],
  fills: [
    {
      blendMode: 'NORMAL',
      type: 'SOLID',
      color: { r: 1, g: 1, b: 1, a: 1 }
    }
  ],
  strokes: [],
  strokeWeight: 1,
  strokeAlign: 'INSIDE',
  backgroundColor: { r: 1, g: 1, b: 1, a: 1 },
  effects: []
};

export const shadowsFrameNoEffects = {
  children: [
    {
      somethingElse: 123
    }
  ]
};
