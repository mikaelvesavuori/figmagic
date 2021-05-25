"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createElements = void 0;
const tslib_1 = require("tslib");
const createPage_1 = require("./interactors/common/createPage");
const processElements_1 = require("./interactors/elements/processElements");
const writeElements_1 = require("./interactors/elements/writeElements");
const processGraphicElementsMap_1 = require("./interactors/elements/processGraphicElementsMap");
const writeGraphicElementsMap_1 = require("./interactors/elements/writeGraphicElementsMap");
const refresh_1 = require("../frameworks/filesystem/refresh");
const messages_1 = require("../frameworks/messages/messages");
const errors_1 = require("../frameworks/errors/errors");
function createElements(config, data) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            if (!config || !data)
                throw new Error(errors_1.ErrorCreateElements);
            console.log(messages_1.MsgSyncElements);
        }
        catch (error) {
            throw new Error(error);
        }
        try {
            yield refresh_1.refresh(config.outputFolderElements, false);
            const { components } = data;
            handleElements({
                children: data.document.children,
                pageName: 'Elements',
                config,
                components
            });
            if (config.outputGraphicElements &&
                config.outputFormatGraphics === 'svg' &&
                config.syncGraphics) {
                const GRAPHICS = handleElements({
                    children: data.document.children,
                    pageName: 'Graphics',
                    config,
                    components,
                    isGeneratingGraphics: true
                });
                if (config.outputGraphicElementsMap)
                    handleGraphicElementsMap({ config, graphics: GRAPHICS });
            }
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.createElements = createElements;
function handleElements(element) {
    const { children, pageName, config, components, isGeneratingGraphics } = element;
    const PAGE = createPage_1.createPage(children, pageName);
    const ELEMENTS = processElements_1.processElements(PAGE, config, components, isGeneratingGraphics || false);
    writeElements_1.writeElements(ELEMENTS, config, isGeneratingGraphics);
    return ELEMENTS;
}
function handleGraphicElementsMap(graphicElementsMap) {
    const { config, graphics } = graphicElementsMap;
    const FOLDER = `${config.outputFolderElements}/Graphics`;
    const FILE_PATH = `${FOLDER}/index.${config.outputFormatElements}`;
    const FILE_CONTENT = processGraphicElementsMap_1.processGraphicElementsMap(graphics);
    writeGraphicElementsMap_1.writeGraphicElementsMap(FOLDER, FILE_PATH, FILE_CONTENT);
}
//# sourceMappingURL=createElements.js.map