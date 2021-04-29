import { ParsedElementMetadataInterface } from '../../../../contracts/ParsedElementMetadataInterface';
declare type HeightParams = {
    spacing: Record<string, unknown>;
    height: number;
    remSize: number;
};
export declare function parseHeight(css: string, imports: any[], params: HeightParams): ParsedElementMetadataInterface;
export {};
