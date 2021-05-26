import { FileContentWithPath } from '../../contracts/Write';
import {
  PrepComponent,
  PrepStyledComponents,
  PrepCss,
  PrepStorybook,
  PrepDescription,
  PrepGraphicComponent
} from '../../contracts/PrepFile';

import { loadFile } from './loadFile';

import { checkIfVoidElement } from '../system/checkIfVoidElement';

import { MsgGeneratedFileWarning } from '../messages/messages';
import {
  ErrorPrepFileComponent,
  ErrorPrepFileStyledComponents,
  ErrorPrepFileCss,
  ErrorPrepFileStorybook,
  ErrorPrepFileDescription,
  ErrorPrepFileGraphicComponent
} from '../errors/errors';

/**
 * Prepare component (element) to be written to file
 */
export const prepComponent = (data: PrepComponent): FileContentWithPath => {
  try {
    if (!data) throw new Error(ErrorPrepFileComponent);
    if (!data.name || !data.filePath || !data.format || !data.templates || !data.element)
      throw new Error(ErrorPrepFileComponent);
    const { name, filePath, format, templates, text, extraProps, element } = data;
    const props = extraProps === '' || extraProps === ' ' ? `${extraProps}` : ` ${extraProps}`;

    const SUFFIX = 'Styled';
    const PATH = `${templates.templatePathReact}.${format}`;

    console.log('checkIfVoidElement', checkIfVoidElement(element));

    let template = loadFile(PATH) as string;
    if (checkIfVoidElement(element))
      template = template
        .replace(/{{NAME}}/gi, name)
        .replace('>{children ? children : "{{TEXT}}"}</{{NAME_STYLED}}>', ' />')
        .replace(/{{NAME_STYLED}}/gi, `${name}${SUFFIX}`);
    else
      template = template
        .replace(/{{NAME}}/gi, name)
        .replace(/{{NAME_STYLED}}/gi, `${name}${SUFFIX}`)
        .replace(/\s>/gi, '>')
        .replace(/{{TEXT}}/gi, text !== ' ' ? text : '');

    template = template.replace(/{{EXTRA_PROPS}}/gi, props).replace(' >', '>');

    return { fileContent: `${template}`, filePath: `${filePath}.${format}` };
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Prepare Styled Components-formatted React element to be written to file
 */
export const prepStyledComponents = (data: PrepStyledComponents): FileContentWithPath => {
  try {
    if (!data) throw new Error(ErrorPrepFileStyledComponents);
    if (!data.name || !data.filePath || !data.format || !data.templates || !data.element)
      throw new Error(ErrorPrepFileStyledComponents);

    const { name, filePath, format, templates, element } = data;

    const SUFFIX = 'Styled';
    const PATH = `${templates.templatePathStyled}.${format}`;

    let template = loadFile(PATH) as string;
    template = template
      .replace(/{{NAME}}/gi, name)
      .replace(/{{ELEMENT}}/gi, element)
      .replace(/{{NAME_CSS}}/gi, `${name}Css`)
      .replace(/{{NAME_STYLED}}/gi, `${name}${SUFFIX}`);

    return { fileContent: `${template}`, filePath: `${filePath}${SUFFIX}.${format}` };
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Prepare CSS to be written to file
 */
export const prepCss = (data: PrepCss): FileContentWithPath => {
  try {
    if (!data) throw new Error(ErrorPrepFileCss);
    if (!data.name || !data.filePath || !data.format || !data.file)
      throw new Error(ErrorPrepFileCss);

    const { name, filePath, format, imports, file } = data;

    const SUFFIX = 'Css';
    const FILE_CONTENT = `// ${MsgGeneratedFileWarning}\n\n${imports}\nconst ${name}${SUFFIX} = \`${file}\`;\n\nexport default ${name}${SUFFIX};`;

    return { fileContent: FILE_CONTENT, filePath: `${filePath}${SUFFIX}.${format}` };
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Prepare Storybook data to be written to file
 */
export const prepStorybook = (data: PrepStorybook): FileContentWithPath => {
  try {
    if (!data) throw new Error(ErrorPrepFileStorybook);
    if (!data.name || !data.filePath || !data.format || !data.templates || !data.text)
      throw new Error(ErrorPrepFileStorybook);

    const { name, filePath, format, templates, text } = data;

    const SUFFIX = '.stories';
    const PATH = `${templates.templatePathStorybook}.${format}`;

    let template = loadFile(PATH) as string;
    template = template.replace(/{{NAME}}/gi, name).replace(/{{TEXT}}/gi, text);

    return { fileContent: `${template}`, filePath: `${filePath}${SUFFIX}.${format}` };
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Prepare Markdown description to be written to file
 */
export const prepDescription = (data: PrepDescription): FileContentWithPath => {
  try {
    if (!data) throw new Error(ErrorPrepFileDescription);
    if (!data.filePath || !data.file || !data.format) throw new Error(ErrorPrepFileDescription);

    const { filePath, file, format } = data;

    const FILE_CONTENT = `<!--${MsgGeneratedFileWarning}-->\n${file}`;

    return { fileContent: FILE_CONTENT, filePath: `${filePath}.description.${format}` };
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Prepare graphic component (element) to be written to file
 */
export const prepGraphicComponent = (data: PrepGraphicComponent): FileContentWithPath => {
  try {
    if (!data) throw new Error(ErrorPrepFileGraphicComponent);
    if (!data.name || !data.filePath || !data.format || !data.templates)
      throw new Error(ErrorPrepFileGraphicComponent);
    const { name, filePath, format, templates, file } = data;

    const PATH = `${templates.templatePathGraphic}.${format}`;

    let template = loadFile(PATH) as string;
    template = template
      .replace(/{{NAME}}/gi, name)
      .replace(/\s>/gi, '>')
      .replace(/{{SVG}}/gi, file);

    return { fileContent: `${template}`, filePath: `${filePath}.${format}` };
  } catch (error) {
    throw new Error(error);
  }
};
