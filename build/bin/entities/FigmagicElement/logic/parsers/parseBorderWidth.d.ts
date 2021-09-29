import { ParsedElementMetadataInterface } from '../../../../contracts/ParsedElementMetadataInterface';
import { OutputFormatColors } from '../../../../contracts/Config';
declare type BorderWidthParams = {
    borderWidths: Record<string, unknown>;
    borderWidth: string;
    remSize: number;
    outputFormatColors: OutputFormatColors;
};
export declare function parseBorderWidth(css: string, imports: any[], params: BorderWidthParams): ParsedElementMetadataInterface;
export {};
