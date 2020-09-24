"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepDescription = exports.prepStorybook = exports.prepCss = exports.prepStyledComponents = exports.prepComponent = void 0;
const loadFile_1 = require("./loadFile");
const messages_1 = require("../messages/messages");
const errors_1 = require("../errors/errors");
exports.prepComponent = (data) => {
    try {
        if (!data)
            throw new Error(errors_1.ErrorPrepFileComponent);
        if (!data.name || !data.filePath || !data.format || !data.templates)
            throw new Error(errors_1.ErrorPrepFileComponent);
        const { name, filePath, format, templates, text, extraProps } = data;
        const SUFFIX = 'Styled';
        const PATH = templates.templatePathReact;
        let template = loadFile_1.loadFile(PATH);
        template = template.replace(/{{NAME}}/gi, name);
        template = template.replace(/{{NAME_STYLED}}/gi, `${name}${SUFFIX}`);
        template = template.replace(/{{EXTRA_PROPS}}/gi, ` ${extraProps}`);
        template = template.replace(/\s>/gi, '>');
        template = template.replace(/{{TEXT}}/gi, text);
        return { fileContent: `${template}`, filePath: `${filePath}.${format}` };
    }
    catch (error) {
        throw new Error(errors_1.ErrorPrepFileComponent);
    }
};
exports.prepStyledComponents = (data) => {
    try {
        if (!data)
            throw new Error(errors_1.ErrorPrepFileStyledComponents);
        if (!data.name || !data.filePath || !data.format || !data.templates || !data.element)
            throw new Error(errors_1.ErrorPrepFileStyledComponents);
        const { name, filePath, format, templates, element } = data;
        const SUFFIX = 'Styled';
        const PATH = templates.templatePathStyled;
        let template = loadFile_1.loadFile(PATH);
        template = template.replace(/{{ELEMENT}}/gi, element);
        template = template.replace(/{{NAME_CSS}}/gi, `${name}Css`);
        template = template.replace(/{{NAME_STYLED}}/gi, `${name}${SUFFIX}`);
        return { fileContent: `${template}`, filePath: `${filePath}${SUFFIX}.${format}` };
    }
    catch (error) {
        throw new Error(errors_1.ErrorPrepFileStyledComponents);
    }
};
exports.prepCss = (data) => {
    try {
        if (!data)
            throw new Error(errors_1.ErrorPrepFileCss);
        if (!data.name || !data.filePath || !data.format || !data.file)
            throw new Error(errors_1.ErrorPrepFileCss);
        const { name, filePath, format, imports, file } = data;
        const SUFFIX = 'Css';
        const FILE_CONTENT = `// ${messages_1.MsgGeneratedFileWarning}\n\n${imports}\nconst ${name}${SUFFIX} = \`${file}\`;\n\nexport default ${name}${SUFFIX};`;
        return { fileContent: FILE_CONTENT, filePath: `${filePath}${SUFFIX}.${format}` };
    }
    catch (error) {
        throw new Error(errors_1.ErrorPrepFileCss);
    }
};
exports.prepStorybook = (data) => {
    try {
        if (!data)
            throw new Error(errors_1.ErrorPrepFileStorybook);
        if (!data.name || !data.filePath || !data.format || !data.templates || !data.text)
            throw new Error(errors_1.ErrorPrepFileStorybook);
        const { name, filePath, format, templates, text } = data;
        const SUFFIX = '.stories';
        const PATH = templates.templatePathStorybook;
        let template = loadFile_1.loadFile(PATH);
        template = template.replace(/{{NAME}}/gi, name);
        template = template.replace(/{{TEXT}}/gi, text);
        return { fileContent: `${template}`, filePath: `${filePath}${SUFFIX}.${format}` };
    }
    catch (error) {
        throw new Error(errors_1.ErrorPrepFileStorybook);
    }
};
exports.prepDescription = (data) => {
    try {
        if (!data)
            throw new Error(errors_1.ErrorPrepFileDescription);
        if (!data.filePath || !data.file || !data.format)
            throw new Error(errors_1.ErrorPrepFileDescription);
        const { filePath, file, format } = data;
        const FILE_CONTENT = `<!--${messages_1.MsgGeneratedFileWarning}-->\n${file}`;
        return { fileContent: FILE_CONTENT, filePath: `${filePath}.description.${format}` };
    }
    catch (error) {
        throw new Error(errors_1.ErrorPrepFileDescription);
    }
};
//# sourceMappingURL=prepFile.js.map