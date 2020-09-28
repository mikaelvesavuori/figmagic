"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCssFromElement = void 0;
const tslib_1 = require("tslib");
const path = tslib_1.__importStar(require("path"));
const getFileContents_1 = require("./getFileContents");
const parsers_1 = require("./parsers");
const errors_1 = require("../../../frameworks/errors/errors");
function parseCssFromElement(layoutElement, textElement, remSize, outputFormatToken, outputFolderTokens) {
    try {
        if (!layoutElement || !remSize || !outputFormatToken || !outputFolderTokens)
            throw new Error(errors_1.ErrorParseCssFromElement);
        const PATH = process.env.IS_TEST ? path.join(`testdata`, `tokens`) : outputFolderTokens;
        const { borderWidths, colors, radii, shadows, spacing } = getFiles(PATH, outputFormatToken);
        let css = `width: 100%;\nbox-sizing: border-box;\nborder: 0;\nborder-style: solid;\n`;
        let imports = [];
        const PADDING_Y = textElement
            ? parsers_1.getPaddingY(textElement, layoutElement)
            : null;
        const PADDING_X = textElement
            ? parsers_1.getPaddingX(textElement, layoutElement)
            : null;
        if (PADDING_Y && PADDING_X) {
            const PADDING = {
                ...PADDING_Y,
                ...PADDING_X
            };
            const PARSED_PADDING = parsers_1.parsePadding(css, imports, {
                padding: PADDING,
                spacing,
                remSize
            });
            css += PARSED_PADDING.css;
            if (PARSED_PADDING.imports)
                imports = imports.concat(PARSED_PADDING.imports);
        }
        const HEIGHT = layoutElement.absoluteBoundingBox
            ? layoutElement.absoluteBoundingBox.height
            : null;
        if (HEIGHT) {
            const parsedValue = parsers_1.parseHeight(css, imports, { spacing, height: HEIGHT, remSize });
            css += parsedValue.css;
            if (parsedValue.imports)
                imports = imports.concat(parsedValue.imports);
        }
        const BACKGROUND_COLOR = parsers_1.getBackgroundColor(layoutElement);
        if (BACKGROUND_COLOR) {
            const parsedValue = parsers_1.parseBackgroundColor(css, imports, {
                colors,
                backgroundColor: BACKGROUND_COLOR,
                remSize
            });
            css += parsedValue.css;
            if (parsedValue.imports)
                imports = imports.concat(parsedValue.imports);
        }
        const BORDER_WIDTH = layoutElement.strokeWeight ? `${layoutElement.strokeWeight}px` : null;
        if (BORDER_WIDTH) {
            const parsedValue = parsers_1.parseBorderWidth(css, imports, {
                borderWidths,
                borderWidth: BORDER_WIDTH,
                remSize
            });
            css += parsedValue.css;
            if (parsedValue.imports)
                imports = imports.concat(parsedValue.imports);
        }
        const BORDER_COLOR = parsers_1.getBorderColor(layoutElement);
        if (BORDER_COLOR) {
            const parsedValue = parsers_1.parseBorderColor(css, imports, {
                colors,
                borderColor: BORDER_COLOR,
                remSize
            });
            css += parsedValue.css;
            if (parsedValue.imports)
                imports = imports.concat(parsedValue.imports);
        }
        const BORDER_RADIUS = layoutElement.cornerRadius ? `${layoutElement.cornerRadius}px` : null;
        if (BORDER_RADIUS) {
            const parsedValue = parsers_1.parseBorderRadius(css, imports, {
                radii,
                borderRadius: BORDER_RADIUS,
                remSize
            });
            css += parsedValue.css;
            if (parsedValue.imports)
                imports = imports.concat(parsedValue.imports);
        }
        const SHADOW = parsers_1.getShadow(layoutElement);
        if (SHADOW) {
            const parsedValue = parsers_1.parseShadow(css, imports, { shadows, shadow: SHADOW, remSize });
            css += parsedValue.css;
            if (parsedValue.imports)
                imports = imports.concat(parsedValue.imports);
        }
        const NEW_CSS = reduceDuplicates(css);
        return { updatedCss: NEW_CSS, updatedImports: imports };
    }
    catch (error) {
        throw new Error(errors_1.ErrorParseCssFromElement);
    }
}
exports.parseCssFromElement = parseCssFromElement;
const reduceDuplicates = (str) => Array.from(new Set(str.split(/;/gi)))
    .toString()
    .replace(/,/gi, ';');
const getFiles = (path, outputFormatToken) => {
    try {
        const borderWidths = getFileContents_1.getFileContents(path, 'borderWidths', outputFormatToken);
        const colors = getFileContents_1.getFileContents(path, 'colors', outputFormatToken);
        const radii = getFileContents_1.getFileContents(path, 'radii', outputFormatToken);
        const shadows = getFileContents_1.getFileContents(path, 'shadows', outputFormatToken);
        const spacing = getFileContents_1.getFileContents(path, 'spacing', outputFormatToken);
        return {
            borderWidths,
            colors,
            radii,
            shadows,
            spacing
        };
    }
    catch (error) {
        throw new Error(errors_1.ErrorGetFiles);
    }
};
//# sourceMappingURL=parseCssFromElement.js.map