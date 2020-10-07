"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processElements = void 0;
const FigmagicElement_1 = require("../../../entities/FigmagicElement");
const errors_1 = require("../../../frameworks/errors/errors");
function processElements(elementsPage, config, components, isGraphicElement = false) {
    try {
        if (!elementsPage || !components || !config)
            throw new Error(errors_1.ErrorProcessElements);
        const FILTERED_ELEMENTS = elementsPage.filter((element) => element.type === 'COMPONENT');
        const PARSED_ELEMENTS = FILTERED_ELEMENTS.map((element) => FigmagicElement_1.makeFigmagicElement(element, config, components[element.id].description, isGraphicElement));
        return PARSED_ELEMENTS;
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.processElements = processElements;
//# sourceMappingURL=processElements.js.map