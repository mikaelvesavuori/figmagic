import { processGraphicElementsMap } from '../../../../bin/usecases/interactors/elements/processGraphicElementsMap';

import { graphicElement } from '../../../../testdata/elements/graphicElement';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      processGraphicElementsMap();
    }).toThrow();
  });

  test('It should throw an error if zero-length array is passed', () => {
    expect(() => {
      // @ts-ignore
      processGraphicElementsMap([]);
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should output a string specifying an import and export block', () => {
    const EXPECTED = `import More from './elements/More';

export const Graphics = {
  More,
};
`;
    // @ts-ignore
    expect(processGraphicElementsMap(graphicElement)).toBe(EXPECTED);
  });
});
