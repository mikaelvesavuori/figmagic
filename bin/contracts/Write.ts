import { Metadata } from './Metadata';
import { Templates } from './Templates';
import { ProcessedToken } from './ProcessedToken';

export type WriteOperation = {
  type: 'raw' | 'token' | 'component' | 'style' | 'css' | 'story' | 'description';
  file: string | ProcessedToken;
  path: string;
  name: string;
  format: string;
  metadata?: Metadata;
  templates?: Templates;

  description?: string;
  folder?: string;
  fixedName?: string;
  forceUpdate?: string;
  css?: string;
  html?: string;
};

export type GetFileDataOperation = {
  type: 'raw' | 'token' | 'component' | 'style' | 'css' | 'story' | 'description';
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
