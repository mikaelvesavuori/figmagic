import { randomUUID } from 'crypto';

import { FigmaElement } from '../../contracts/FigmaElement';
import { FRAME as Frame } from '../../contracts/Figma';
import { Config } from '../../contracts/Config';
import { Imports, UpdatedCssAndImports } from '../../contracts/Imports';
import { TypographyElement } from '../../contracts/TypographyElement';

import { parseCssFromElement } from './logic/parseCssFromElement';
import { parseTypographyStylingFromElement } from './logic/parseTypographyStylingFromElement';
import { processNestedCss } from './logic/processNestedCss';

import { MsgProcessElementsCreatingElement } from '../../frameworks/messages/messages';

/**
 * @description Factory function to create Figmagic element
 */
export const makeFigmagicElement = (
  element: FigmaElement,
  config: Config,
  description = '',
  isGraphicElement = false
): FigmagicElement => {
  return new FigmagicElement(element, config, description, isGraphicElement);
};

class FigmagicElement {
  id: string;
  name: string;
  children?: Frame[];
  type: string;
  isGraphicElement: boolean;

  config: Config;
  description: string;
  element: string;
  css: string;
  html: string;
  extraProps: string;
  text: string | undefined;
  imports: string[];

  acceptedTypes = ['GROUP', 'FRAME', 'INSTANCE'];

  constructor(element: FigmaElement, config: Config, description = '', isGraphicElement: boolean) {
    // Element
    this.id = element.id;
    this.name = element.name;
    this.children = element.children;
    this.type = element.type;

    // Metadata
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

  init(): void {
    this.setElement();
    this.setElementType();
    this.setPlaceholderText();
    this.setText();
    this.setDescription();

    // Graphic elements only need the scaffolding, not any of the CSS parsing/processing
    if (!this.isGraphicElement) {
      const { updatedCss, updatedImports } = this.handleElements();
      this.setCss(updatedCss);
      // @ts-ignore
      this.imports = [...new Set(updatedImports)];
    }
  }

  /**
   * @description Controller to funnel elements to the correct handler.
   */
  private handleElements(): UpdatedCssAndImports {
    // @ts-ignore
    const filteredElements = this.children.filter((child) => child.name[0] !== '_'); // Filter out hidden elements (using "_")

    // If the remaining elements/layers contain any groups or frames, use the nested elements handler
    if (filteredElements?.some((element: Frame) => this.acceptedTypes.includes(element.type)))
      return this.handleNestedElements(filteredElements);
    else return this.handleFlatElements(filteredElements);
  }

  private setCss(css: string): void {
    this.css = css;
  }

  private replaceHtml(match: string, replacement: string): void {
    this.html = this.html.replace(match, replacement);
  }

  private addExtraProps(extraProps: string): void {
    this.extraProps += extraProps;
  }

  /**
   * @description Try setting Figmagic element text to the
   * characters of an element-root-level layer going by the name ":text".
   */
  private setText(): void {
    const textChild = this.children?.filter((c) => c.name === ':text')[0];
    if (textChild && textChild.characters) this.text = textChild.characters;
  }

  /**
   * @description Set the element type (i.e "div", "input"...).
   */
  private setElement(): void {
    const elementType = (() => {
      const element = this.description.match(/element=(.*)/);
      if (element && element[1]) return element[1];
      return 'div';
    })();

    const html = `<${elementType}>{{TEXT}}</${elementType}>`;
    this.html = html;
    this.element = elementType;
  }

  /**
   * @description Set description for the Figmagic element.
   * This is later output to the description file.
   */
  private setDescription(): void {
    let description = this.description;

    const handleMatch = (regexMatch: RegExpMatchArray | null, currentDescription: string) => {
      const match = regexMatch ? regexMatch[0] : null;
      if (match) return currentDescription.replace(match, '');
      return currentDescription;
    };

    if (description.match(/element=(.*)/)) {
      const regexMatch = description.match(/element=(.*)/);
      description = handleMatch(regexMatch, description);
    }

    if (description.match(/type=(.*)/)) {
      const regexMatch = description.match(/type=(.*)/);
      description = handleMatch(regexMatch, description);
    }

    // Clean up description
    if (description.match(/description=(.*)/)) {
      const regexMatch = description.match(/description=(.*)/);
      description = handleMatch(regexMatch, description);
    }

    this.description = description;
  }

  /**
   * @description Set element's placeholder text value, if we
   * find an element-root-level layer going by the name ":placeholder".
   */
  private setPlaceholderText(): void {
    const placeholderText = this.children?.filter(
      (child: Frame) => child.name.toLowerCase() === ':placeholder'
    )[0];

    if (placeholderText) this.addExtraProps(`placeholder="${placeholderText.characters}"`);
  }

  /**
   * @description Set element type (such as "type=checkbox").
   * This attribute is specified by the designer in Figma's description box.
   */
  private setElementType(): void {
    const type = this.description.match(/type=(.*)/)?.[0];
    if (type) this.addExtraProps(`type="${type.split('type=')[1]}" `);
  }

  /**
   * @description Handle nested, multi-level elements.
   * To correctly calculate elements we need both a
   * "main" (layout) element and a "text" element.
   */
  private handleNestedElements(elements: Frame[]): UpdatedCssAndImports {
    let css = ``;
    let imports: Imports[] = [];

    const childElements = elements.filter(
      (el: Frame) => this.acceptedTypes.includes(el.type) && el.name[0] !== '_'
    );

    const textOnlySubchildren: string[] = [];

    childElements.forEach((childElement: Frame) => {
      const parsedCss = this.parseNestedCss(childElement, this.config);
      css += parsedCss.css;
      imports = imports.concat(parsedCss.imports);

      const subChildElements = childElement.children?.filter((el: Frame) => el.name[0] !== '_');

      if (subChildElements?.every((subChild) => subChild.type === 'TEXT'))
        textOnlySubchildren.push(parsedCss.fixedName);
    });

    return {
      updatedCss: processNestedCss(css, textOnlySubchildren),
      updatedImports: imports
    };
  }

  /**
   * @description Handle flat, single-layer elements.
   * To correctly calculate elements we need both a
   * "main" (layout) element and a "text" element.
   */
  private handleFlatElements(elements: Frame[]): UpdatedCssAndImports {
    let css = `\n`;
    let imports: Imports[] = [];

    this.replaceHtml('{{TEXT}}', this.text || '');

    const mainElement = elements?.filter(
      (element: Frame) => element.name.toLowerCase() === this.name.toLowerCase()
    )[0];
    const textElement = elements?.filter((element: Frame) => element.type === 'TEXT')[0];

    // Set text styling
    if (textElement) {
      const { updatedCss, updatedImports } = parseTypographyStylingFromElement({
        textElement: textElement,
        remSize: this.config.remSize,
        usePostscriptFontNames: this.config.usePostscriptFontNames,
        outputFormatTokens: this.config.outputFormatTokens,
        outputFormatColors: this.config.outputFormatColors,
        letterSpacingUnit: this.config.letterSpacingUnit,
        outputFolderTokens: this.config.outputFolderTokens
      } as TypographyElement);
      css += updatedCss;
      imports = imports.concat(updatedImports);
      this.text = textElement.characters || '';
    }

    if (mainElement) {
      const { updatedCss, updatedImports } = this.parseFlatCss(mainElement, textElement);

      css = this.processFlatCss(css + updatedCss);
      imports = imports.concat(updatedImports);
    }

    return { updatedCss: css, updatedImports: imports };
  }

  /**
   * @description Process CSS for any nested elements
   * (i.e. grouped in groups/frames, in Figma).
   */
  private parseNestedCss(el: Frame, config: Config, id?: string) {
    let css = `\n`;
    let imports: Imports[] = [];
    const ID = id || randomUUID().slice(0, 8);

    const mainElement = el.children?.filter(
      (e: Frame) => e.type === 'RECTANGLE' && e.name[0] !== '_'
    )[0];

    const textElement = el.children?.filter(
      (e: Frame) => e.type === 'TEXT' && e.name[0] !== '_'
    )[0];

    if (!mainElement && !textElement) throw Error('Missing both main and text element!');

    const fixedName = el.name.replace(/\s/gi, '');

    const childElements = el.children?.filter(
      (child: Frame) => this.acceptedTypes.includes(child.type) && child.name[0] !== '_'
    );

    childElements?.forEach((state: Frame) => {
      const PARSED_CSS = this.parseNestedCss(state, config, ID);
      css += PARSED_CSS.css;
      imports = imports.concat(PARSED_CSS.imports);
    });

    if (mainElement) {
      console.log(MsgProcessElementsCreatingElement(mainElement.name, fixedName));

      const { updatedCss, updatedImports } = parseCssFromElement(
        mainElement,
        textElement as any,
        config.remSize,
        config.outputFormatTokens,
        config.outputFolderTokens
      );

      css += `\n.${fixedName}__#${ID} {\n${updatedCss}}`;
      imports = imports.concat(updatedImports);
    }

    if (textElement) {
      const { updatedCss, updatedImports } = parseTypographyStylingFromElement({
        textElement: textElement,
        remSize: config.remSize,
        usePostscriptFontNames: config.usePostscriptFontNames,
        outputFormatTokens: config.outputFormatTokens,
        outputFormatColors: config.outputFormatColors,
        letterSpacingUnit: config.letterSpacingUnit,
        outputFolderTokens: config.outputFolderTokens
      } as TypographyElement);

      css += `\n.${fixedName}__#${ID} {\n${updatedCss}}`;
      imports = imports.concat(updatedImports);
    }

    return { css, imports, fixedName: fixedName };
  }

  /**
   * @description Process CSS for any "flat" elements
   */
  private parseFlatCss(
    layoutElement: Frame,
    textElement: Frame | null = null
  ): UpdatedCssAndImports {
    let css = ``;
    let imports: Imports[] = [];

    if (layoutElement) {
      const fixedName = this.name.replace(/\s/gi, '');
      console.log(MsgProcessElementsCreatingElement(this.name, fixedName));

      const { updatedCss, updatedImports } = parseCssFromElement(
        layoutElement,
        textElement,
        this.config.remSize,
        this.config.outputFormatTokens,
        this.config.outputFolderTokens
      );

      css += updatedCss;
      imports = imports.concat(updatedImports);
    }

    return { updatedCss: css, updatedImports: imports };
  }

  /**
   * @description Process CSS for flat elements
   */
  private processFlatCss(css: string): string {
    if (!css) throw Error('Missing CSS string when calling processCss()!'); // TODO: Add real error

    let processedCss = Array.from(new Set(css.split(/\n/gi))).toString();
    if (processedCss[0] === ',') processedCss = processedCss.slice(1, processedCss.length);
    processedCss = `\n  ` + processedCss;
    processedCss = processedCss.replace(/;,/gi, ';\n  ');
    processedCss += `\n`;

    return processedCss;
  }
}
