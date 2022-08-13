import { Tokens } from '../../../contracts/Tokens';
import { TokenMatch } from '../../../contracts/TokenMatch';
import { OutputFormatColors } from '../../../contracts/Config';
export declare function getTokenMatch(tokens: Tokens, tokenFileName: string, property: string, expectedValue: ExpectedValue, remSize: number, outputFormatColors?: OutputFormatColors): TokenMatch;
declare type ExpectedValue = string | number | Record<string, unknown>;
export {};
