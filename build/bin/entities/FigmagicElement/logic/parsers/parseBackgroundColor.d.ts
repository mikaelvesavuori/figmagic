import { ParsedElementMetadataInterface } from '../../../../contracts/ParsedElementMetadataInterface';
declare type BackgroundColorParams = {
    colors: Record<string, unknown>;
    backgroundColor: string;
    remSize: number;
};
export declare function parseBackgroundColor(css: string, imports: any[], params: BackgroundColorParams): ParsedElementMetadataInterface;
export {};
