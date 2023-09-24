import { Metadata } from './Metadata';
import { Templates } from './Templates';
import { ProcessedToken } from './ProcessedToken';
import {
  Overwrite,
  OutputFormatCss,
  OutputFormatDescription,
  OutputFormatElements,
  OutputFormatGraphics,
  OutputFormatStorybook,
  OutputFormatTokens
} from './Config';

export type WriteOperation = {
  type: FileType;
  file: string | ProcessedToken;
  path: string;
  name: string;
  format: OutputFormatTokens;
  metadata?: Metadata;
  templates?: Templates;

  description?: string;
  folder?: string;
  outputFormatCss?: OutputFormatCss;
  outputFormatDescription?: OutputFormatDescription;
  outputFormatElements?: OutputFormatElements;
  outputFormatGraphics?: OutputFormatGraphics;
  outputFormatStorybook?: OutputFormatStorybook;
  outputFormatTokens?: OutputFormatTokens;
  outputFolderElements?: string;
  outputFolderGraphics?: string;
  outputFolderTokens?: string;
  overwrite: Overwrite;
  tokensRelativeImportPrefix?: string;
  fixedName?: string;
  forceUpdate?: string;
  css?: string;
  html?: string;
};

export type GetFileDataOperation = {
  type: FileType;
  file: string | ProcessedToken;
  path: string;
  name: string;
  format: OutputFormatTokens;
  text?: string;
  element: string;
  imports?: string;
  extraProps?: string;
  metadata?: Metadata;
  templates?: Templates;
};

export type FileContentWithPath = {
  fileContent: string;
  filePath: string;
};

export type FileType =
  | 'null'
  | 'raw'
  | 'token'
  | 'component'
  | 'styled'
  | 'css'
  | 'story'
  | 'description'
  | 'graphic';

export type FileContentAndPath = {
  fileContent: string;
  filePath: string;
};
