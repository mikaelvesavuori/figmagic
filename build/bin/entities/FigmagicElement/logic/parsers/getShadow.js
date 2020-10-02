"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShadow = void 0;
const roundColorValue_1 = require("../../../../frameworks/string/roundColorValue");
const errors_1 = require("../../../../frameworks/errors/errors");
function getShadow(element) {
    try {
        if (!element)
            throw new Error(errors_1.ErrorGetShadow);
        if (!(element.effects && element.effects[0] && element.effects[0].type === 'DROP_SHADOW'))
            return null;
        const DROP_SHADOW = element.effects[0];
        const X = DROP_SHADOW.offset.x;
        const Y = DROP_SHADOW.offset.y;
        const RADIUS = DROP_SHADOW.radius;
        const R = roundColorValue_1.roundColorValue(DROP_SHADOW.color.r);
        const G = roundColorValue_1.roundColorValue(DROP_SHADOW.color.g);
        const B = roundColorValue_1.roundColorValue(DROP_SHADOW.color.b);
        const A = roundColorValue_1.roundColorValue(DROP_SHADOW.color.a, 1);
        return `${X}px ${Y}px ${RADIUS}px rgba(${R}, ${G}, ${B}, ${A})`;
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.getShadow = getShadow;
//# sourceMappingURL=getShadow.js.map