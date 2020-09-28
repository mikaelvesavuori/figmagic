import * as path from 'path';

import { makeFigmagicElement } from '../../../bin/entities/FigmagicElement/index';
import { makeConfiguration } from '../../../bin/entities/Config/index';

import { FRAME as Frame } from '../../../bin/contracts/Figma';

import { flatSelectElement } from '../../../testdata/elements/flatSelectElement';

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
    const USER_CONFIG_PATH = path.join(`\${process.cwd()}`, `testdata`, `testConfig`);
    const DESCRIPTION =
      'type=text\nplaceholder=Some placeholder text\n\nAn example of a Figmagic element description!';
    const CONFIG = await makeConfiguration(USER_CONFIG_PATH, ...[]);

    expect(makeFigmagicElement(buttonElement as Frame, CONFIG, DESCRIPTION)).toMatchObject(
      validButtonFigmagicElement
    );
  });

  test('It should return a flat Figmagic element when passing in valid token data (colors), configuration, and description', async () => {
    const USER_CONFIG_PATH = path.join(`\${process.cwd()}`, `testdata`, `testConfig`);
    const DESCRIPTION = `type=text\nplaceholder=Some placeholder text\n\nAn example of a Figmagic element description!`;
    const CONFIG = await makeConfiguration(USER_CONFIG_PATH, ...[]);

    expect(makeFigmagicElement(flatSelectElement as Frame, CONFIG, DESCRIPTION)).toMatchObject({
      html: '<div></div>',
      id: '3009:80',
      imports: ['colors', 'spacing', 'borderWidths', 'radii', 'shadows'],
      text: '',
      type: 'COMPONENT'
    });
  });
});
