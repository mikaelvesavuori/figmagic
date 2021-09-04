import { ParsedElementMetadataInterface } from '../../../../contracts/ParsedElementMetadataInterface';
declare type BorderWidthParams = {
    borderWidths: Record<string, unknown>;
    borderWidth: string;
    remSize: number;
};
export declare function parseBorderWidth(css: string, imports: any[], params: BorderWidthParams): ParsedElementMetadataInterface;
export {};
