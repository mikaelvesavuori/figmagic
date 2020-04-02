import { processElements } from '../bin/functions/process/processElements';

import { elementsPage } from '../testdata/elementsPage.mjs';
import { elementsPage2 } from '../testdata/elementsPage2.mjs';
import { groupElements } from '../testdata/groupElements.mjs';
import { components } from '../testdata/components.mjs';

const config = {
  debugMode: false,
  fontUnit: 'rem',
  remSize: 16,
  outputFileName: 'figma.json',
  outputFolderBaseFile: '.figmagic',
  outputFolderTokens: 'tokens',
  outputTokenFormat: 'mjs',
  outputFolderElements: 'elements',
  outputFolderGraphics: 'graphics',
  outputFormatGraphics: 'svg',
  outputScaleGraphics: 1,
  recompileLocal: false,
  spacingUnit: 'rem',
  syncElements: true,
  syncGraphics: false,
  usePostscriptFontNames: true,
  templates: {
    templatePathReact: 'templates/react.jsx',
    templatePathStyled: 'templates/styled.jsx',
    templatePathStorybook: 'templates/story.js'
  },
  skipFileGeneration: {
    react: false,
    styled: false,
    css: false,
    storybook: false,
    description: false,
    forceUpdate: true
  }
};

test('It should throw an error if no parameter is provided', async () => {
  await expect(processElements()).rejects.toThrow();
});

test('It should successfully return a valid element', async () => {
  await expect(processElements(elementsPage, components, config)).resolves.toMatchObject([
    {
      css: ' ',
      description: '\n# Sub\n\nTiny text snippets.',
      element: 'sub',
      extraProps: '',
      html: '<sub></sub>',
      id: '2875:22',
      imports: [],
      name: 'Microcopy',
      text: ''
    }
  ]);
});

test('It should successfully asdfa asdafs', async () => {
  await expect(processElements(elementsPage2, components, config)).resolves.toMatchObject([]);
});
