import { ParsedElementMetadataInterface } from '../../../../contracts/ParsedElementMetadataInterface';
import { OutputFormatColors } from '../../../../contracts/Config';
import { Imports } from '../../../../contracts/Imports';
declare type ShadowParams = {
    shadows: Record<string, string>;
    shadow: string;
    remSize: number;
    outputFormatColors: OutputFormatColors;
};
export declare function parseShadow(css: string, imports: Imports[], params: ShadowParams): ParsedElementMetadataInterface;
export {};
