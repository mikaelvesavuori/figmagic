"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaddingY = void 0;
const errors_1 = require("../../../../frameworks/errors/errors");
function getPaddingY(textElement, element) {
    try {
        if (!textElement)
            return null;
        if (!element.absoluteBoundingBox ||
            !element.absoluteBoundingBox.height ||
            !textElement.absoluteBoundingBox ||
            !textElement.absoluteBoundingBox.height)
            throw new Error(errors_1.ErrorGetPaddingY);
        const PARENT_HEIGHT = element.absoluteBoundingBox.height;
        const TEXT_HEIGHT = textElement.absoluteBoundingBox.height;
        const PADDING_TOP = textElement.absoluteBoundingBox.y - element.absoluteBoundingBox.y;
        const PADDING_BOTTOM = PARENT_HEIGHT - (PADDING_TOP + TEXT_HEIGHT);
        return {
            top: Math.round(PADDING_TOP),
            bottom: Math.round(PADDING_BOTTOM)
        };
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.getPaddingY = getPaddingY;
//# sourceMappingURL=getPaddingY.js.map