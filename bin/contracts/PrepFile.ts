import { Templates } from './Templates';

export interface PrepComponent {
  name: string;
  filePath: string;
  format: string;
  templates: Templates;
  text: string;
  extraProps: string;
  element: string;
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
  format: string;
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

export interface PrepGraphicComponent {
  name: string;
  filePath: string;
  format: string;
  templates: Templates;
  file: string;
}
