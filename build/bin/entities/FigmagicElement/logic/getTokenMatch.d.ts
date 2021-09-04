import { Tokens } from '../../../contracts/Tokens';
import { TokenMatch } from '../../../contracts/TokenMatch';
export declare function getTokenMatch(tokens: Tokens | any, tokenFileName: string, property: string, expectedValue: string | number | Record<string, unknown>, remSize: number): TokenMatch;
