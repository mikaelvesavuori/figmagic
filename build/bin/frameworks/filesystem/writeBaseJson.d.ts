import { FigmaData } from '../../contracts/FigmaData';
import { RefreshConfig } from '../../contracts/Refresh';
export declare function writeBaseJson(refreshConfig: RefreshConfig, figmaData: string, data: FigmaData | Record<string, unknown>): Promise<void>;
