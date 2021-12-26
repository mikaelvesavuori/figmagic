import { ParsedElementMetadataInterface } from '../../../../contracts/ParsedElementMetadataInterface';
import { OutputFormatColors } from '../../../../contracts/Config';
declare type BorderColorParams = {
    colors: Record<string, unknown>;
    borderColor: string;
    remSize: number;
    outputFormatColors: OutputFormatColors;
};
export declare function parseBorderColor(css: string, imports: any[], params: BorderColorParams): ParsedElementMetadataInterface;
export {};
