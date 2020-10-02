"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateParsing = void 0;
const errors_1 = require("../../../../frameworks/errors/errors");
function updateParsing(css, updatedCss, imports, updatedImports) {
    try {
        if (!css || !imports)
            throw new Error(errors_1.ErrorUpdateParsing);
        const CSS = updatedCss ? (css += updatedCss) : css;
        const IMPORTS = updatedImports ? updatedImports.forEach((i) => imports.push(i)) : imports;
        return { css: CSS, imports: IMPORTS };
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.updateParsing = updateParsing;
//# sourceMappingURL=updateParsing.js.map