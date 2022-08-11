export type JsonFileData = Record<string, any>;

export type Id = {
  id: string;
  name: string;
};

export type FileList = {
  url: string;
  file: string;
};

export type FileContents = {
  borderWidths: JsonFileData;
  colors: JsonFileData;
  radii: JsonFileData;
  shadows: JsonFileData;
  spacing: JsonFileData;
};
