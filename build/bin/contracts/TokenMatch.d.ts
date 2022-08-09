import { Imports } from './Imports';
export declare type TokenMatchRaw = {
    css: string;
    imports: Imports[];
};
export declare type TokenMatch = {
    updatedCss: string;
    updatedImports: Imports[];
};
