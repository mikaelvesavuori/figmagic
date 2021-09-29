import { ParsedElementMetadataInterface } from '../../../../contracts/ParsedElementMetadataInterface';
import { OutputFormatColors } from '../../../../contracts/Config';
declare type HeightParams = {
    spacing: Record<string, unknown>;
    height: number;
    remSize: number;
    outputFormatColors: OutputFormatColors;
};
export declare function parseHeight(css: string, imports: any[], params: HeightParams): ParsedElementMetadataInterface;
export {};
