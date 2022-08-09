import { ParsedElementMetadataInterface } from '../../../../contracts/ParsedElementMetadataInterface';
import { OutputFormatColors } from '../../../../contracts/Config';
import { Imports } from '../../../../contracts/Imports';
import { Color } from '../../../../contracts/Parsing';
declare type BorderColorParams = {
    colors: Color;
    borderColor: string;
    remSize: number;
    outputFormatColors: OutputFormatColors;
};
export declare function parseBorderColor(css: string, imports: Imports[], params: BorderColorParams): ParsedElementMetadataInterface;
export {};
