import * as path from 'path';

import { makeFigmagicElement } from '../../../bin/entities/FigmagicElement/index';
import { makeConfiguration } from '../../../bin/entities/Config/index';

import { FRAME as Frame } from '../../../bin/contracts/Figma';

import { nestedSelectElement } from '../../../testdata/elements/nestedSelectElement';
import { flatH1Element } from '../../../testdata/elements/flatH1Element';
import { flatSliderElement } from '../../../testdata/elements/flatSliderElement';

import {
  buttonElement,
  validButtonFigmagicElement
} from '../../../testdata/elements/buttonElement';

describe('Failure cases', () => {
  test('It should throw an error if called without any arguments', () => {
    // @ts-ignore
    expect(() => makeFigmagicElement()).toThrowError();
  });
});

describe('Success cases', () => {
  test('It should return a complete nested Figmagic element ("Button" example) and config when passing in valid token data (colors), configuration, and description', async () => {
    const USER_CONFIG_PATH = path.join(`testdata`, `testConfig`);
    const DESCRIPTION = '\nAn example of a Figmagic element description!';
    const CONFIG = await makeConfiguration(USER_CONFIG_PATH, ...[]);
    CONFIG.token = '***';
    CONFIG.url = '***';
    CONFIG.templates = {
      templatePathGraphic: 'templates/graphic',
      templatePathReact: 'templates/react',
      templatePathStorybook: 'templates/story',
      templatePathStyled: 'templates/styled'
    };

    expect(makeFigmagicElement(buttonElement as Frame, CONFIG, DESCRIPTION)).toMatchObject(
      validButtonFigmagicElement
    );
  });

  test('It should return a nested Figmagic element when passing in valid token data (colors), configuration, and description', async () => {
    const USER_CONFIG_PATH = path.join(`\${process.cwd()}`, `testdata`, `testConfig`);
    const DESCRIPTION = `type=text\n\nAn example of a Figmagic element description!`;
    const CONFIG = await makeConfiguration(USER_CONFIG_PATH, ...[]);

    expect(makeFigmagicElement(nestedSelectElement as Frame, CONFIG, DESCRIPTION)).toMatchObject({
      html: '<div>{{TEXT}}</div>',
      id: '3009:80',
      imports: [
        'spacing',
        'colors',
        'borderWidths',
        'radii',
        'shadows',
        'fontSizes',
        'fontFamilies',
        'fontWeights',
        'lineHeights'
      ],
      text: '',
      type: 'COMPONENT'
    });
  });

  test('It should return a flat Figmagic element (only text element passed in) when passing in valid token data (colors), configuration, and description', async () => {
    const USER_CONFIG_PATH = path.join(`\${process.cwd()}`, `testdata`, `testConfig`);
    const DESCRIPTION = `\nAn example of a Figmagic element description!`;
    const CONFIG = await makeConfiguration(USER_CONFIG_PATH, ...[]);

    expect(makeFigmagicElement(flatH1Element as Frame, CONFIG, DESCRIPTION)).toMatchObject({
      html: '<div></div>',
      id: '2772:26',
      imports: ['colors', 'fontSizes', 'fontFamilies', 'fontWeights', 'lineHeights'],
      text: 'H1 Heading Large',
      type: 'COMPONENT'
    });
  });

  test('It should return a flat Figmagic element (both layout and text element passed in) when passing in valid token data (colors), configuration, and description', async () => {
    const USER_CONFIG_PATH = path.join(`\${process.cwd()}`, `testdata`, `testConfig`);
    const DESCRIPTION = `type=text\n\nAn example of a Figmagic element description!`;
    const CONFIG = await makeConfiguration(USER_CONFIG_PATH, ...[]);

    expect(makeFigmagicElement(flatSliderElement as Frame, CONFIG, DESCRIPTION)).toMatchObject({
      html: '<div></div>',
      id: '3009:105',
      imports: ['colors', 'borderWidths'],
      text: '',
      type: 'COMPONENT'
    });
  });
});
