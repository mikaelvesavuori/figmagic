"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateParsing = exports.parseShadow = exports.getShadow = exports.parseBorderRadius = exports.parseBorderColor = exports.getBorderColor = exports.parseBorderWidth = exports.parseBackgroundColor = exports.getBackgroundColor = exports.parseHeight = exports.parsePadding = exports.getPaddingX = exports.getPaddingY = void 0;
const getTokenMatch_1 = require("./getTokenMatch");
const roundColorValue_1 = require("../../../frameworks/string/roundColorValue");
const errors_1 = require("../../../frameworks/errors/errors");
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
        throw new Error(errors_1.ErrorGetPaddingY);
    }
}
exports.getPaddingY = getPaddingY;
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
        throw new Error(errors_1.ErrorGetPaddingX);
    }
}
exports.getPaddingX = getPaddingX;
function parsePadding(css, imports, params) {
    try {
        if (!css || !imports || !params)
            throw new Error(errors_1.ErrorParsePadding);
        const { padding, spacing, remSize } = params;
        if (!(padding && Object.keys(padding).length > 0))
            return { css, imports };
        const PADDINGS = Object.values(padding).map((p) => p);
        if (PADDINGS.every((item) => item === 0))
            return updateParsing(css, null, imports, null);
        const { updatedCss, updatedImports } = getTokenMatch_1.getTokenMatch(spacing, 'spacing', 'padding', padding, remSize);
        return updateParsing(css, updatedCss, imports, updatedImports);
    }
    catch (error) {
        throw new Error(errors_1.ErrorParsePadding);
    }
}
exports.parsePadding = parsePadding;
function parseHeight(css, imports, params) {
    try {
        if (!css || !imports || !params)
            throw new Error(errors_1.ErrorParseHeight);
        const { spacing, height, remSize } = params;
        const { updatedCss, updatedImports } = getTokenMatch_1.getTokenMatch(spacing, 'spacing', 'height', height, remSize);
        return updateParsing(css, updatedCss, imports, updatedImports);
    }
    catch (error) {
        throw new Error(errors_1.ErrorParseHeight);
    }
}
exports.parseHeight = parseHeight;
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
function parseBackgroundColor(css, imports, params) {
    try {
        if (!css || !imports || !params)
            throw new Error(errors_1.ErrorParseBackgroundColor);
        const { colors, backgroundColor, remSize } = params;
        const PROPERTY = backgroundColor.includes('gradient') ? 'background' : 'background-color';
        const { updatedCss, updatedImports } = getTokenMatch_1.getTokenMatch(colors, 'colors', PROPERTY, backgroundColor, remSize);
        return updateParsing(css, updatedCss, imports, updatedImports);
    }
    catch (error) {
        throw new Error(errors_1.ErrorParseBackgroundColor);
    }
}
exports.parseBackgroundColor = parseBackgroundColor;
function parseBorderWidth(css, imports, params) {
    try {
        if (!css || !imports || !params)
            throw new Error(errors_1.ErrorParseBorderWidth);
        const { borderWidths, borderWidth, remSize } = params;
        const { updatedCss, updatedImports } = getTokenMatch_1.getTokenMatch(borderWidths, 'borderWidths', 'border-width', borderWidth, remSize);
        return updateParsing(css, updatedCss, imports, updatedImports);
    }
    catch (error) {
        throw new Error(errors_1.ErrorParseBorderWidth);
    }
}
exports.parseBorderWidth = parseBorderWidth;
function getBorderColor(element) {
    if (!element)
        throw new Error(errors_1.ErrorGetBorderColor);
    if (!(element.strokes && element.strokes.length > 0 && element.strokes[0].type === 'SOLID'))
        return null;
    if (!element.strokes[0].color)
        throw new Error('asdf');
    const R = roundColorValue_1.roundColorValue(element.strokes[0].color.r);
    const G = roundColorValue_1.roundColorValue(element.strokes[0].color.g);
    const B = roundColorValue_1.roundColorValue(element.strokes[0].color.b);
    const A = roundColorValue_1.roundColorValue(element.strokes[0].color.a, 1);
    return `rgba(${R}, ${G}, ${B}, ${A})`;
}
exports.getBorderColor = getBorderColor;
function parseBorderColor(css, imports, params) {
    try {
        if (!css || !imports || !params)
            throw new Error(errors_1.ErrorParseBorderColor);
        const { colors, borderColor, remSize } = params;
        const { updatedCss, updatedImports } = getTokenMatch_1.getTokenMatch(colors, 'colors', 'border-color', borderColor, remSize);
        return updateParsing(css, updatedCss, imports, updatedImports);
    }
    catch (error) {
        throw new Error(errors_1.ErrorParseBorderColor);
    }
}
exports.parseBorderColor = parseBorderColor;
function parseBorderRadius(css, imports, params) {
    try {
        if (!css || !imports || !params)
            throw new Error(errors_1.ErrorParseBorderRadius);
        const { radii, borderRadius, remSize } = params;
        const { updatedCss, updatedImports } = getTokenMatch_1.getTokenMatch(radii, 'radii', 'border-radius', borderRadius, remSize);
        return updateParsing(css, updatedCss, imports, updatedImports);
    }
    catch (error) {
        throw new Error(errors_1.ErrorParseBorderRadius);
    }
}
exports.parseBorderRadius = parseBorderRadius;
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
        throw new Error(errors_1.ErrorGetShadow);
    }
}
exports.getShadow = getShadow;
function parseShadow(css, imports, params) {
    try {
        if (!css || !imports || !params)
            throw new Error(errors_1.ErrorParseShadow);
        const { shadows, shadow, remSize } = params;
        const { updatedCss, updatedImports } = getTokenMatch_1.getTokenMatch(shadows, 'shadows', 'box-shadow', shadow, remSize);
        return updateParsing(css, updatedCss, imports, updatedImports);
    }
    catch (error) {
        throw new Error(errors_1.ErrorParseShadow);
    }
}
exports.parseShadow = parseShadow;
function updateParsing(css, updatedCss, imports, updatedImports) {
    try {
        if (!css || !imports)
            throw new Error(errors_1.ErrorUpdateParsing);
        const CSS = updatedCss ? (css += updatedCss) : css;
        const IMPORTS = updatedImports ? updatedImports.forEach((i) => imports.push(i)) : imports;
        return { css: CSS, imports: IMPORTS };
    }
    catch (error) {
        throw new Error(errors_1.ErrorUpdateParsing);
    }
}
exports.updateParsing = updateParsing;
//# sourceMappingURL=parsers.js.map