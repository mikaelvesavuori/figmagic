import { ParsedElementMetadataInterface } from '../../../../contracts/ParsedElementMetadataInterface';
import { OutputFormatColors } from '../../../../contracts/Config';
import { Color } from '../../../../contracts/Parsing';
import { Imports } from '../../../../contracts/Imports';
declare type BackgroundColorParams = {
    colors: Color;
    backgroundColor: string;
    remSize: number;
    outputFormatColors: OutputFormatColors;
};
export declare function parseBackgroundColor(css: string, imports: Imports[], params: BackgroundColorParams): ParsedElementMetadataInterface;
export {};
