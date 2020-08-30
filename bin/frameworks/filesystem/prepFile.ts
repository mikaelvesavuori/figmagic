import { Templates } from '../../app/contracts/Templates';
import { FileContentWithPath } from '../../app/contracts/Write';

import { loadFile } from './loadFile';

import { MsgGeneratedFileWarning } from '../messages/messages';

/**
 * Component prep steps
 *
 * @param templates TODO
 */
export const prepComponent = async (
  fileContent: string,
  name: string,
  filePath: string,
  format: string,
  templates: Templates,
  text: string,
  extraProps: string
): Promise<FileContentWithPath> => {
  const suffix = 'Styled';
  const path = templates.templatePathReact;

  let template = await loadFile(path, true);
  template = template.replace(/{{NAME}}/gi, name);
  template = template.replace(/{{NAME_STYLED}}/gi, `${name}${suffix}`);
  template = template.replace(/{{EXTRA_PROPS}}/gi, extraProps);
  template = template.replace(/\s>/gi, '>'); // Remove any ugly spaces before ending ">"
  template = template.replace(/{{TEXT}}/gi, text);

  fileContent = `${template}`;
  filePath += `.${format}`;

  return { fileContent, filePath };
};

export const prepStyledComponents = async (
  fileContent: string,
  name: string,
  filePath: string,
  format: string,
  templates: Templates,
  element: string
): Promise<FileContentWithPath> => {
  const suffix = 'Styled';
  const path = templates.templatePathStyled;

  let template = await loadFile(path, true);
  template = template.replace(/{{ELEMENT}}/gi, element);
  template = template.replace(/{{NAME_CSS}}/gi, `${name}Css`);
  template = template.replace(/{{NAME_STYLED}}/gi, `${name}${suffix}`);

  fileContent = `${template}`;
  filePath += `${suffix}.${format}`;

  return { fileContent, filePath };
};

export const prepCss = (
  fileContent: string,
  name: string,
  filePath: string,
  format: string,
  imports: any,
  file: string
): FileContentWithPath => {
  const suffix = 'Css';

  fileContent = `// ${MsgGeneratedFileWarning}\n\n${imports}\nconst ${name}${suffix} = \`${file}\`;\n\nexport default ${name}${suffix};`;
  filePath += `${suffix}.${format}`;

  return { fileContent, filePath };
};

export const prepStorybook = async (
  fileContent: string,
  name: string,
  filePath: string,
  format: string,
  templates: Templates,
  text: string
): Promise<FileContentWithPath> => {
  const suffix = '.stories';
  const path = templates.templatePathStorybook;

  let template = await loadFile(path, true);
  template = template.replace(/{{NAME}}/gi, name);
  template = template.replace(/{{TEXT}}/gi, text);
  //template = template.replace(/{{MARKUP}}/gi, MARKUP);
  fileContent = `${template};`;
  filePath += `${suffix}.${format}`;

  return { fileContent, filePath };
};

export const prepDescription = (
  fileContent: string,
  filePath: string,
  file: string,
  format: string
): FileContentWithPath => {
  fileContent = `<!--${MsgGeneratedFileWarning}-->\n${file}`;
  filePath += `.description.${format}`;

  return { fileContent, filePath };
};
