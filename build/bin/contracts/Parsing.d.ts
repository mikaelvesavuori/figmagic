import { JsonFileData } from './Files';
export declare type Color = {
    [key: string]: string;
};
export declare type FileOutput = {
    colors: JsonFileData;
    fontFamilies: JsonFileData;
    fontSizes: JsonFileData;
    fontWeights: JsonFileData;
    letterSpacings: JsonFileData;
    lineHeights: JsonFileData;
};
export declare type PaddingOptions = {
    padding: Padding;
    spacing: Spacing;
    remSize: number;
};
declare type Padding = {
    top: number;
    bottom: number;
    left: number;
    right: number;
};
declare type Spacing = {
    [key: string]: string;
};
export {};
