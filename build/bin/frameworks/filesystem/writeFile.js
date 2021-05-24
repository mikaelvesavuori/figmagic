"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFile = void 0;
const createFolder_1 = require("./createFolder");
const prepareWrite_1 = require("./prepareWrite");
const write_1 = require("./write");
const acceptedFileTypes_1 = require("../system/acceptedFileTypes");
const errors_1 = require("../errors/errors");
function writeFile(writeOperation) {
    try {
        if (!writeOperation)
            throw new Error(errors_1.ErrorWriteFile);
        const { type, file, path, name, format, outputFolderTokens, tokensRelativeImportPrefix, metadata, templates } = writeOperation;
        if (!file || !path || !name || !type)
            throw new Error(errors_1.ErrorWriteFile);
        const TYPE = typeof type === 'string' ? type.toLowerCase() : 'null';
        if (!acceptedFileTypes_1.acceptedFileTypes.includes(TYPE))
            throw new Error(errors_1.ErrorWriteFileWrongType);
        createFolder_1.createFolder(path);
        const prepareWriteOperation = {
            type: TYPE,
            file,
            path,
            name,
            format,
            outputFolderTokens,
            tokensRelativeImportPrefix,
            metadata,
            templates
        };
        const { filePath, fileContent } = prepareWrite_1.prepareWrite(prepareWriteOperation);
        write_1.write(filePath, fileContent);
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.writeFile = writeFile;
//# sourceMappingURL=writeFile.js.map