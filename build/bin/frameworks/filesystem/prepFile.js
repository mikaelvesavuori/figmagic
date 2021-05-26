"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepGraphicComponent = exports.prepDescription = exports.prepStorybook = exports.prepCss = exports.prepStyledComponents = exports.prepComponent = void 0;
const loadFile_1 = require("./loadFile");
const checkIfVoidElement_1 = require("../system/checkIfVoidElement");
const messages_1 = require("../messages/messages");
const errors_1 = require("../errors/errors");
const prepComponent = (data) => {
    try {
        if (!data)
            throw new Error(errors_1.ErrorPrepFileComponent);
        if (!data.name || !data.filePath || !data.format || !data.templates || !data.element)
            throw new Error(errors_1.ErrorPrepFileComponent);
        const { name, filePath, format, templates, text, extraProps, element } = data;
        const props = extraProps === '' || extraProps === ' ' ? `${extraProps}` : ` ${extraProps}`;
        const SUFFIX = 'Styled';
        const PATH = `${templates.templatePathReact}.${format}`;
        console.log('checkIfVoidElement', checkIfVoidElement_1.checkIfVoidElement(element));
        let template = loadFile_1.loadFile(PATH);
        if (checkIfVoidElement_1.checkIfVoidElement(element))
            template = template
                .replace(/{{NAME}}/gi, name)
                .replace('>{children ? children : "{{TEXT}}"}</{{NAME_STYLED}}>', ' />')
                .replace(/{{NAME_STYLED}}/gi, `${name}${SUFFIX}`);
        else
            template = template
                .replace(/{{NAME}}/gi, name)
                .replace(/{{NAME_STYLED}}/gi, `${name}${SUFFIX}`)
                .replace(/\s>/gi, '>')
                .replace(/{{TEXT}}/gi, text !== ' ' ? text : '');
        template = template.replace(/{{EXTRA_PROPS}}/gi, props).replace(' >', '>');
        return { fileContent: `${template}`, filePath: `${filePath}.${format}` };
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.prepComponent = prepComponent;
const prepStyledComponents = (data) => {
    try {
        if (!data)
            throw new Error(errors_1.ErrorPrepFileStyledComponents);
        if (!data.name || !data.filePath || !data.format || !data.templates || !data.element)
            throw new Error(errors_1.ErrorPrepFileStyledComponents);
        const { name, filePath, format, templates, element } = data;
        const SUFFIX = 'Styled';
        const PATH = `${templates.templatePathStyled}.${format}`;
        let template = loadFile_1.loadFile(PATH);
        template = template
            .replace(/{{NAME}}/gi, name)
            .replace(/{{ELEMENT}}/gi, element)
            .replace(/{{NAME_CSS}}/gi, `${name}Css`)
            .replace(/{{NAME_STYLED}}/gi, `${name}${SUFFIX}`);
        return { fileContent: `${template}`, filePath: `${filePath}${SUFFIX}.${format}` };
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.prepStyledComponents = prepStyledComponents;
const prepCss = (data) => {
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
        throw new Error(error);
    }
};
exports.prepCss = prepCss;
const prepStorybook = (data) => {
    try {
        if (!data)
            throw new Error(errors_1.ErrorPrepFileStorybook);
        if (!data.name || !data.filePath || !data.format || !data.templates || !data.text)
            throw new Error(errors_1.ErrorPrepFileStorybook);
        const { name, filePath, format, templates, text } = data;
        const SUFFIX = '.stories';
        const PATH = `${templates.templatePathStorybook}.${format}`;
        let template = loadFile_1.loadFile(PATH);
        template = template.replace(/{{NAME}}/gi, name).replace(/{{TEXT}}/gi, text);
        return { fileContent: `${template}`, filePath: `${filePath}${SUFFIX}.${format}` };
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.prepStorybook = prepStorybook;
const prepDescription = (data) => {
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
        throw new Error(error);
    }
};
exports.prepDescription = prepDescription;
const prepGraphicComponent = (data) => {
    try {
        if (!data)
            throw new Error(errors_1.ErrorPrepFileGraphicComponent);
        if (!data.name || !data.filePath || !data.format || !data.templates)
            throw new Error(errors_1.ErrorPrepFileGraphicComponent);
        const { name, filePath, format, templates, file } = data;
        const PATH = `${templates.templatePathGraphic}.${format}`;
        let template = loadFile_1.loadFile(PATH);
        template = template
            .replace(/{{NAME}}/gi, name)
            .replace(/\s>/gi, '>')
            .replace(/{{SVG}}/gi, file);
        return { fileContent: `${template}`, filePath: `${filePath}.${format}` };
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.prepGraphicComponent = prepGraphicComponent;
//# sourceMappingURL=prepFile.js.map