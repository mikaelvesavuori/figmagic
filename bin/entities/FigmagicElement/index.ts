import { FigmaElement } from '../../contracts/FigmaElement';
import { FRAME as Frame } from '../../contracts/Figma';
import { Config } from '../../contracts/Config';

import { parseCssFromElement } from './logic/parseCssFromElement';

//import { MsgProcessElementsCreatingElement } from '../../frameworks/messages/messages';

import {
  ErrorProcessElementsNoMainElement,
  //ErrorProcessElementsWrongElementCount,
  ErrorProcessElementsWrongTextElementCount
  //ErrorGetElementType
} from '../../frameworks/errors/errors';

export const makeFigmagicElement = (
  element: FigmaElement,
  config: Config,
  description = ''
): FigmagicElement => {
  return new FigmagicElement(element, config, description);
};

export class FigmagicElement {
  id: string;
  name: string;
  children?: Frame[];
  type: string;

  config: Config;
  description: string;
  remSize: number;
  css: string;
  html: string;
  extraProps: string;
  text: string;
  imports: string[];

  constructor(element: FigmaElement, config: Config, description = '') {
    // Element
    this.id = element.id;
    this.name = element.name;
    this.children = element.children;
    this.type = element.type;

    // Metadata
    this.config = config;
    this.description = description;
    this.css = ``;
    this.html = ``;
    this.extraProps = ``;
    this.text = ``;
    this.imports = [];

    // Setup
    this.init();
  }

  private async init(): Promise<void> {
    this.setElementType();

    if (this.children.every((a) => a.type === 'GROUP')) await this.handleNestedElements();
    else await this.handleNonNestedElements();
  }

  //private addDescription(description: string): void {
  //  this.description += description;
  //}

  //private addCss(css: string): void {
  //  this.css += css;
  //}

  private addHtml(html: string): void {
    this.html += html;
  }

  private replaceHtml(match: string, replacement: string): void {
    this.html = this.html.replace(match, replacement);
  }

  private addExtraProps(extraProps: string): void {
    this.extraProps += extraProps;
  }

  private addText(text: string): void {
    this.text += text;
  }

  //private addImports(imports: string[]): void {
  //  // Flatten imports and remove duplicates
  //  this.imports = [...new Set(imports)];
  //  //this.imports = imports.concat(imports);
  //}

  /**
   * @description Get the type of HTML element this represents
   *
   * @param element Element
   */
  private setElementType(): void {
    const ELEMENT_TYPE = this.description.match(/element=(.*)/)
      ? this.description.match(/element=(.*)/)[1]
      : 'div';

    const HTML = `<${ELEMENT_TYPE}>{{TEXT}}</${ELEMENT_TYPE}>`;
    this.addHtml(HTML);
  }

  /**
   * @description Handle CSS for all elements that are nested
   *
   * @param element Element
   */
  private async handleNestedElements(): Promise<any> {
    console.log('BEFORE handleNestedElements');

    this.children.forEach(async (el: any) => {
      if (!el.name) return;
      console.log('handleNestedElements: el.name', el.name);
      if (el.name[0] === '_') return;

      const MAIN_ELEMENT = el.children.filter(
        (e: any) => e.type === 'RECTANGLE' && e.name[0] !== '_'
      )[0];
      console.log('MAIN_ELEMENT', MAIN_ELEMENT);

      const TEXT_ELEMENT = el.children.filter(
        (e: any) => e.type === 'TEXT' && e.name[0] !== '_'
      )[0];
      console.log('TEXT_ELEMENT', TEXT_ELEMENT);

      // Set "type", for example for input element
      if (this.description.match(/type=(.*)/)) {
        const TYPE = this.description.match(/type=(.*)/)[1];
        if (el.extraProps && !el.extraProps.includes(`type="${TYPE}`))
          el.addExtraProps(`type="${TYPE}" `);
        console.log('TYPE', this.type);
      }

      if (!MAIN_ELEMENT) throw new Error(ErrorProcessElementsNoMainElement);

      // Clean names from any spaces
      const FIXED_NAME = MAIN_ELEMENT.name.replace(/\s/gi, '');
      console.log('FIXED_NAME', FIXED_NAME);

      // Parse layout CSS from element
      //console.log(MsgProcessElementsCreatingElement(MAIN_ELEMENT.name, FIXED_NAME));

      // TODO: The below will break
      // (node:76823) UnhandledPromiseRejectionWarning: Error: Cannot find module '/Users/mikaelvesavuori/web/figmagic/tokens/borderwidths.mjs'
      const elementStyling = await parseCssFromElement(
        MAIN_ELEMENT,
        TEXT_ELEMENT,
        this.config.remSize,
        this.config.outputTokenFormat
      );
      console.log('elementStyling', elementStyling);
    });

    console.log('AFTER');
  }

  /**
   * @description Add description to list of elements
   *
   * @param elements String from Figma description block
   */
  private async handleNonNestedElements(): Promise<void> {
    // Check for text elements
    const TEXT_ELEMENT = this.children.filter((el) => el.type === 'TEXT' && el.name[0] !== '_');
    if (TEXT_ELEMENT.length > 1)
      throw new Error(`${ErrorProcessElementsWrongTextElementCount} ${this.name}!`);

    // Set placeholder text
    if (this.children) {
      this.children.forEach((child) => {
        if (
          (child.type === 'TEXT' && child.name.toLowerCase() === 'placeholder') ||
          (child.type === 'TEXT' && child.name.toLowerCase() === ':placeholder')
        ) {
          this.addExtraProps(`placeholder="${child.characters}"`);
        }
      });
    }

    // Set "type", for example for input element
    if (this.description.match(/type=(.*)/)) {
      const TYPE = this.description.match(/type=(.*)/)[1];
      this.addExtraProps(` type="${TYPE}"`);
    }

    // Set text styling
    if (TEXT_ELEMENT.length === 1) {
      //const typography = await parseTypographyStylingFromElement(TEXT_ELEMENT[0], this.remSize);
      //this.addImports(imports.concat(typography.imports)); // Should not add; should equal/be (=)
      //this.addCss(typography.css);
      this.addText(TEXT_ELEMENT[0].characters); // Should not add; should equal/be (=)
    }

    this.replaceHtml('{{TEXT}}', this.text);

    // Process CSS for any component that has a self-named layer
    // This pattern is how we communicate that it's a layout element, e.g. input and not a H1
    /*
  const { updatedCss, updatedImports } = await processCssSelfnamedLayer(
    element,
    TEXT_ELEMENT,
    css,
    imports,
    remSize
  );
  */

    // TODO: The below will break?
    //await this.processCssSelfnamedLayer(TEXT_ELEMENT);
  }

  /**
   * @description Process CSS for layer with same name as self
   *
   * @param element Element
   * @param textElement Text element
   */
  /*
  private async processCssSelfnamedLayer(textElement) {
    const MAIN_ELEMENT = this.children.filter((e) => e.name === this.name);
    const TEXT_ELEMENT = textElement;

    if (MAIN_ELEMENT[0]) {
      if (MAIN_ELEMENT.length !== 1)
        throw new Error(`${ErrorProcessElementsWrongElementCount} ${this.name}!`);

      const FIXED_NAME = MAIN_ELEMENT[0].name.replace(/\s/gi, '');
      console.log(MsgProcessElementsCreatingElement(MAIN_ELEMENT[0].name, FIXED_NAME));

      const elementStyling = await parseCssFromElement(
        MAIN_ELEMENT[0],
        TEXT_ELEMENT[0],
        this.remSize
      );

      this.addImports(elementStyling.imports);
      this.addCss(elementStyling.css);
      //updatedImports = updatedImports.concat(elementStyling.imports);
      //updatedCss += elementStyling.css;
    }
  }
*/
}
