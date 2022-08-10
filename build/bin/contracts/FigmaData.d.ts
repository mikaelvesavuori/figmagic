import { Components, FRAME as Frame } from './Figma';
export interface FigmaData {
    document: Document;
    components: Components;
}
declare type Document = {
    id: string;
    name: string;
    type: string;
    children: Frame[];
};
export {};
