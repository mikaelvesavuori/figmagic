"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileContentAndPath = void 0;
const prepFile_1 = require("./prepFile");
const createEnumStringOutOfObject_1 = require("../../frameworks/string/createEnumStringOutOfObject");
const messages_1 = require("../messages/messages");
const errors_1 = require("../errors/errors");
function getFileContentAndPath(getFileContentAndPathOperation) {
    try {
        if (!getFileContentAndPathOperation)
            throw new Error(errors_1.ErrorGetFileContentAndPath);
        if (!getFileContentAndPathOperation.type ||
            !getFileContentAndPathOperation.file ||
            !getFileContentAndPathOperation.path ||
            !getFileContentAndPathOperation.name ||
            !getFileContentAndPathOperation.format ||
            !getFileContentAndPathOperation.element)
            throw new Error(errors_1.ErrorGetFileContentAndPathMissingFields);
        const { type, file, path, name, format, text, element, imports, extraProps, metadata, templates } = getFileContentAndPathOperation;
        let filePath = `${path}/${name}`;
        if (type === 'raw')
            return { fileContent: `${JSON.stringify(file, null, ' ')}`, filePath };
        else if (type === 'token') {
            if (metadata && metadata.dataType === 'enum')
                return { fileContent: getTokenEnumString(file, name, format), filePath };
            filePath += `.${format}`;
            return { fileContent: getTokenString(file, name, format), filePath };
        }
        else if (type === 'component' && templates)
            return prepFile_1.prepComponent({
                name,
                filePath,
                format,
                templates,
                text,
                extraProps
            });
        else if (type === 'style' && templates)
            return prepFile_1.prepStyledComponents({
                name,
                filePath,
                format,
                templates,
                element
            });
        else if (type === 'css')
            return prepFile_1.prepCss({ name, filePath, format, imports, file });
        else if (type === 'story' && templates)
            return prepFile_1.prepStorybook({ name, filePath, format, templates, text });
        else if (type === 'description')
            return prepFile_1.prepDescription({ filePath, file, format });
        else
            throw new Error(errors_1.ErrorGetFileContentAndPathNoReturn);
    }
    catch (error) {
        throw new Error(errors_1.ErrorGetFileContentAndPath);
    }
}
exports.getFileContentAndPath = getFileContentAndPath;
const getTokenEnumString = (file, name, format) => {
    const EXPORT = format !== 'js' ? `export default ${name}` : `module.exports = ${name}`;
    return `// ${messages_1.MsgGeneratedFileWarning}\n\nenum ${name} {${createEnumStringOutOfObject_1.createEnumStringOutOfObject(file)}\n}\n\n${EXPORT};`;
};
const getTokenString = (file, name, format) => {
    const EXPORT = format !== 'js' ? `export default ${name}` : `module.exports = ${name}`;
    return `// ${messages_1.MsgGeneratedFileWarning}\n\nconst ${name} = ${JSON.stringify(file, null, ' ')}\n\n${EXPORT};`;
};
//# sourceMappingURL=getFileContentAndPath.js.map