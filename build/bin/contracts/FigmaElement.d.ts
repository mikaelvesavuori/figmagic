import { FRAME as Frame } from './Figma';
export interface FigmaElement {
    id: string;
    name: string;
    type: string;
    description?: string;
    children?: Frame[];
}
