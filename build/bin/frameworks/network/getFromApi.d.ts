import { ApiResponse } from '../../contracts/ApiResponse';
export declare function getFromApi(figmaToken: string, figmaUrl: string, versionName?: string | null, type?: 'files' | 'images'): Promise<ApiResponse>;
