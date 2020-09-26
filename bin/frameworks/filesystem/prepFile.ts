import { FileContentWithPath } from '../../contracts/Write';
import {
  PrepComponent,
  PrepStyledComponents,
  PrepCss,
  PrepStorybook,
  PrepDescription
} from '../../contracts/PrepFile';

import { loadFile } from './loadFile';

import { MsgGeneratedFileWarning } from '../messages/messages';
import {
  ErrorPrepFileComponent,
  ErrorPrepFileStyledComponents,
  ErrorPrepFileCss,
  ErrorPrepFileStorybook,
  ErrorPrepFileDescription
} from '../errors/errors';

/**
 * Prepare component (element) to be written to file
 */
export const prepComponent = (data: PrepComponent): FileContentWithPath => {
  try {
    if (!data) throw new Error(ErrorPrepFileComponent);
    if (!data.name || !data.filePath || !data.format || !data.templates)
      throw new Error(ErrorPrepFileComponent);
    const { name, filePath, format, templates, text, extraProps } = data;

    const SUFFIX = 'Styled';
    const PATH = `${templates.templatePathReact}.${format}`;

    let template = loadFile(PATH) as string;
    template = template.replace(/{{NAME}}/gi, name);
    template = template.replace(/{{NAME_STYLED}}/gi, `${name}${SUFFIX}`);
    template = template.replace(/{{EXTRA_PROPS}}/gi, ` ${extraProps}`);
    template = template.replace(/\s>/gi, '>');
    template = template.replace(/{{TEXT}}/gi, text);

    return { fileContent: `${template}`, filePath: `${filePath}.${format}` };
  } catch (error) {
    throw new Error(ErrorPrepFileComponent);
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
    template = template.replace(/{{ELEMENT}}/gi, element);
    template = template.replace(/{{NAME_CSS}}/gi, `${name}Css`);
    template = template.replace(/{{NAME_STYLED}}/gi, `${name}${SUFFIX}`);

    return { fileContent: `${template}`, filePath: `${filePath}${SUFFIX}.${format}` };
  } catch (error) {
    throw new Error(ErrorPrepFileStyledComponents);
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
    throw new Error(ErrorPrepFileCss);
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
    template = template.replace(/{{NAME}}/gi, name);
    template = template.replace(/{{TEXT}}/gi, text);

    return { fileContent: `${template}`, filePath: `${filePath}${SUFFIX}.${format}` };
  } catch (error) {
    throw new Error(ErrorPrepFileStorybook);
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
    throw new Error(ErrorPrepFileDescription);
  }
};
