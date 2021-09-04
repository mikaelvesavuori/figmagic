import { ParsedElementMetadataInterface } from '../../../../contracts/ParsedElementMetadataInterface';
declare type PaddingParams = {
    padding: Record<string, unknown>;
    spacing: Record<string, unknown>;
    remSize: number;
};
export declare function parsePadding(css: string, imports: any[], params: PaddingParams): ParsedElementMetadataInterface;
export {};
