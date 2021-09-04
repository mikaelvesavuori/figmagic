import { ParsedElementMetadataInterface } from '../../../../contracts/ParsedElementMetadataInterface';
declare type BorderRadiusParams = {
    radii: Record<string, unknown>;
    borderRadius: string;
    remSize: number;
};
export declare function parseBorderRadius(css: string, imports: any[], params: BorderRadiusParams): ParsedElementMetadataInterface;
export {};
