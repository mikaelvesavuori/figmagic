import { GetFileDataOperation } from '../../app/contracts/Write';

import {
  prepComponent,
  prepStyledComponents,
  prepCss,
  prepStorybook,
  prepDescription
} from './prepFile';

import { createEnumStringOutOfObject } from '../../frameworks/string/createEnumStringOutOfObject';

import { MsgGeneratedFileWarning } from '../messages/messages';

/**
 * Orchestrator to get file content and path, before writing files
 *
 * @param getFileContentAndPathOperation Object type with everything required to start prepping the write operation
 */
export async function getFileContentAndPath(
  getFileContentAndPathOperation: GetFileDataOperation
): Promise<any> {
  const {
    type,
    file,
    path,
    name,
    format,
    text,
    element,
    imports,
    extraProps,
    metadata,
    templates
  } = getFileContentAndPathOperation;

  let filePath = `${path}/${name}`;

  // Raw file output
  if (type === 'raw') return { fileContent: `${JSON.stringify(file, null, ' ')}`, filePath };
  // Design token
  else if (type === 'token') {
    if (metadata && metadata.dataType === 'enum')
      return { fileContent: getTokenEnumString(file, name), filePath };

    filePath += `.${format}`;
    return { fileContent: getTokenString(file, name), filePath };
  }
  // Component
  else if (type === 'component' && templates)
    return await prepComponent('', name, filePath, format, templates, text, extraProps);
  // Styled Components
  else if (type === 'style' && templates)
    return await prepStyledComponents('', name, filePath, format, templates, element);
  // CSS
  else if (type === 'css') return prepCss('', name, filePath, format, imports, file);
  // Storybook
  else if (type === 'story' && templates)
    return await prepStorybook('', name, filePath, format, templates, text);
  // Markdown description
  else if (type === 'description') return prepDescription('', filePath, file, format);
}

const getTokenEnumString = (file: string, name: string) =>
  `// ${MsgGeneratedFileWarning}\n\nenum ${name} {${createEnumStringOutOfObject(
    file
  )}\n}\n\nexport default ${name};`;

const getTokenString = (file: string, name: string) =>
  `// ${MsgGeneratedFileWarning}\n\nconst ${name} = ${JSON.stringify(
    file,
    null,
    ' '
  )}\n\nexport default ${name};`;
