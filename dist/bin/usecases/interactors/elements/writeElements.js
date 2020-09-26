"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeElements = void 0;
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
const toPascalCase_1 = require("../../../frameworks/string/toPascalCase");
const writeFile_1 = require("../../../frameworks/filesystem/writeFile");
const errors_1 = require("../../../frameworks/errors/errors");
function writeElements(elements, config) {
    try {
        if (!elements || !config)
            throw new Error(errors_1.ErrorWriteElements);
        elements.forEach((element) => {
            const FIXED_CONFIG = makeFixedConfig(element, config);
            if (!config.skipFileGeneration.skipReact)
                writeComponent(FIXED_CONFIG);
            if (!config.skipFileGeneration.skipStyled)
                writeStyled(FIXED_CONFIG);
            if (!config.skipFileGeneration.skipCss)
                writeCss(FIXED_CONFIG);
            if (!config.skipFileGeneration.skipStorybook)
                writeStorybook(FIXED_CONFIG);
            if (!config.skipFileGeneration.skipDescription)
                writeDescription(FIXED_CONFIG);
        });
    }
    catch (error) {
        throw new Error(errors_1.ErrorWriteElements);
    }
}
exports.writeElements = writeElements;
const makeFixedConfig = (element, config) => {
    const html = element.html || ' ';
    const css = element.css || ' ';
    const description = element.description || ' ';
    const name = toPascalCase_1.toPascalCase(element.name);
    const folder = `${config.outputFolderElements}/${name}`;
    const outputFormatCss = config.outputFormatCss;
    const outputFormatElements = config.outputFormatElements;
    const metadata = {
        dataType: null,
        html: element.html,
        element: element.element,
        extraProps: element.extraProps,
        text: element.text || ' ',
        imports: element.imports
    };
    const templates = config.templates;
    const forceUpdate = config.skipFileGeneration.forceUpdate;
    const fixedName = name.replace(/\//gi, '');
    return {
        html,
        css,
        description,
        name,
        folder,
        outputFormatCss,
        outputFormatElements,
        metadata,
        templates,
        forceUpdate,
        fixedName
    };
};
const writeComponent = (config) => {
    const FILE_EXISTS = fs.existsSync(`${config.folder}/${config.fixedName}.${config.outputFormatElements}`);
    if (!FILE_EXISTS || config.forceUpdate)
        writeFile_1.writeFile({
            type: 'component',
            file: config.html,
            path: config.folder,
            name: config.fixedName,
            format: config.outputFormatElements,
            metadata: config.metadata,
            templates: config.templates
        });
};
const writeStyled = (config) => {
    const FILE_EXISTS = fs.existsSync(`${config.folder}/${config.fixedName}Styled.${config.outputFormatElements}`);
    if (!FILE_EXISTS || config.forceUpdate)
        writeFile_1.writeFile({
            type: 'style',
            file: config.css,
            path: config.folder,
            name: config.fixedName,
            format: config.outputFormatElements,
            metadata: config.metadata,
            templates: config.templates
        });
};
const writeCss = (config) => {
    writeFile_1.writeFile({
        type: 'css',
        file: config.css,
        path: config.folder,
        name: config.name,
        format: config.outputFormatCss,
        metadata: config.metadata,
        templates: config.templates
    });
};
const writeStorybook = (config) => {
    const FILE_EXISTS = fs.existsSync(`${config.folder}/${config.fixedName}.stories.js`);
    if (!FILE_EXISTS || config.forceUpdate)
        writeFile_1.writeFile({
            type: 'story',
            file: config.css,
            path: config.folder,
            name: config.fixedName,
            format: 'js',
            metadata: config.metadata,
            templates: config.templates
        });
};
const writeDescription = (config) => {
    writeFile_1.writeFile({
        type: 'description',
        file: config.description,
        path: config.folder,
        name: config.name,
        format: 'md',
        metadata: config.metadata,
        templates: config.templates
    });
};
//# sourceMappingURL=writeElements.js.map