import { FRAME as Frame } from '../../../../contracts/Figma';
export declare type PaddingVertical = {
    top: number;
    bottom: number;
};
export declare function getPaddingY(textElement: Frame, element: Frame): PaddingVertical | null;
