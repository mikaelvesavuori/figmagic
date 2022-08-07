import { ParsedElementMetadataInterface } from '../../../../contracts/ParsedElementMetadataInterface';
import { OutputFormatColors } from '../../../../contracts/Config';
import { Imports } from '../../../../contracts/Imports';
declare type BorderColorParams = {
    colors: Record<string, unknown>;
    borderColor: string;
    remSize: number;
    outputFormatColors: OutputFormatColors;
};
export declare function parseBorderColor(css: string, imports: Imports[], params: BorderColorParams): ParsedElementMetadataInterface;
export {};
