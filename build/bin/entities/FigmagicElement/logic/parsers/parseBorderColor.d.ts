import { ParsedElementMetadataInterface } from '../../../../contracts/ParsedElementMetadataInterface';
declare type BorderColorParams = {
    colors: Record<string, unknown>;
    borderColor: string;
    remSize: number;
};
export declare function parseBorderColor(css: string, imports: any[], params: BorderColorParams): ParsedElementMetadataInterface;
export {};
