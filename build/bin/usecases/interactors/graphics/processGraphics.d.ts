import { FRAME as Frame } from '../../../contracts/Figma';
import { Config } from '../../../contracts/Config';
import { FileList } from '../../../contracts/FileList';
export declare function processGraphics(graphicsPage: Frame[], config: Config): Promise<FileList[]>;
