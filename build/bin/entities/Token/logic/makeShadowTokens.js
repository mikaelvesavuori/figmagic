"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeShadowTokens = void 0;
const camelize_1 = require("../../../frameworks/string/camelize");
const roundColorValue_1 = require("../../../frameworks/string/roundColorValue");
const errors_1 = require("../../../frameworks/errors/errors");
function makeShadowTokens(shadowFrame) {
    if (!shadowFrame)
        throw new Error(errors_1.ErrorMakeShadowTokensNoFrame);
    if (!shadowFrame.children)
        throw new Error(errors_1.ErrorMakeShadowTokensNoChildren);
    const shadows = {};
    const TOKENS = shadowFrame.children;
    TOKENS.forEach((item) => makeShadowToken(item, shadows));
    return shadows;
}
exports.makeShadowTokens = makeShadowTokens;
function makeShadowToken(item, shadows) {
    if (!item.name || !item.effects)
        throw new Error(errors_1.ErrorMakeShadowTokensMissingProps);
    const NAME = camelize_1.camelize(item.name);
    const EFFECTS = item.effects.map((effect) => {
        if (effect.type === 'DROP_SHADOW')
            return effect;
        return null;
    });
    shadows[NAME] = ``;
    if (EFFECTS.length > 0) {
        EFFECTS.forEach((effect, index) => {
            if (effect) {
                const X = effect.offset.x;
                const Y = effect.offset.y;
                const RADIUS = effect.radius;
                const R = roundColorValue_1.roundColorValue(effect.color.r);
                const G = roundColorValue_1.roundColorValue(effect.color.g);
                const B = roundColorValue_1.roundColorValue(effect.color.b);
                const A = roundColorValue_1.roundColorValue(effect.color.a, 1);
                shadows[NAME] += `${X}px ${Y}px ${RADIUS}px rgba(${R}, ${G}, ${B}, ${A})`;
                if (index !== EFFECTS.length - 1)
                    shadows[NAME] += `, `;
            }
        });
    }
}
//# sourceMappingURL=makeShadowTokens.js.map