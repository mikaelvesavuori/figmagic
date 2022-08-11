import { Metadata } from '../../contracts/Metadata';
export declare const getElement: (metadata?: Metadata) => string;
export declare const getText: (metadata?: Metadata) => string;
export declare const getExtraProps: (metadata?: Metadata) => string;
export declare const getImports: (metadata?: Metadata, outputFolderTokens?: string, tokensRelativeImportPrefix?: string) => string;
