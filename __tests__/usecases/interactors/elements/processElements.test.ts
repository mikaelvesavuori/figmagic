import { baseConfig } from '../../../../bin/entities/Config/baseConfig';

import { FRAME as Frame } from '../../../../bin/contracts/Figma';

import { processElements } from '../../../../bin/usecases/interactors/elements/processElements';

import { elementsPage } from '../../../../testdata/elementsPage';
import { components } from '../../../../testdata/components';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    // @ts-ignore
    expect(() => processElements()).toThrowError();
  });
});

describe('Success cases', () => {
  test('It should successfully return a valid element', () => {
    expect(processElements(elementsPage as Frame[], baseConfig, components)).toMatchObject([
      {
        css: `
color: \${colors['black']};
font-size: \${fontSizes['sub']};
font-family: \${fontFamilies['regular']};
font-weight: \${fontWeights['regular']};
line-height: \${lineHeights['xs']};
text-align: left;
`,
        description: '\n\n# Sub\n\nTiny text snippets.',
        element: 'sub',
        extraProps: '',
        html: '<sub></sub>',
        id: '2875:22',
        imports: ['colors', 'fontSizes', 'fontFamilies', 'fontWeights', 'lineHeights'],
        name: 'Microcopy',
        text: 'Microcopy'
      }
    ]);
  });
});
