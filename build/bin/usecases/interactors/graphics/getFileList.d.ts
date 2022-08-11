import { FileList, Id } from '../../../contracts/Files';
import { ApiResponse } from '../../../contracts/ApiResponse';
export declare const getFileList: (response: ApiResponse, ids: Id[], outputFormatGraphics: string) => FileList[];
