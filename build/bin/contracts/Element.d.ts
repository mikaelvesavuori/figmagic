import { FRAME as Frame } from './Figma';
export declare type Element = {
    children: Frame[];
    pageName: string;
    config: any;
    components: any;
    isGeneratingGraphics?: boolean;
};
export declare type GraphicElementsMap = {
    config: any;
    graphics: any;
};
