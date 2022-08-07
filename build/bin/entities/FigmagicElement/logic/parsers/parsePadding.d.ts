import { ParsedElementMetadataInterface } from '../../../../contracts/ParsedElementMetadataInterface';
import { Imports } from '../../../../contracts/Imports';
declare type PaddingParams = {
    padding: Record<string, unknown>;
    spacing: Record<string, unknown>;
    remSize: number;
};
export declare function parsePadding(css: string, imports: Imports[], params: PaddingParams): ParsedElementMetadataInterface;
export {};
