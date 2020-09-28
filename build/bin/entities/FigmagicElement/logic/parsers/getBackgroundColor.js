"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBackgroundColor = void 0;
const roundColorValue_1 = require("../../../../frameworks/string/roundColorValue");
const errors_1 = require("../../../../frameworks/errors/errors");
function getBackgroundColor(element) {
    if (!element)
        throw new Error(errors_1.ErrorGetBackgroundColor);
    if (!element.fills)
        return null;
    const fills = element.fills.filter((f) => f.type === 'SOLID');
    if (fills.length > 0) {
        if (!fills[0].color)
            throw new Error(errors_1.ErrorGetBackgroundColor);
        const R = roundColorValue_1.roundColorValue(fills[0].color.r);
        const G = roundColorValue_1.roundColorValue(fills[0].color.g);
        const B = roundColorValue_1.roundColorValue(fills[0].color.b);
        const A = roundColorValue_1.roundColorValue(fills[0].color.a, 1);
        return `rgba(${R}, ${G}, ${B}, ${A})`;
    }
    const gradients = element.fills.filter((f) => f.type === 'GRADIENT_LINEAR');
    if (fills.length === 0 && gradients.length > 0) {
        let str = `linear-gradient(`;
        const GRADIENT_STOPS = gradients[0].gradientStops ? gradients[0].gradientStops : null;
        if (!GRADIENT_STOPS)
            throw new Error();
        GRADIENT_STOPS.forEach((fill, index) => {
            const R = roundColorValue_1.roundColorValue(fill.color.r, 255);
            const G = roundColorValue_1.roundColorValue(fill.color.g, 255);
            const B = roundColorValue_1.roundColorValue(fill.color.b, 255);
            const A = roundColorValue_1.roundColorValue(fill.color.a, 255);
            const POS = roundColorValue_1.roundColorValue(fill.position, 100);
            if (index > 0)
                str += ` `;
            str += `rgba(${R}, ${G}, ${B}, ${A}) ${POS}%`;
            if (index < GRADIENT_STOPS.length - 1)
                str += `,`;
            if (index >= GRADIENT_STOPS.length - 1)
                str += `)`;
        });
        return str;
    }
    return null;
}
exports.getBackgroundColor = getBackgroundColor;
//# sourceMappingURL=getBackgroundColor.js.map