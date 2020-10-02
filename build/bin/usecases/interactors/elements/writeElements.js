"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeElements = void 0;
const toPascalCase_1 = require("../../../frameworks/string/toPascalCase");
const writeFile_1 = require("../../../frameworks/filesystem/writeFile");
const checkIfExists_1 = require("../../../frameworks/filesystem/checkIfExists");
const getSvgFileData_1 = require("../../../frameworks/filesystem/getSvgFileData");
const cleanSvgData_1 = require("../../../frameworks/string/cleanSvgData");
const errors_1 = require("../../../frameworks/errors/errors");
function writeElements(elements, config, isGeneratingGraphics = false) {
    try {
        if (!elements || !config)
            throw new Error(errors_1.ErrorWriteElements);
        elements.forEach((element) => {
            const FIXED_CONFIG = makeFixedConfig(element, config);
            if (!config.skipFileGeneration.skipReact) {
                const PATH = `${FIXED_CONFIG.folder}/${FIXED_CONFIG.fixedName}.${FIXED_CONFIG.outputFormatElements}`;
                const TYPE = isGeneratingGraphics ? 'graphic' : 'component';
                writeFileHelper(FIXED_CONFIG, TYPE, config.outputFormatElements, checkIfExists_1.checkIfExists(PATH));
            }
            if (!isGeneratingGraphics) {
                if (!config.skipFileGeneration.skipStorybook) {
                    const PATH = `${FIXED_CONFIG.folder}/${FIXED_CONFIG.fixedName}.stories.${FIXED_CONFIG.outputFormatStorybook}`;
                    writeFileHelper(FIXED_CONFIG, 'story', config.outputFormatStorybook, checkIfExists_1.checkIfExists(PATH));
                }
                if (!config.skipFileGeneration.skipDescription)
                    writeFileHelper(FIXED_CONFIG, 'description', config.outputFormatDescription);
                if (!config.skipFileGeneration.skipStyled) {
                    const PATH = `${FIXED_CONFIG.folder}/${FIXED_CONFIG.fixedName}Styled.${FIXED_CONFIG.outputFormatElements}`;
                    writeFileHelper(FIXED_CONFIG, 'styled', config.outputFormatElements, checkIfExists_1.checkIfExists(PATH));
                }
                if (!config.skipFileGeneration.skipCss)
                    writeFileHelper(FIXED_CONFIG, 'css', config.outputFormatCss);
            }
        });
    }
    catch (error) {
        throw new Error(error);
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
    const outputFormatDescription = config.outputFormatDescription;
    const outputFormatElements = config.outputFormatElements;
    const outputFormatStorybook = config.outputFormatStorybook;
    const outputFolderGraphics = config.outputFolderGraphics;
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
        outputFormatDescription,
        outputFormatElements,
        outputFormatStorybook,
        outputFolderGraphics,
        metadata,
        templates,
        forceUpdate,
        fixedName
    };
};
const writeFileHelper = (config, type, format, fileExists = undefined) => {
    if (fileExists === false || config.forceUpdate) {
        const FILE_DATA = (() => {
            if (type === 'graphic') {
                const SVG_DATA = getSvgFileData_1.getSvgFileData(`./${config.outputFolderGraphics}/${config.name.toLowerCase()}.svg`);
                return cleanSvgData_1.cleanSvgData(SVG_DATA);
            }
            if (type === 'description')
                return config.description;
            if (type === 'css')
                return config.css;
            return config.html;
        })();
        writeFile_1.writeFile({
            type,
            file: FILE_DATA,
            path: config.folder,
            name: config.fixedName,
            format,
            metadata: config.metadata,
            templates: config.templates
        });
    }
};
//# sourceMappingURL=writeElements.js.map