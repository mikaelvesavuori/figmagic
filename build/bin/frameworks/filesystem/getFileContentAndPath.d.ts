import { GetFileDataOperation, FileContentWithPath } from '../../contracts/Write';
import { PrepComponent, PrepCss, PrepDescription, PrepStorybook, PrepStyledComponents } from '../../contracts/PrepFile';
export declare function getFileContentAndPath(getFileContentAndPathOperation: GetFileDataOperation): FileContentWithPath | Record<string, string> | PrepComponent | PrepStyledComponents | PrepCss | PrepStorybook | PrepDescription;
