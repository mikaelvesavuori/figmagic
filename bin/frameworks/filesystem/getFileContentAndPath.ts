import { GetFileDataOperation, FileContentWithPath } from '../../contracts/Write';
import {
  PrepComponent,
  PrepCss,
  PrepDescription,
  PrepStorybook,
  PrepStyledComponents
} from '../../contracts/PrepFile';
import { ProcessedToken } from '../../contracts/ProcessedToken';

import {
  prepComponent,
  prepStyledComponents,
  prepCss,
  prepStorybook,
  prepDescription
} from './prepFile';

import { createEnumStringOutOfObject } from '../../frameworks/string/createEnumStringOutOfObject';

import { MsgGeneratedFileWarning } from '../messages/messages';
import {
  ErrorGetFileContentAndPath,
  ErrorGetFileContentAndPathMissingFields
} from '../errors/errors';

/**
 * Orchestrator to get file content and path, before writing files
 *
 * @param getFileContentAndPathOperation Object type with everything required to start prepping the write operation
 */
export function getFileContentAndPath(
  getFileContentAndPathOperation: GetFileDataOperation
): FileContentWithPath | Record<string, string> {
  try {
    if (!getFileContentAndPathOperation) throw new Error(ErrorGetFileContentAndPath);

    if (
      !getFileContentAndPathOperation.type ||
      !getFileContentAndPathOperation.file ||
      !getFileContentAndPathOperation.path ||
      !getFileContentAndPathOperation.name ||
      !getFileContentAndPathOperation.format ||
      !getFileContentAndPathOperation.element
    )
      throw new Error(ErrorGetFileContentAndPathMissingFields);

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
        return { fileContent: getTokenEnumString(file, name, format), filePath };

      filePath += `.${format}`;
      return { fileContent: getTokenString(file, name, format), filePath };
    }
    // Component
    else if (type === 'component' && templates)
      return prepComponent({
        name,
        filePath,
        format,
        templates,
        text,
        extraProps
      } as PrepComponent);
    // Styled Components
    else if (type === 'style' && templates)
      return prepStyledComponents({
        name,
        filePath,
        format,
        templates,
        element
      } as PrepStyledComponents);
    // CSS
    else if (type === 'css') return prepCss({ name, filePath, format, imports, file } as PrepCss);
    // Storybook
    else if (type === 'story' && templates)
      return prepStorybook({ name, filePath, format, templates, text } as PrepStorybook);
    // Markdown description
    else if (type === 'description')
      return prepDescription({ filePath, file, format } as PrepDescription);
  } catch (error) {
    throw new Error(error);
  }
}

const getTokenEnumString = (file: string | ProcessedToken, name: string, format: string) => {
  const EXPORT = format === 'mjs' ? `export default ${name}` : `module.exports = ${name}`;
  return `// ${MsgGeneratedFileWarning}\n\nenum ${name} {${createEnumStringOutOfObject(
    file
  )}\n}\n\n${EXPORT};`;
};

const getTokenString = (file: string | ProcessedToken, name: string, format: string) => {
  const EXPORT = format === 'mjs' ? `export default ${name}` : `module.exports = ${name}`;
  return `// ${MsgGeneratedFileWarning}\n\nconst ${name} = ${JSON.stringify(
    file,
    null,
    ' '
  )}\n\n${EXPORT};`;
};
