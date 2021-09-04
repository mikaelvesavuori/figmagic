import { FRAME as Frame } from '../../../../contracts/Figma';
export declare type PaddingHorizontal = {
    left: number;
    right: number;
};
export declare function getPaddingX(textElement: Frame, element: Frame): PaddingHorizontal | null;
