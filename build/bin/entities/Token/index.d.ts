import { FRAME as Frame } from '../../contracts/Figma';
import { Config } from '../../contracts/Config';
import { ProcessedToken } from '../../contracts/ProcessedToken';
import { WriteOperation } from '../../contracts/Write';
export declare const makeToken: (token: Frame, tokenName: string, config: Config) => Token;
declare class Token {
    token: Frame;
    tokenName: string;
    config: Config;
    writeOperation: null | WriteOperation;
    constructor(token: Frame, tokenName: string, config: Config);
    private extractTokens;
    private getChildren;
    private getTokens;
    setWriteOperation: (processedToken: ProcessedToken, tokenName: string) => void;
    getWriteOperation: () => WriteOperation | null;
}
export {};
