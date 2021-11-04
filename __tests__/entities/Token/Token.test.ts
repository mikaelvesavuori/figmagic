import * as path from 'path';

import { makeToken } from '../../../bin/entities/Token/index';
import { makeConfiguration } from '../../../bin/entities/Config/index';

import { FRAME as Frame } from '../../../bin/contracts/Figma';

import { designTokensPage } from '../../../testdata/designTokensPage';

describe('Failure cases', () => {
  test('It should throw an error if called without any arguments', () => {
    // @ts-ignore
    expect(() => makeToken()).toThrowError();
  });
});

describe('Success cases', () => {
  test('It should return a complete token and config when passing in valid token data (colors), token name, and configuration', async () => {
    const TOKEN_DATA = designTokensPage[1].children[0]; // "Colors"
    const USER_CONFIG_PATH = path.join(`${process.cwd()}`, `testdata`, `testConfig`);
    const TOKEN_NAME = `colors`; // Should be camel cased
    const CONFIG = await makeConfiguration(USER_CONFIG_PATH, ...[]);

    expect(makeToken(TOKEN_DATA as Frame, TOKEN_NAME, CONFIG)).toMatchObject({
      token: {
        absoluteBoundingBox: {
          height: 445,
          width: 756,
          x: 0,
          y: -2.842170943040401e-14
        },
        background: [
          {
            blendMode: 'NORMAL',
            color: {
              a: 1,
              b: 1,
              g: 1,
              r: 1
            },
            type: 'SOLID'
          }
        ],
        backgroundColor: {
          a: 1,
          b: 1,
          g: 1,
          r: 1
        },
        blendMode: 'PASS_THROUGH',
        children: [
          {
            absoluteBoundingBox: {
              height: 40,
              width: 100,
              x: 48,
              y: 42
            },
            blendMode: 'PASS_THROUGH',
            constraints: {
              horizontal: 'LEFT',
              vertical: 'TOP'
            },
            effects: [],
            fills: [
              {
                blendMode: 'NORMAL',
                color: {
                  a: 1,
                  b: 0.20000000298023224,
                  g: 0.20000000298023224,
                  r: 0.20000000298023224
                },
                type: 'SOLID'
              }
            ],
            id: '2605:58',
            name: 'Black',
            strokeAlign: 'INSIDE',
            strokeWeight: 1,
            strokes: [],
            styles: {
              fill: '1:100'
            },
            type: 'VECTOR'
          },
          {
            absoluteBoundingBox: {
              height: 40,
              width: 100,
              x: 48,
              y: 122
            },
            blendMode: 'PASS_THROUGH',
            constraints: {
              horizontal: 'LEFT',
              vertical: 'TOP'
            },
            effects: [],
            fills: [
              {
                blendMode: 'NORMAL',
                color: {
                  a: 1,
                  b: 1,
                  g: 1,
                  r: 1
                },
                type: 'SOLID'
              }
            ],
            id: '2605:57',
            name: 'White',
            strokeAlign: 'INSIDE',
            strokeWeight: 1,
            strokes: [
              {
                blendMode: 'NORMAL',
                color: {
                  a: 1,
                  b: 0.9563318490982056,
                  g: 0.9563318490982056,
                  r: 0.9563318490982056
                },
                type: 'SOLID'
              }
            ],
            styles: {
              fill: '1:101'
            },
            type: 'RECTANGLE'
          },
          {
            absoluteBoundingBox: {
              height: 40,
              width: 100,
              x: 188,
              y: 42
            },
            blendMode: 'PASS_THROUGH',
            constraints: {
              horizontal: 'LEFT',
              vertical: 'TOP'
            },
            effects: [],
            fills: [
              {
                blendMode: 'NORMAL',
                color: {
                  a: 1,
                  b: 0.30980393290519714,
                  g: 0.30980393290519714,
                  r: 0.30980393290519714
                },
                type: 'SOLID'
              }
            ],
            id: '2605:56',
            name: 'Gray 1',
            strokeAlign: 'INSIDE',
            strokeWeight: 1,
            strokes: [],
            styles: {
              fill: '1:102'
            },
            type: 'RECTANGLE'
          },
          {
            absoluteBoundingBox: {
              height: 40,
              width: 100,
              x: 188,
              y: 122
            },
            blendMode: 'PASS_THROUGH',
            constraints: {
              horizontal: 'LEFT',
              vertical: 'TOP'
            },
            effects: [],
            fills: [
              {
                blendMode: 'NORMAL',
                color: {
                  a: 1,
                  b: 0.5098039507865906,
                  g: 0.5098039507865906,
                  r: 0.5098039507865906
                },
                type: 'SOLID'
              }
            ],
            id: '2605:55',
            name: 'Gray 2',
            strokeAlign: 'INSIDE',
            strokeWeight: 1,
            strokes: [],
            styles: {
              fill: '1:103'
            },
            type: 'RECTANGLE'
          },
          {
            absoluteBoundingBox: {
              height: 40,
              width: 100,
              x: 188,
              y: 202
            },
            blendMode: 'PASS_THROUGH',
            constraints: {
              horizontal: 'LEFT',
              vertical: 'TOP'
            },
            effects: [],
            fills: [
              {
                blendMode: 'NORMAL',
                color: {
                  a: 1,
                  b: 0.7411764860153198,
                  g: 0.7411764860153198,
                  r: 0.7411764860153198
                },
                type: 'SOLID'
              }
            ],
            id: '2605:54',
            name: 'Gray 3',
            strokeAlign: 'INSIDE',
            strokeWeight: 1,
            strokes: [],
            styles: {
              fill: '1:104'
            },
            type: 'RECTANGLE'
          },
          {
            absoluteBoundingBox: {
              height: 40,
              width: 100,
              x: 188,
              y: 282
            },
            blendMode: 'PASS_THROUGH',
            constraints: {
              horizontal: 'LEFT',
              vertical: 'TOP'
            },
            effects: [],
            fills: [
              {
                blendMode: 'NORMAL',
                color: {
                  a: 1,
                  b: 0.8784313797950745,
                  g: 0.8784313797950745,
                  r: 0.8784313797950745
                },
                type: 'SOLID'
              }
            ],
            id: '2605:53',
            name: 'Gray 4',
            strokeAlign: 'INSIDE',
            strokeWeight: 1,
            strokes: [],
            styles: {
              fill: '1:105'
            },
            type: 'RECTANGLE'
          },
          {
            absoluteBoundingBox: {
              height: 40,
              width: 100,
              x: 188,
              y: 362
            },
            blendMode: 'PASS_THROUGH',
            constraints: {
              horizontal: 'LEFT',
              vertical: 'TOP'
            },
            effects: [],
            fills: [
              {
                blendMode: 'NORMAL',
                color: {
                  a: 1,
                  b: 0.9490196108818054,
                  g: 0.9490196108818054,
                  r: 0.9490196108818054
                },
                type: 'SOLID'
              }
            ],
            id: '2605:52',
            name: 'Gray 5',
            strokeAlign: 'INSIDE',
            strokeWeight: 1,
            strokes: [],
            styles: {
              fill: '1:106'
            },
            type: 'RECTANGLE'
          },
          {
            absoluteBoundingBox: {
              height: 40,
              width: 100,
              x: 328,
              y: 282
            },
            blendMode: 'PASS_THROUGH',
            constraints: {
              horizontal: 'LEFT',
              vertical: 'TOP'
            },
            effects: [],
            fills: [
              {
                blendMode: 'NORMAL',
                color: {
                  a: 1,
                  b: 0.7583333253860474,
                  g: 1,
                  r: 0.893666684627533
                },
                type: 'SOLID'
              }
            ],
            id: '2605:51',
            name: 'Neon',
            strokeAlign: 'INSIDE',
            strokeWeight: 1,
            strokes: []
          },
          {
            absoluteBoundingBox: {
              height: 40,
              width: 100,
              x: 328,
              y: 42
            },
            blendMode: 'PASS_THROUGH',
            constraints: {
              horizontal: 'LEFT',
              vertical: 'TOP'
            },
            effects: [],
            fills: [
              {
                blendMode: 'NORMAL',
                color: {
                  a: 1,
                  b: 0.34117648005485535,
                  g: 0.34117648005485535,
                  r: 0.9215686321258545
                },
                type: 'SOLID'
              }
            ],
            id: '2605:50',
            name: 'Red',
            strokeAlign: 'INSIDE',
            strokeWeight: 1,
            strokes: [],
            styles: {
              fill: '1:110'
            },
            type: 'RECTANGLE'
          },
          {
            absoluteBoundingBox: {
              height: 40,
              width: 100,
              x: 328,
              y: 122
            },
            blendMode: 'PASS_THROUGH',
            constraints: {
              horizontal: 'LEFT',
              vertical: 'TOP'
            },
            effects: [],
            fills: [
              {
                blendMode: 'NORMAL',
                color: {
                  a: 1,
                  b: 0.29019609093666077,
                  g: 0.6000000238418579,
                  r: 0.9490196108818054
                },
                type: 'SOLID'
              }
            ],
            id: '2605:49',
            name: 'Orange',
            strokeAlign: 'INSIDE',
            strokeWeight: 1,
            strokes: [],
            type: 'RECTANGLE'
          },
          {
            absoluteBoundingBox: {
              height: 40,
              width: 100,
              x: 328,
              y: 202
            },
            blendMode: 'PASS_THROUGH',
            constraints: {
              horizontal: 'LEFT',
              vertical: 'TOP'
            },
            effects: [],
            fills: [
              {
                blendMode: 'NORMAL',
                color: {
                  a: 1,
                  b: 0.2980392277240753,
                  g: 0.7882353067398071,
                  r: 0.9490196108818054
                },
                type: 'SOLID'
              }
            ],
            id: '2605:48',
            name: 'Yellow',
            strokeAlign: 'INSIDE',
            strokeWeight: 1,
            strokes: [],
            styles: {
              fill: '1:112'
            },
            type: 'RECTANGLE'
          },
          {
            absoluteBoundingBox: {
              height: 40,
              width: 100,
              x: 468,
              y: 42
            },
            blendMode: 'PASS_THROUGH',
            constraints: {
              horizontal: 'LEFT',
              vertical: 'TOP'
            },
            effects: [],
            fills: [
              {
                blendMode: 'NORMAL',
                color: {
                  a: 1,
                  b: 0.929411768913269,
                  g: 0.501960813999176,
                  r: 0.18431372940540314
                },
                type: 'SOLID'
              }
            ],
            id: '2605:47',
            name: 'Blue 1',
            strokeAlign: 'INSIDE',
            strokeWeight: 1,
            strokes: [],
            styles: {
              fill: '1:113'
            },
            type: 'RECTANGLE'
          },
          {
            absoluteBoundingBox: {
              height: 40,
              width: 100,
              x: 468,
              y: 122
            },
            blendMode: 'PASS_THROUGH',
            constraints: {
              horizontal: 'LEFT',
              vertical: 'TOP'
            },
            effects: [],
            fills: [
              {
                blendMode: 'NORMAL',
                color: {
                  a: 1,
                  b: 0.8588235378265381,
                  g: 0.6117647290229797,
                  r: 0.1764705926179886
                },
                type: 'SOLID'
              }
            ],
            id: '2605:46',
            name: 'Blue 2',
            strokeAlign: 'INSIDE',
            strokeWeight: 1,
            strokes: [],
            styles: {
              fill: '1:114'
            },
            type: 'RECTANGLE'
          },
          {
            absoluteBoundingBox: {
              height: 40,
              width: 100,
              x: 468,
              y: 202
            },
            blendMode: 'PASS_THROUGH',
            constraints: {
              horizontal: 'LEFT',
              vertical: 'TOP'
            },
            effects: [],
            fills: [
              {
                blendMode: 'NORMAL',
                color: {
                  a: 1,
                  b: 0.9490196108818054,
                  g: 0.800000011920929,
                  r: 0.33725491166114807
                },
                type: 'SOLID'
              }
            ],
            id: '2605:45',
            name: 'Blue 3',
            strokeAlign: 'INSIDE',
            strokeWeight: 1,
            strokes: [],
            styles: {
              fill: '1:115'
            },
            type: 'RECTANGLE'
          },
          {
            absoluteBoundingBox: {
              height: 40,
              width: 100,
              x: 608,
              y: 42
            },
            blendMode: 'PASS_THROUGH',
            constraints: {
              horizontal: 'LEFT',
              vertical: 'TOP'
            },
            effects: [],
            fills: [
              {
                blendMode: 'NORMAL',
                color: {
                  a: 1,
                  b: 0.32549020648002625,
                  g: 0.5882353186607361,
                  r: 0.12941177189350128
                },
                type: 'SOLID'
              }
            ],
            id: '2605:44',
            name: 'Green 1',
            strokeAlign: 'INSIDE',
            strokeWeight: 1,
            strokes: [],
            styles: {
              fill: '1:116'
            },
            type: 'RECTANGLE'
          },
          {
            absoluteBoundingBox: {
              height: 40,
              width: 100,
              x: 608,
              y: 122
            },
            blendMode: 'PASS_THROUGH',
            constraints: {
              horizontal: 'LEFT',
              vertical: 'TOP'
            },
            effects: [],
            fills: [
              {
                blendMode: 'NORMAL',
                color: {
                  a: 1,
                  b: 0.3764705955982208,
                  g: 0.6823529601097107,
                  r: 0.15294118225574493
                },
                type: 'SOLID'
              }
            ],
            id: '2605:43',
            name: 'Green 2',
            strokeAlign: 'INSIDE',
            strokeWeight: 1,
            strokes: [],
            styles: {
              fill: '1:117'
            },
            type: 'RECTANGLE'
          },
          {
            absoluteBoundingBox: {
              height: 40,
              width: 100,
              x: 608,
              y: 202
            },
            blendMode: 'PASS_THROUGH',
            constraints: {
              horizontal: 'LEFT',
              vertical: 'TOP'
            },
            effects: [],
            fills: [
              {
                blendMode: 'NORMAL',
                color: {
                  a: 1,
                  b: 0.5921568870544434,
                  g: 0.8117647171020508,
                  r: 0.43529412150382996
                },
                type: 'SOLID'
              }
            ],
            id: '2605:42',
            name: 'Green 3',
            strokeAlign: 'INSIDE',
            strokeWeight: 1,
            strokes: [],
            styles: {
              fill: '1:118'
            },
            type: 'RECTANGLE'
          }
        ],
        clipsContent: true,
        constraints: {
          horizontal: 'LEFT',
          vertical: 'TOP'
        },
        effects: [],
        fills: [
          {
            blendMode: 'NORMAL',
            color: {
              a: 1,
              b: 1,
              g: 1,
              r: 1
            },
            type: 'SOLID'
          }
        ],
        id: '2605:41',
        name: 'Colors',
        strokeAlign: 'INSIDE',
        strokeWeight: 1,
        strokes: [],
        type: 'FRAME'
      }
    });
  });
});
