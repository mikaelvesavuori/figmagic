import { FRAME as Frame } from '../../../contracts/Figma';
import { BorderWidthTokens } from '../../../contracts/Tokens';
import { BorderWidthUnit } from '../../../contracts/Config';
export declare function makeBorderWidthTokens(borderWidthFrame: Frame, borderWidthUnit: BorderWidthUnit, remSize: number, camelizeTokenNames?: boolean): BorderWidthTokens;
