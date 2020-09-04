import { Metadata } from './Metadata';
import { Templates } from './Templates';

export type WriteOperation = {
  type: 'raw' | 'token' | 'component' | 'style' | 'css' | 'story' | 'description';
  file: string;
  path: string;
  name: string;
  format: string;
  metadata?: Metadata;
  templates?: Templates;
};

export type GetFileDataOperation = {
  type: 'raw' | 'token' | 'component' | 'style' | 'css' | 'story' | 'description';
  file: string;
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
