import { ParsedElementMetadataInterface } from '../../../../contracts/ParsedElementMetadataInterface';
import { OutputFormatColors } from '../../../../contracts/Config';
import { Imports } from '../../../../contracts/Imports';
declare type BorderRadiusParams = {
    radii: Record<string, unknown>;
    borderRadius: string;
    remSize: number;
    outputFormatColors: OutputFormatColors;
};
export declare function parseBorderRadius(css: string, imports: Imports[], params: BorderRadiusParams): ParsedElementMetadataInterface;
export {};
