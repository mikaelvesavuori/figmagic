import { FRAME as Frame } from './Figma';
export interface FigmaData {
    document: Document;
    components?: Record<string, unknown>;
}
declare type Document = {
    id: string;
    name: string;
    type: string;
    children: Frame[];
};
export {};
