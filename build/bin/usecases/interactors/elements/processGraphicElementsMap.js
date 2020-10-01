"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processGraphicElementsMap = void 0;
const errors_1 = require("../../../frameworks/errors/errors");
function processGraphicElementsMap(graphics) {
    try {
        if (!graphics)
            throw new Error(errors_1.ErrorProcessGraphicElementsMap);
        if (!(graphics.length > 0))
            throw new Error(errors_1.ErrorProcessGraphicElementsMap);
        let imports = '';
        graphics.forEach((graphic) => {
            imports += `import ${graphic.name} from './${graphic.config.outputFolderElements}/${graphic.name}';\n`;
        });
        imports += '\n';
        let exports = '';
        graphics.forEach((graphic) => {
            exports += `  ${graphic.name},\n`;
        });
        return imports + `export const Graphics = {\n${exports}};\n`;
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.processGraphicElementsMap = processGraphicElementsMap;
//# sourceMappingURL=processGraphicElementsMap.js.map