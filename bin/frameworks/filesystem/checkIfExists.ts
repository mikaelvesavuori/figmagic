import * as fs from 'fs';

/**
 * @description Check if a file exists
 */
export const checkIfExists = (path: string): boolean => fs.existsSync(path);
