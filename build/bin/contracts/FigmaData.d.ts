import { Components, FRAME as Frame } from './Figma';
export interface FigmaData {
    document: Document;
    components: Components;
}
export declare type FigmaResponse = {
    document: Document;
    components: Components;
    componentSets: Record<string, any>;
    schemaVersion: number;
    styles: Styles;
    name: string;
    lastModified: string;
    thumbnailUrl: string;
    version: string;
    role: string;
    editorType: string;
    linkAccess: string;
};
declare type Styles = {
    [id: string]: Style;
};
declare type Style = {
    [id: string]: Record<string, any>;
};
declare type Document = {
    id: string;
    name: string;
    type: string;
    children: Frame[];
};
export {};
