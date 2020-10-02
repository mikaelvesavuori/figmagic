"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaddingX = void 0;
const errors_1 = require("../../../../frameworks/errors/errors");
function getPaddingX(textElement, element) {
    try {
        if (!textElement || !element)
            return null;
        if (!textElement.absoluteBoundingBox || !element.absoluteBoundingBox)
            throw new Error(errors_1.ErrorGetPaddingX);
        const PARENT_WIDTH = element.absoluteBoundingBox.width;
        const TEXT_WIDTH = textElement.absoluteBoundingBox.width;
        const PADDING_LEFT = textElement.absoluteBoundingBox.x - element.absoluteBoundingBox.x;
        const PADDING_RIGHT = PARENT_WIDTH - (PADDING_LEFT + TEXT_WIDTH);
        return {
            left: Math.round(PADDING_LEFT),
            right: Math.round(PADDING_RIGHT)
        };
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.getPaddingX = getPaddingX;
//# sourceMappingURL=getPaddingX.js.map