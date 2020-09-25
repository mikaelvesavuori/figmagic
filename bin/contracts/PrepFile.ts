import { Templates } from './Templates';

export interface PrepComponent {
  name: string;
  filePath: string;
  format: string;
  templates: Templates;
  text: string;
  extraProps: string;
}

export interface PrepStyledComponents {
  name: string;
  filePath: string;
  format: string;
  templates: Templates;
  element: string;
}

export interface PrepCss {
  name: string;
  filePath: string;
  format: 'ts' | 'mjs' | 'js';
  imports: string;
  file: string;
}

export interface PrepStorybook {
  name: string;
  filePath: string;
  format: string;
  templates: Templates;
  text: string;
}

export interface PrepDescription {
  filePath: string;
  file: string;
  format: string;
}
