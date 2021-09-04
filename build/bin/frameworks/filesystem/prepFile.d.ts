import { FileContentWithPath } from '../../contracts/Write';
import { PrepComponent, PrepStyledComponents, PrepCss, PrepStorybook, PrepDescription, PrepGraphicComponent } from '../../contracts/PrepFile';
export declare const prepComponent: (data: PrepComponent) => FileContentWithPath;
export declare const prepStyledComponents: (data: PrepStyledComponents) => FileContentWithPath;
export declare const prepCss: (data: PrepCss) => FileContentWithPath;
export declare const prepStorybook: (data: PrepStorybook) => FileContentWithPath;
export declare const prepDescription: (data: PrepDescription) => FileContentWithPath;
export declare const prepGraphicComponent: (data: PrepGraphicComponent) => FileContentWithPath;
