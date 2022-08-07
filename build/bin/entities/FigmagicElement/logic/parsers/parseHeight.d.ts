import { ParsedElementMetadataInterface } from '../../../../contracts/ParsedElementMetadataInterface';
import { OutputFormatColors } from '../../../../contracts/Config';
import { Imports } from '../../../../contracts/Imports';
declare type HeightParams = {
    spacing: Record<string, unknown>;
    height: number;
    remSize: number;
    outputFormatColors: OutputFormatColors;
};
export declare function parseHeight(css: string, imports: Imports[], params: HeightParams): ParsedElementMetadataInterface;
export {};
