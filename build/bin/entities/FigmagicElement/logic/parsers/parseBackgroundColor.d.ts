import { ParsedElementMetadataInterface } from '../../../../contracts/ParsedElementMetadataInterface';
import { OutputFormatColors } from '../../../../contracts/Config';
declare type BackgroundColorParams = {
    colors: Record<string, unknown>;
    backgroundColor: string;
    remSize: number;
    outputFormatColors: OutputFormatColors;
};
export declare function parseBackgroundColor(css: string, imports: any[], params: BackgroundColorParams): ParsedElementMetadataInterface;
export {};
