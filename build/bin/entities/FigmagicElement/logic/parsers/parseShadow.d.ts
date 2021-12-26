import { ParsedElementMetadataInterface } from '../../../../contracts/ParsedElementMetadataInterface';
import { OutputFormatColors } from '../../../../contracts/Config';
declare type ShadowParams = {
    shadows: Record<string, unknown>;
    shadow: string;
    remSize: number;
    outputFormatColors: OutputFormatColors;
};
export declare function parseShadow(css: string, imports: any[], params: ShadowParams): ParsedElementMetadataInterface;
export {};
