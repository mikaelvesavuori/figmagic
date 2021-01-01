"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFigmagicElement = void 0;
const parseCssFromElement_1 = require("./logic/parseCssFromElement");
const parseTypographyStylingFromElement_1 = require("./logic/parseTypographyStylingFromElement");
const processNestedCss_1 = require("./logic/processNestedCss");
const messages_1 = require("../../frameworks/messages/messages");
const makeFigmagicElement = (element, config, description = '', isGraphicElement = false) => {
    return new FigmagicElement(element, config, description, isGraphicElement);
};
exports.makeFigmagicElement = makeFigmagicElement;
class FigmagicElement {
    constructor(element, config, description = '', isGraphicElement) {
        this.id = element.id;
        this.name = element.name;
        this.children = element.children;
        this.type = element.type;
        this.config = config;
        this.description = description;
        this.isGraphicElement = isGraphicElement;
        this.element = ``;
        this.css = ``;
        this.html = ``;
        this.extraProps = ``;
        this.text = ``;
        this.imports = [];
        this.init();
    }
    init() {
        this.setElement();
        this.setElementType();
        this.setPlaceholderText();
        this.setText();
        this.setDescription();
        if (!this.isGraphicElement) {
            const { updatedCss, updatedImports } = this.handleElements();
            this.setCss(updatedCss);
            this.imports = [...new Set(updatedImports)];
        }
    }
    handleElements() {
        try {
            const FILTERED_ELEMENTS = this.children.filter((child) => child.name[0] !== '_');
            if (FILTERED_ELEMENTS === null || FILTERED_ELEMENTS === void 0 ? void 0 : FILTERED_ELEMENTS.some((element) => element.type === 'GROUP'))
                return this.handleNestedElements(FILTERED_ELEMENTS);
            else
                return this.handleFlatElements(FILTERED_ELEMENTS);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    setCss(css) {
        this.css = css;
    }
    replaceHtml(match, replacement) {
        this.html = this.html.replace(match, replacement);
    }
    addExtraProps(extraProps) {
        this.extraProps += extraProps;
    }
    setText() {
        var _a;
        const TEXT_CHILD = (_a = this.children) === null || _a === void 0 ? void 0 : _a.filter((c) => c.name === ':text')[0];
        if (TEXT_CHILD && TEXT_CHILD.characters)
            this.text = TEXT_CHILD.characters;
    }
    setElement() {
        const ELEMENT_TYPE = (() => {
            const _ELEMENT = this.description.match(/element=(.*)/);
            if (_ELEMENT && _ELEMENT[1])
                return _ELEMENT[1];
            return 'div';
        })();
        const HTML = `<${ELEMENT_TYPE}>{{TEXT}}</${ELEMENT_TYPE}>`;
        this.html = HTML;
        this.element = ELEMENT_TYPE;
    }
    setDescription() {
        let description = this.description;
        if (this.description.match(/description=(.*)/)) {
            const INDEX = this.description.indexOf('description=');
            const MARKER_LENGTH = 12;
            description = description.slice(INDEX + MARKER_LENGTH, description.length);
            this.description = description;
        }
    }
    setPlaceholderText() {
        var _a;
        const PLACEHOLDER_TEXT_CHILD = (_a = this.children) === null || _a === void 0 ? void 0 : _a.filter((child) => child.name.toLowerCase() === ':placeholder')[0];
        if (PLACEHOLDER_TEXT_CHILD)
            this.addExtraProps(`placeholder="${PLACEHOLDER_TEXT_CHILD.characters}"`);
    }
    setElementType() {
        var _a;
        const TYPE = (_a = this.description.match(/type=(.*)/)) === null || _a === void 0 ? void 0 : _a[0];
        if (TYPE)
            this.addExtraProps(`type="${TYPE.split('type=')[1]}" `);
    }
    handleNestedElements(elements) {
        try {
            let css = ``;
            let imports = [];
            const CHILD_ELEMENTS = elements.filter((el) => el.type === 'GROUP' && el.name[0] !== '_');
            CHILD_ELEMENTS === null || CHILD_ELEMENTS === void 0 ? void 0 : CHILD_ELEMENTS.forEach((variant) => {
                const PARSED_CSS = this.parseNestedCss(variant, this.config);
                css += PARSED_CSS.css;
                imports = imports.concat(PARSED_CSS.imports);
            });
            const PROCESSED_CSS = processNestedCss_1.processNestedCss(css);
            return { updatedCss: PROCESSED_CSS, updatedImports: imports };
        }
        catch (error) {
            throw new Error(error);
        }
    }
    handleFlatElements(elements) {
        try {
            let css = `\n`;
            let imports = [];
            this.replaceHtml('{{TEXT}}', this.text || '');
            const MAIN_ELEMENT = elements === null || elements === void 0 ? void 0 : elements.filter((element) => element.name.toLowerCase() === this.name.toLowerCase())[0];
            const TEXT_ELEMENT = elements === null || elements === void 0 ? void 0 : elements.filter((element) => element.type === 'TEXT')[0];
            if (TEXT_ELEMENT) {
                const { updatedCss, updatedImports } = parseTypographyStylingFromElement_1.parseTypographyStylingFromElement({
                    textElement: TEXT_ELEMENT,
                    remSize: this.config.remSize,
                    usePostscriptFontNames: this.config.usePostscriptFontNames,
                    outputFormatTokens: this.config.outputFormatTokens,
                    letterSpacingUnit: this.config.letterSpacingUnit,
                    outputFolderTokens: this.config.outputFolderTokens
                });
                css += updatedCss;
                imports = imports.concat(updatedImports);
                this.text = TEXT_ELEMENT.characters || '';
            }
            if (MAIN_ELEMENT) {
                const { updatedCss, updatedImports } = this.parseFlatCss(MAIN_ELEMENT, TEXT_ELEMENT);
                const COMBINED_CSS = css + updatedCss;
                const PROCESSED_CSS = this.processFlatCss(COMBINED_CSS);
                css = PROCESSED_CSS;
                imports = imports.concat(updatedImports);
            }
            return { updatedCss: css, updatedImports: imports };
        }
        catch (error) {
            throw new Error(error);
        }
    }
    parseNestedCss(el, config, id) {
        var _a, _b, _c;
        let css = `\n`;
        let imports = [];
        const ID = id || Math.round(Math.random() * 10000);
        const MAIN_ELEMENT = (_a = el.children) === null || _a === void 0 ? void 0 : _a.filter((e) => e.type === 'RECTANGLE' && e.name[0] !== '_')[0];
        const TEXT_ELEMENT = (_b = el.children) === null || _b === void 0 ? void 0 : _b.filter((e) => e.type === 'TEXT' && e.name[0] !== '_')[0];
        if (!MAIN_ELEMENT && !TEXT_ELEMENT)
            throw new Error('Missing both main and text element!');
        const FIXED_NAME = el.name.replace(/\s/gi, '');
        const CHILD_ELEMENTS = (_c = el.children) === null || _c === void 0 ? void 0 : _c.filter((child) => child.type === 'GROUP');
        CHILD_ELEMENTS === null || CHILD_ELEMENTS === void 0 ? void 0 : CHILD_ELEMENTS.forEach((state) => {
            const PARSED_CSS = this.parseNestedCss(state, config, ID);
            css += PARSED_CSS.css;
            imports = imports.concat(PARSED_CSS.imports);
        });
        if (MAIN_ELEMENT) {
            console.log(messages_1.MsgProcessElementsCreatingElement(MAIN_ELEMENT.name, FIXED_NAME));
            const { updatedCss, updatedImports } = parseCssFromElement_1.parseCssFromElement(MAIN_ELEMENT, TEXT_ELEMENT, config.remSize, config.outputFormatTokens, config.outputFolderTokens);
            css += `\n.${FIXED_NAME}__#${ID} {\n${updatedCss}}`;
            imports = imports.concat(updatedImports);
        }
        if (TEXT_ELEMENT) {
            const { updatedCss, updatedImports } = parseTypographyStylingFromElement_1.parseTypographyStylingFromElement({
                textElement: TEXT_ELEMENT,
                remSize: config.remSize,
                usePostscriptFontNames: config.usePostscriptFontNames,
                outputFormatTokens: config.outputFormatTokens,
                letterSpacingUnit: config.letterSpacingUnit,
                outputFolderTokens: config.outputFolderTokens
            });
            css += `\n.${FIXED_NAME}__#${ID} {\n${updatedCss}}`;
            imports = imports.concat(updatedImports);
        }
        return { css, imports };
    }
    parseFlatCss(layoutElement, textElement = null) {
        try {
            let css = ``;
            let imports = [];
            if (layoutElement) {
                const FIXED_NAME = this.name.replace(/\s/gi, '');
                console.log(messages_1.MsgProcessElementsCreatingElement(this.name, FIXED_NAME));
                const { updatedCss, updatedImports } = parseCssFromElement_1.parseCssFromElement(layoutElement, textElement, this.config.remSize, this.config.outputFormatTokens, this.config.outputFolderTokens);
                css += updatedCss;
                imports = imports.concat(updatedImports);
            }
            return { updatedCss: css, updatedImports: imports };
        }
        catch (error) {
            throw new Error(error);
        }
    }
    processFlatCss(css) {
        if (!css)
            throw new Error('Missing CSS string when calling processCss()!');
        let processedCss = Array.from(new Set(css.split(/\n/gi))).toString();
        if (processedCss[0] === ',')
            processedCss = processedCss.slice(1, processedCss.length);
        processedCss = `\n  ` + processedCss;
        processedCss = processedCss.replace(/;,/gi, ';\n  ');
        processedCss += `\n`;
        return processedCss;
    }
}
//# sourceMappingURL=index.js.map