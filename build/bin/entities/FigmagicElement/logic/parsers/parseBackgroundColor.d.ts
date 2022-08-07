import { ParsedElementMetadataInterface } from '../../../../contracts/ParsedElementMetadataInterface';
import { OutputFormatColors } from '../../../../contracts/Config';
import { Imports } from '../../../../contracts/Imports';
declare type BackgroundColorParams = {
    colors: Record<string, unknown>;
    backgroundColor: string;
    remSize: number;
    outputFormatColors: OutputFormatColors;
};
export declare function parseBackgroundColor(css: string, imports: Imports[], params: BackgroundColorParams): ParsedElementMetadataInterface;
export {};
