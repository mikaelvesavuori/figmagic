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
import { sanitizeStringPascalCase } from '../string/sanitizeString';

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
  if (!data) throw Error(ErrorPrepFileComponent);
  if (!data.name || !data.filePath || !data.format || !data.templates || !data.element)
    throw Error(ErrorPrepFileComponent);
  const { name, filePath, format, templates, text, extraProps, element } = data;
  const props = extraProps === '' || extraProps === ' ' ? `${extraProps}` : ` ${extraProps}`;

  const suffix = 'Styled';
  const path = `${templates.templatePathReact}.${format}`;

  let template = loadFile(path) as string;
  if (checkIfVoidElement(element))
    template = template
      .replace(/{{NAME}}/gi, name)
      .replace('>{children ? children : "{{TEXT}}"}</{{NAME_STYLED}}>', ' />')
      .replace('>{props.children ? props.children : "{{TEXT}}"}</{{NAME_STYLED}}>', ' />')
      .replace(/{{NAME_STYLED}}/gi, `${name}${suffix}`);
  else
    template = template
      .replace(/{{NAME}}/gi, name)
      .replace(/{{NAME_STYLED}}/gi, `${name}${suffix}`)
      .replace(/\s>/gi, '>')
      .replace(/{{TEXT}}/gi, text !== ' ' ? text : '');

  template = template
    .replace(/{{EXTRA_PROPS}}/gi, props)
    .replace(' >', '>')
    .replace('  ', ' ');

  return { fileContent: `${template}`, filePath: `${filePath}.${format}` };
};

/**
 * Prepare Styled Components-formatted React element to be written to file
 */
export const prepStyledComponents = (data: PrepStyledComponents): FileContentWithPath => {
  if (!data) throw Error(ErrorPrepFileStyledComponents);
  if (!data.name || !data.filePath || !data.format || !data.templates || !data.element)
    throw Error(ErrorPrepFileStyledComponents);

  const { name, filePath, format, templates, element } = data;

  const fixedName = sanitizeStringPascalCase(name);

  const suffix = 'Styled';
  const path = `${templates.templatePathStyled}.${format}`;

  let template = loadFile(path) as string;
  template = template
    .replace(/{{NAME}}/gi, fixedName)
    .replace(/{{ELEMENT}}/gi, element)
    .replace(/{{NAME_CSS}}/gi, `${fixedName}Css`)
    .replace(/{{NAME_STYLED}}/gi, `${fixedName}${suffix}`);

  return { fileContent: `${template}`, filePath: `${filePath}${suffix}.${format}` };
};

/**
 * Prepare CSS to be written to file
 */
export const prepCss = (data: PrepCss): FileContentWithPath => {
  if (!data) throw Error(ErrorPrepFileCss);
  if (!data.name || !data.filePath || !data.format || !data.file) throw Error(ErrorPrepFileCss);

  const { name, filePath, format, imports, file } = data;

  const suffix = 'Css';
  const fileContent = `// ${MsgGeneratedFileWarning}\n\n${imports}\nconst ${name}${suffix} = \`${file}\`;\n\nexport default ${name}${suffix};`;

  return { fileContent: fileContent, filePath: `${filePath}${suffix}.${format}` };
};

/**
 * Prepare Storybook data to be written to file
 */
export const prepStorybook = (data: PrepStorybook): FileContentWithPath => {
  if (!data) throw Error(ErrorPrepFileStorybook);
  if (!data.name || !data.filePath || !data.format || !data.templates || !data.text)
    throw Error(ErrorPrepFileStorybook);

  const { name, filePath, format, templates, text } = data;

  const suffix = '.stories';
  const path = `${templates.templatePathStorybook}.${format}`;

  let template = loadFile(path) as string;
  template = template.replace(/{{NAME}}/gi, name).replace(/{{TEXT}}/gi, text);

  return { fileContent: `${template}`, filePath: `${filePath}${suffix}.${format}` };
};

/**
 * Prepare Markdown description to be written to file
 */
export const prepDescription = (data: PrepDescription): FileContentWithPath => {
  if (!data) throw Error(ErrorPrepFileDescription);
  if (!data.filePath || !data.file || !data.format) throw Error(ErrorPrepFileDescription);

  const { filePath, file, format } = data;

  const fileContent = `<!--${MsgGeneratedFileWarning}-->\n${file}`;

  return { fileContent: fileContent, filePath: `${filePath}.description.${format}` };
};

/**
 * Prepare graphic component (element) to be written to file
 */
export const prepGraphicComponent = (data: PrepGraphicComponent): FileContentWithPath => {
  if (!data) throw Error(ErrorPrepFileGraphicComponent);
  if (!data.name || !data.filePath || !data.format || !data.templates)
    throw Error(ErrorPrepFileGraphicComponent);
  const { name, filePath, format, templates, file } = data;

  const path = `${templates.templatePathGraphic}.${format}`;

  let template = loadFile(path) as string;
  template = template
    .replace(/{{NAME}}/gi, name)
    .replace(/\s>/gi, '>')
    .replace(/{{SVG}}/gi, file);

  return { fileContent: `${template}`, filePath: `${filePath}.${format}` };
};
