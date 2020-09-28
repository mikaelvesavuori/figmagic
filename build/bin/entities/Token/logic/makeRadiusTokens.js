"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRadiusTokens = void 0;
const camelize_1 = require("../../../frameworks/string/camelize");
const normalizeUnits_1 = require("../../../frameworks/string/normalizeUnits");
const errors_1 = require("../../../frameworks/errors/errors");
function makeRadiusTokens(radiusFrame, remSize) {
    if (!radiusFrame)
        throw new Error(errors_1.ErrorMakeRadiusTokensNoFrame);
    if (!radiusFrame.children)
        throw new Error(errors_1.ErrorMakeRadiusTokensNoChildren);
    const cornerRadii = {};
    const TOKENS = radiusFrame.children;
    TOKENS.forEach((item) => makeRadiusToken(item, cornerRadii, remSize));
    return cornerRadii;
}
exports.makeRadiusTokens = makeRadiusTokens;
function makeRadiusToken(item, cornerRadii, remSize) {
    if (!item.name)
        throw new Error(errors_1.ErrorMakeRadiusTokensMissingProps);
    const NAME = camelize_1.camelize(item.name);
    const CORNER_RADIUS = item.cornerRadius
        ? normalizeUnits_1.normalizeUnits(item.cornerRadius, 'cornerRadius', 'adjustedRadius', remSize)
        : '0px';
    cornerRadii[NAME] = CORNER_RADIUS;
}
//# sourceMappingURL=makeRadiusTokens.js.map