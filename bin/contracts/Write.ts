import { Metadata } from './Metadata';
import { Templates } from './Templates';
import { ProcessedToken } from './ProcessedToken';

import {
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
  format: string;
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
  format: string;
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

type FileType =
  | 'raw'
  | 'token'
  | 'component'
  | 'styled'
  | 'css'
  | 'story'
  | 'description'
  | 'graphic';
