"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFigmagicElement = void 0;
const parseCssFromElement_1 = require("./logic/parseCssFromElement");
const parseTypographyStylingFromElement_1 = require("./logic/parseTypographyStylingFromElement");
const processNestedCss_1 = require("./logic/processNestedCss");
const messages_1 = require("../../frameworks/messages/messages");
const errors_1 = require("../../frameworks/errors/errors");
exports.makeFigmagicElement = (element, config, description = '') => {
    return new FigmagicElement(element, config, description);
};
class FigmagicElement {
    constructor(element, config, description = '') {
        this.id = element.id;
        this.name = element.name;
        this.children = element.children;
        this.type = element.type;
        this.config = config;
        this.description = description;
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
        this.setDescription();
        const html = ``;
        const extraProps = ``;
        const text = ``;
        const { updatedCss, updatedImports } = this.handleElements();
        this.setCss(updatedCss);
        this.addHtml(html);
        this.addExtraProps(extraProps);
        this.addText(text);
        this.imports = [...new Set(updatedImports)];
    }
    handleElements() {
        try {
            if (this.children?.every((a) => a.type === 'GROUP'))
                return this.handleNestedElements();
            else
                return this.handleFlatElements();
        }
        catch (error) {
            throw new Error(error);
        }
    }
    setCss(css) {
        this.css = css;
    }
    addHtml(html) {
        this.html += html;
    }
    replaceHtml(match, replacement) {
        this.html = this.html.replace(match, replacement);
    }
    addExtraProps(extraProps) {
        this.extraProps += extraProps;
    }
    addText(text) {
        this.text += text;
    }
    setElement() {
        const ELEMENT_TYPE = (() => {
            const _ELEMENT = this.description.match(/element=(.*)/);
            if (_ELEMENT && _ELEMENT[1])
                return _ELEMENT[1];
            return 'div';
        })();
        const HTML = `<${ELEMENT_TYPE}>{{TEXT}}</${ELEMENT_TYPE}>`;
        this.addHtml(HTML);
        this.element = ELEMENT_TYPE;
    }
    setDescription() {
        let description = this.description;
        if (this.description.match(/description=(.*)/)) {
            const INDEX = this.description.indexOf('description=');
            const MARKER_LENGTH = 12;
            description = description.slice(INDEX + MARKER_LENGTH, description.length);
            description.replace(/^\s*\n/gm, '');
            this.description = description;
        }
    }
    setPlaceholderText() {
        this.children?.forEach((child) => {
            if ((child.type === 'TEXT' && child.name.toLowerCase() === 'placeholder') ||
                (child.type === 'TEXT' && child.name.toLowerCase() === ':placeholder')) {
                this.addExtraProps(`placeholder="${child.characters}"`);
            }
        });
    }
    setElementType() {
        if (this.description.match(/type=(.*)/)) {
            const TYPE = (() => {
                const _TYPE = this.description.match(/type=(.*)/);
                if (_TYPE && _TYPE[1])
                    return _TYPE[1];
            })();
            if (this.extraProps && !this.extraProps.includes(`type="${TYPE}`))
                this.addExtraProps(`type="${TYPE}" `);
        }
    }
    handleNestedElements(css = ``) {
        try {
            let imports = [];
            this.children?.forEach((el) => {
                if (!el.name)
                    return;
                if (el.name[0] === '_')
                    return;
                const MAIN_ELEMENT = el.children?.filter((e) => e.type === 'RECTANGLE' && e.name[0] !== '_')[0];
                if (!MAIN_ELEMENT)
                    throw new Error(errors_1.ErrorProcessElementsNoMainElement);
                const TEXT_ELEMENT = el.children?.filter((e) => e.type === 'TEXT' && e.name[0] !== '_')[0];
                this.setPlaceholderText();
                this.setElementType();
                const FIXED_NAME = MAIN_ELEMENT.name.replace(/\s/gi, '');
                console.log(messages_1.MsgProcessElementsCreatingElement(MAIN_ELEMENT.name, FIXED_NAME));
                const { updatedCss, updatedImports } = parseCssFromElement_1.parseCssFromElement(MAIN_ELEMENT, TEXT_ELEMENT, this.config.remSize, this.config.outputFormatTokens, this.config.outputFolderTokens);
                css += `\n.${FIXED_NAME} {\n${updatedCss}}`;
                imports = imports.concat(updatedImports);
                if (TEXT_ELEMENT) {
                    const { updatedCss, updatedImports } = parseTypographyStylingFromElement_1.parseTypographyStylingFromElement({
                        textElement: TEXT_ELEMENT,
                        remSize: this.config.remSize,
                        usePostscriptFontNames: this.config.usePostscriptFontNames,
                        outputFormatTokens: this.config.outputFormatTokens,
                        letterSpacingUnit: this.config.letterSpacingUnit,
                        outputFolderTokens: this.config.outputFolderTokens
                    });
                    css += `\n.${FIXED_NAME} {\n${updatedCss}}`;
                    imports = imports.concat(updatedImports);
                    this.text = TEXT_ELEMENT.characters || '';
                }
            });
            const PROCESSED_CSS = processNestedCss_1.processNestedCss(css);
            return { updatedCss: PROCESSED_CSS, updatedImports: imports };
        }
        catch (error) {
            throw new Error(error);
        }
    }
    handleFlatElements() {
        try {
            let css = `\n`;
            let imports = [];
            const MAIN_ELEMENT = this.children?.filter((element) => element.name === this.name)[0];
            const TEXT_ELEMENT = this.children?.filter((element) => element.type === 'TEXT')[0];
            this.setPlaceholderText();
            this.setElementType();
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
            this.replaceHtml('{{TEXT}}', this.text || '');
            if (MAIN_ELEMENT) {
                const { updatedCss, updatedImports } = this.processCssSelfnamedLayer(MAIN_ELEMENT, TEXT_ELEMENT);
                const COMBINED_CSS = css + updatedCss;
                let processedCss = Array.from(new Set(COMBINED_CSS.split(/\n/gi))).toString();
                processedCss = processedCss.replace(/;,/gi, ';\n ');
                css = processedCss;
                imports = imports.concat(updatedImports);
            }
            return { updatedCss: css, updatedImports: imports };
        }
        catch (error) {
            throw new Error(error);
        }
    }
    processCssSelfnamedLayer(layoutElement, textElement = null) {
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
}
//# sourceMappingURL=index.js.map