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
