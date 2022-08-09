import { ParsedElementMetadataInterface } from '../../../../contracts/ParsedElementMetadataInterface';
import { OutputFormatColors } from '../../../../contracts/Config';
import { Imports } from '../../../../contracts/Imports';
declare type BorderWidthParams = {
    borderWidths: Record<string, string | number>;
    borderWidth: string;
    remSize: number;
    outputFormatColors: OutputFormatColors;
};
export declare function parseBorderWidth(css: string, imports: Imports[], params: BorderWidthParams): ParsedElementMetadataInterface;
export {};
