import { GetFileDataOperation, FileContentWithPath } from '../../contracts/Write';
import {
  PrepComponent,
  PrepCss,
  PrepDescription,
  PrepStorybook,
  PrepStyledComponents,
  PrepGraphicComponent
} from '../../contracts/PrepFile';
import { ProcessedToken } from '../../contracts/ProcessedToken';

import {
  prepComponent,
  prepStyledComponents,
  prepCss,
  prepStorybook,
  prepDescription,
  prepGraphicComponent
} from './prepFile';

import { createEnumStringOutOfObject } from '../../frameworks/string/createEnumStringOutOfObject';

import { MsgGeneratedFileWarning } from '../messages/messages';
import {
  ErrorGetFileContentAndPath,
  ErrorGetFileContentAndPathMissingFields,
  ErrorGetFileContentAndPathNoReturn
} from '../errors/errors';

/**
 * Orchestrator to get file content and path, before writing files
 */
export function getFileContentAndPath(
  getFileContentAndPathOperation: GetFileDataOperation
):
  | FileContentWithPath
  | Record<string, string>
  | PrepComponent
  | PrepStyledComponents
  | PrepCss
  | PrepStorybook
  | PrepDescription {
  try {
    if (!getFileContentAndPathOperation) throw Error(ErrorGetFileContentAndPath);
    if (!checkIfFieldsExist(getFileContentAndPathOperation))
      throw Error(ErrorGetFileContentAndPathMissingFields);

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

    const fileOperations = {
      raw: () => {
        return { fileContent: `${JSON.stringify(file, null, ' ')}`, filePath };
      },
      token: () => {
        if (metadata && metadata.dataType === 'enum')
          return { fileContent: getTokenString(file, name, format, metadata.dataType), filePath };
        filePath += `.${format}`;
        return { fileContent: getTokenString(file, name, format), filePath };
      },
      component: () => {
        if (type === 'component' && templates)
          return prepComponent({
            name,
            filePath,
            format,
            templates,
            text,
            extraProps,
            element
          } as PrepComponent);
      },
      styled: () => {
        if (type === 'styled' && templates)
          return prepStyledComponents({
            name,
            filePath,
            format,
            templates,
            element
          } as PrepStyledComponents);
      },
      story: () => {
        if (type === 'story' && templates)
          return prepStorybook({ name, filePath, format, templates, text } as PrepStorybook);
      },
      css: () => prepCss({ name, filePath, format, imports, file } as PrepCss),
      description: () => prepDescription({ filePath, file, format } as PrepDescription),
      graphic: () =>
        prepGraphicComponent({
          name,
          filePath,
          format,
          templates,
          file
        } as PrepGraphicComponent)
    };

    // @ts-ignore
    if (fileOperations.hasOwnProperty(type)) return fileOperations[type]();
    else throw Error(ErrorGetFileContentAndPathNoReturn);
  } catch (error: any) {
    throw Error(error);
  }
}

/**
 * @description Get file data string for tokens using either null/no data type or enum data type
 */
const getTokenString = (
  file: string | ProcessedToken,
  name: string,
  format: string,
  dataType?: string
) => {
  if (format === 'json') return `${JSON.stringify(file, null, ' ')}`;

  const EXPORT = format === 'js' ? `module.exports = ${name}` : `export default ${name}`;

  if (dataType === 'enum') {
    return `// ${MsgGeneratedFileWarning}\n\nenum ${name} {${createEnumStringOutOfObject(
      file
    )}\n}\n\n${EXPORT};`;
  }

  const CONST_ASSERTION = format === 'ts' ? ' as const;' : '';

  return `// ${MsgGeneratedFileWarning}\n\nconst ${name} = ${JSON.stringify(
    file,
    null,
    ' '
  )}${CONST_ASSERTION}\n\n${EXPORT};`;
};

/**
 * @description Validate whether required fields exist on GetFileDataOperation type
 */
const checkIfFieldsExist = (getFileContentAndPathOperation: GetFileDataOperation): boolean => {
  if (
    !getFileContentAndPathOperation.type ||
    !getFileContentAndPathOperation.file ||
    !getFileContentAndPathOperation.path ||
    !getFileContentAndPathOperation.name ||
    !getFileContentAndPathOperation.format ||
    !getFileContentAndPathOperation.element
  )
    return false;
  return true;
};
