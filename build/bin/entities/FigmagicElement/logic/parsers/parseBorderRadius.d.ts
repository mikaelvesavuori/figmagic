import { ParsedElementMetadataInterface } from '../../../../contracts/ParsedElementMetadataInterface';
import { OutputFormatColors } from '../../../../contracts/Config';
declare type BorderRadiusParams = {
    radii: Record<string, unknown>;
    borderRadius: string;
    remSize: number;
    outputFormatColors: OutputFormatColors;
};
export declare function parseBorderRadius(css: string, imports: any[], params: BorderRadiusParams): ParsedElementMetadataInterface;
export {};
