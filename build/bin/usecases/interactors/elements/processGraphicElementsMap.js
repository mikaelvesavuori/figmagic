"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processGraphicElementsMap = void 0;
function processGraphicElementsMap(graphics) {
    try {
        if (!graphics)
            throw new Error('TODO');
        if (!(graphics.length > 0))
            throw new Error('TODO');
        let imports = '';
        graphics.forEach((graphic) => {
            console.log('graphic', graphic);
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