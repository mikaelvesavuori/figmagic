"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeToken = void 0;
const makeColorTokens_1 = require("./logic/makeColorTokens");
const makeSpacingTokens_1 = require("./logic/makeSpacingTokens");
const makeFontTokens_1 = require("./logic/makeFontTokens");
const makeFontSizeTokens_1 = require("./logic/makeFontSizeTokens");
const makeFontWeightTokens_1 = require("./logic/makeFontWeightTokens");
const makeLineHeightTokens_1 = require("./logic/makeLineHeightTokens");
const makeShadowTokens_1 = require("./logic/makeShadowTokens");
const makeBorderWidthTokens_1 = require("./logic/makeBorderWidthTokens");
const makeRadiusTokens_1 = require("./logic/makeRadiusTokens");
const makeZindexTokens_1 = require("./logic/makeZindexTokens");
const makeLetterSpacingTokens_1 = require("./logic/makeLetterSpacingTokens");
const makeMediaQueryTokens_1 = require("./logic/makeMediaQueryTokens");
const makeOpacityTokens_1 = require("./logic/makeOpacityTokens");
const makeDurationTokens_1 = require("./logic/makeDurationTokens");
const makeDelayTokens_1 = require("./logic/makeDelayTokens");
const makeEasingTokens_1 = require("./logic/makeEasingTokens");
const ignoreElementsKeywords_1 = require("../../frameworks/system/ignoreElementsKeywords");
const errors_1 = require("../../frameworks/errors/errors");
const makeToken = (token, tokenName, config) => new Token(token, tokenName, config);
exports.makeToken = makeToken;
class Token {
    constructor(token, tokenName, config) {
        this.getChildren = (frame) => {
            if (frame.children && frame.children.length > 0) {
                return frame.children.filter((item) => {
                    let shouldInclude = true;
                    for (let i = 0; i < ignoreElementsKeywords_1.ignoreElementsKeywords.length; i++) {
                        const keywordToIgnore = ignoreElementsKeywords_1.ignoreElementsKeywords[i];
                        if (item.name.toLowerCase().indexOf(keywordToIgnore) >= 0) {
                            shouldInclude = false;
                            break;
                        }
                    }
                    return shouldInclude;
                });
            }
        };
        this.getTokens = (frame, name, config) => {
            const tokenOperations = {
                borderwidths: () => makeBorderWidthTokens_1.makeBorderWidthTokens(frame),
                color: () => makeColorTokens_1.makeColorTokens(frame),
                colors: () => makeColorTokens_1.makeColorTokens(frame),
                delays: () => makeDelayTokens_1.makeDelayTokens(frame),
                durations: () => makeDurationTokens_1.makeDurationTokens(frame),
                easings: () => makeEasingTokens_1.makeEasingTokens(frame),
                fontfamilies: () => {
                    if (!config)
                        throw new Error(errors_1.ErrorExtractTokensNoConfig);
                    return makeFontTokens_1.makeFontTokens(frame, config.usePostscriptFontNames);
                },
                fontsizes: () => {
                    if (!config)
                        throw new Error(errors_1.ErrorExtractTokensNoConfig);
                    return makeFontSizeTokens_1.makeFontSizeTokens(frame, config.fontUnit, config.remSize);
                },
                fontweights: () => makeFontWeightTokens_1.makeFontWeightTokens(frame),
                letterspacings: () => {
                    if (!config)
                        throw new Error(errors_1.ErrorExtractTokensNoConfig);
                    return makeLetterSpacingTokens_1.makeLetterSpacingTokens(frame, config.letterSpacingUnit);
                },
                lineheights: () => makeLineHeightTokens_1.makeLineHeightTokens(frame, config.remSize),
                mediaqueries: () => makeMediaQueryTokens_1.makeMediaQueryTokens(frame),
                opacities: () => {
                    if (!config)
                        throw new Error(errors_1.ErrorExtractTokensNoConfig);
                    return makeOpacityTokens_1.makeOpacityTokens(frame, config.opacitiesUnit);
                },
                radii: () => makeRadiusTokens_1.makeRadiusTokens(frame, config.remSize),
                shadows: () => makeShadowTokens_1.makeShadowTokens(frame),
                spacing: () => {
                    if (!config)
                        throw new Error(errors_1.ErrorExtractTokensNoConfig);
                    return makeSpacingTokens_1.makeSpacingTokens(frame, config.spacingUnit, config.remSize);
                },
                spacings: () => {
                    if (!config)
                        throw new Error(errors_1.ErrorExtractTokensNoConfig);
                    return makeSpacingTokens_1.makeSpacingTokens(frame, config.spacingUnit, config.remSize);
                },
                zindices: () => makeZindexTokens_1.makeZindexTokens(frame)
            };
            if (tokenOperations.hasOwnProperty(name))
                return tokenOperations[name]();
        };
        this.setWriteOperation = (processedToken, tokenName) => {
            this.writeOperation = {
                type: 'token',
                file: processedToken,
                path: this.config.outputFolderTokens,
                name: tokenName,
                format: this.config.outputFormatTokens
            };
        };
        this.getWriteOperation = () => {
            if (this.writeOperation)
                return this.writeOperation;
            return null;
        };
        this.token = token;
        this.tokenName = tokenName;
        this.config = config;
        this.writeOperation = null;
        const processedToken = this.extractTokens(this.token, this.tokenName, this.config);
        this.setWriteOperation(processedToken, tokenName);
    }
    extractTokens(frame, tokenName, config) {
        try {
            if (!frame || !tokenName)
                throw new Error(errors_1.ErrorExtractTokens);
            frame.children = this.getChildren(frame);
            return this.getTokens(frame, tokenName.toLowerCase(), config);
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
//# sourceMappingURL=index.js.map