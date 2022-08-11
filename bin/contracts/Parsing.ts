import { JsonFileData } from './Files';

export type Color = {
  [key: string]: string;
};

export type FileOutput = {
  colors: JsonFileData;
  fontFamilies: JsonFileData;
  fontSizes: JsonFileData;
  fontWeights: JsonFileData;
  letterSpacings: JsonFileData;
  lineHeights: JsonFileData;
};

export type PaddingOptions = {
  padding: Padding;
  spacing: Spacing;
  remSize: number;
};

type Padding = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

type Spacing = {
  [key: string]: string;
};
