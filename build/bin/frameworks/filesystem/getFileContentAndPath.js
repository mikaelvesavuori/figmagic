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
        if (!checkIfFieldsExist(getFileContentAndPathOperation))
            throw new Error(errors_1.ErrorGetFileContentAndPathMissingFields);
        const { type, file, path, name, format, text, element, imports, extraProps, metadata, templates } = getFileContentAndPathOperation;
        let filePath = `${path}/${name}`;
        const fileOperations = {
            raw: () => {
                return { fileContent: `${JSON.stringify(file, null, ' ')}`, filePath };
            },
            token: () => {
                if (metadata && metadata.dataType === 'enum')
                    return { fileContent: getTokenEnumString(file, name, format), filePath };
                filePath += `.${format}`;
                return { fileContent: getTokenString(file, name, format), filePath };
            },
            component: () => {
                if (type === 'component' && templates)
                    return prepFile_1.prepComponent({
                        name,
                        filePath,
                        format,
                        templates,
                        text,
                        extraProps,
                        element
                    });
            },
            styled: () => {
                if (type === 'styled' && templates)
                    return prepFile_1.prepStyledComponents({
                        name,
                        filePath,
                        format,
                        templates,
                        element
                    });
            },
            story: () => {
                if (type === 'story' && templates)
                    return prepFile_1.prepStorybook({ name, filePath, format, templates, text });
            },
            css: () => prepFile_1.prepCss({ name, filePath, format, imports, file }),
            description: () => prepFile_1.prepDescription({ filePath, file, format }),
            graphic: () => prepFile_1.prepGraphicComponent({
                name,
                filePath,
                format,
                templates,
                file
            })
        };
        if (fileOperations.hasOwnProperty(type))
            return fileOperations[type]();
        else
            throw new Error(errors_1.ErrorGetFileContentAndPathNoReturn);
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.getFileContentAndPath = getFileContentAndPath;
const getTokenEnumString = (file, name, format) => {
    const EXPORT = format === 'js' ? `module.exports = ${name}` : `export default ${name}`;
    return `// ${messages_1.MsgGeneratedFileWarning}\n\nenum ${name} {${createEnumStringOutOfObject_1.createEnumStringOutOfObject(file)}\n}\n\n${EXPORT};`;
};
const getTokenString = (file, name, format) => {
    if (format === 'json')
        return `${JSON.stringify(file, null, ' ')}`;
    const EXPORT = format === 'js' ? `module.exports = ${name}` : `export default ${name}`;
    return `// ${messages_1.MsgGeneratedFileWarning}\n\nconst ${name} = ${JSON.stringify(file, null, ' ')}\n\n${EXPORT};`;
};
const checkIfFieldsExist = (getFileContentAndPathOperation) => {
    if (!getFileContentAndPathOperation.type ||
        !getFileContentAndPathOperation.file ||
        !getFileContentAndPathOperation.path ||
        !getFileContentAndPathOperation.name ||
        !getFileContentAndPathOperation.format ||
        !getFileContentAndPathOperation.element)
        return false;
    return true;
};
//# sourceMappingURL=getFileContentAndPath.js.map