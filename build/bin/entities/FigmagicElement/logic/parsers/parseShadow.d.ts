import { ParsedElementMetadataInterface } from '../../../../contracts/ParsedElementMetadataInterface';
declare type ShadowParams = {
    shadows: Record<string, unknown>;
    shadow: string;
    remSize: number;
};
export declare function parseShadow(css: string, imports: any[], params: ShadowParams): ParsedElementMetadataInterface;
export {};
