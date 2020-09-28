"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeOpacityTokens = void 0;
const camelize_1 = require("../../../frameworks/string/camelize");
const errors_1 = require("../../../frameworks/errors/errors");
function makeOpacityTokens(opacitiesFrame, opacitiesUnit) {
    if (!opacitiesFrame)
        throw new Error(errors_1.ErrorMakeOpacityTokensNoFrame);
    if (!opacitiesFrame.children)
        throw new Error(errors_1.ErrorMakeOpacityTokensNoChildren);
    const TOKENS = opacitiesFrame.children;
    const opacityTokens = TOKENS.reduce((tokens, item) => {
        if (!item.name)
            throw new Error(errors_1.ErrorMakeOpacityTokensMissingProps);
        const NAME = camelize_1.camelize(item.name);
        const OPACITY = (() => {
            let opacity = 1;
            if (typeof item.opacity !== 'undefined')
                opacity = Math.round(item.opacity * 100) / 100;
            if (opacitiesUnit === 'percent')
                opacity = `${opacity * 100}%`;
            return opacity;
        })();
        tokens[NAME] = OPACITY;
        return tokens;
    }, {});
    return opacityTokens;
}
exports.makeOpacityTokens = makeOpacityTokens;
//# sourceMappingURL=makeOpacityTokens.js.map