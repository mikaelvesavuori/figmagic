import { FigmaElement } from './FigmaElement';
export interface FigmagicElement extends FigmaElement {
    element?: string;
    imports?: string[];
    css?: string;
    html?: string;
    text?: string;
    extraProps?: string;
}
