import { FRAME as Frame } from './Figma';
import { LetterSpacingUnits, OutputFormatTokens } from './Config';
export declare type TypographyElement = {
    letterSpacingUnit: LetterSpacingUnits;
    outputFolderTokens: string;
    outputFormatTokens: OutputFormatTokens;
    remSize: number;
    textElement: Frame;
    usePostscriptFontNames: boolean;
};
