import { Metadata } from './Metadata';
import { Templates } from './Templates';

export type WriteOperation = {
  type: string;
  file: string;
  path: string;
  name: string;
  format: string;
  metadata?: Metadata;
  templates?: Templates;
};

export type GetFileDataOperation = {
  type: string;
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
