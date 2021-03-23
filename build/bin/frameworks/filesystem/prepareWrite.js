"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareWrite = void 0;
const getDataHelpers_1 = require("./getDataHelpers");
const getFileContentAndPath_1 = require("../filesystem/getFileContentAndPath");
const errors_1 = require("../errors/errors");
function prepareWrite(writeOperation) {
    try {
        if (!writeOperation)
            throw new Error(errors_1.ErrorWriteFile);
        const { type, file, path, name, format, outputFolderTokens, metadata, templates } = writeOperation;
        if ((type === 'css' || type === 'story' || type === 'component') && !templates)
            throw new Error(errors_1.ErrorPrepareWrite);
        const getFileDataOperation = {
            type,
            file,
            path,
            name: name.replace('/ /g', ''),
            format,
            text: getDataHelpers_1.getText(metadata),
            element: getDataHelpers_1.getElement(metadata),
            imports: getDataHelpers_1.getImports(metadata, outputFolderTokens),
            extraProps: getDataHelpers_1.getExtraProps(metadata),
            metadata,
            templates
        };
        return getFileContentAndPath_1.getFileContentAndPath(getFileDataOperation);
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.prepareWrite = prepareWrite;
//# sourceMappingURL=prepareWrite.js.map