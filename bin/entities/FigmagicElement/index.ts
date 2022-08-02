import { FigmaElement } from '../../contracts/FigmaElement';
import { FRAME as Frame } from '../../contracts/Figma';
import { Config } from '../../contracts/Config';
import { UpdatedCssAndImports } from '../../contracts/Imports';
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

  acceptedTypes = ['GROUP', 'FRAME'];

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
  private handleElements(): any {
    try {
      // Filter out hidden elements (using "_")
      // @ts-ignore
      const FILTERED_ELEMENTS = this.children.filter((child) => child.name[0] !== '_');

      // If the remaining elements/layers contain any groups or frames, use the nested elements handler
      if (FILTERED_ELEMENTS?.some((element: Frame) => this.acceptedTypes.includes(element.type)))
        return this.handleNestedElements(FILTERED_ELEMENTS);
      else return this.handleFlatElements(FILTERED_ELEMENTS);
    } catch (error: any) {
      throw Error(error);
    }
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
    const TEXT_CHILD = this.children?.filter((c) => c.name === ':text')[0];
    if (TEXT_CHILD && TEXT_CHILD.characters) this.text = TEXT_CHILD.characters;
  }

  /**
   * @description Set the element type (i.e "div", "input"...).
   */
  private setElement(): void {
    const ELEMENT_TYPE = (() => {
      const _ELEMENT = this.description.match(/element=(.*)/);
      if (_ELEMENT && _ELEMENT[1]) return _ELEMENT[1];
      return 'div';
    })();

    const HTML = `<${ELEMENT_TYPE}>{{TEXT}}</${ELEMENT_TYPE}>`;
    this.html = HTML;
    this.element = ELEMENT_TYPE;
  }

  /**
   * @description Set description for the Figmagic element.
   * This is later output to the description file.
   */
  private setDescription(): void {
    let description = this.description;

    const handleMatch = (regexMatch: any, currentDescription: string) => {
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
    const PLACEHOLDER_TEXT_CHILD = this.children?.filter(
      (child: Frame) => child.name.toLowerCase() === ':placeholder'
    )[0];

    if (PLACEHOLDER_TEXT_CHILD)
      this.addExtraProps(`placeholder="${PLACEHOLDER_TEXT_CHILD.characters}"`);
  }

  /**
   * @description Set element type (such as "type=checkbox").
   * This attribute is specified by the designer in Figma's description box.
   */
  private setElementType(): void {
    const TYPE = this.description.match(/type=(.*)/)?.[0];
    if (TYPE) this.addExtraProps(`type="${TYPE.split('type=')[1]}" `);
  }

  /**
   * @description Handle nested, multi-level elements.
   * To correctly calculate elements we need both a
   * "main" (layout) element and a "text" element.
   */
  private handleNestedElements(elements: Frame[]): UpdatedCssAndImports {
    try {
      let css = ``;
      let imports: Record<string, unknown>[] = [];

      const CHILD_ELEMENTS = elements.filter(
        (el: Frame) => this.acceptedTypes.includes(el.type) && el.name[0] !== '_'
      );
      CHILD_ELEMENTS?.forEach((variant: Frame) => {
        const PARSED_CSS = this.parseNestedCss(variant, this.config);
        css += PARSED_CSS.css;
        imports = imports.concat(PARSED_CSS.imports);
      });

      const PROCESSED_CSS = processNestedCss(css);

      return { updatedCss: PROCESSED_CSS, updatedImports: imports };
    } catch (error: any) {
      throw Error(error);
    }
  }

  /**
   * @description Handle flat, single-layer elements.
   * To correctly calculate elements we need both a
   * "main" (layout) element and a "text" element.
   */
  private handleFlatElements(elements: Frame[]): UpdatedCssAndImports {
    try {
      let css = `\n`;
      let imports: Record<string, unknown>[] = [];

      this.replaceHtml('{{TEXT}}', this.text || '');

      const MAIN_ELEMENT = elements?.filter(
        (element: Frame) => element.name.toLowerCase() === this.name.toLowerCase()
      )[0];
      const TEXT_ELEMENT = elements?.filter((element: Frame) => element.type === 'TEXT')[0];

      // Set text styling
      if (TEXT_ELEMENT) {
        const { updatedCss, updatedImports } = parseTypographyStylingFromElement({
          textElement: TEXT_ELEMENT,
          remSize: this.config.remSize,
          usePostscriptFontNames: this.config.usePostscriptFontNames,
          outputFormatTokens: this.config.outputFormatTokens,
          outputFormatColors: this.config.outputFormatColors,
          letterSpacingUnit: this.config.letterSpacingUnit,
          outputFolderTokens: this.config.outputFolderTokens
        } as TypographyElement);
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
    } catch (error: any) {
      throw Error(error);
    }
  }

  /**
   * @description Process CSS for any nested elements
   * (i.e. grouped in groups/frames, in Figma).
   */
  private parseNestedCss(el: Frame, config: Config, id?: number) {
    let css = `\n`;
    let imports: Record<string, unknown>[] = [];
    const ID = id || Math.round(Math.random() * 10000);

    const MAIN_ELEMENT = el.children?.filter(
      (e: Frame) => e.type === 'RECTANGLE' && e.name[0] !== '_'
    )[0];

    const TEXT_ELEMENT = el.children?.filter(
      (e: Frame) => e.type === 'TEXT' && e.name[0] !== '_'
    )[0];

    if (!MAIN_ELEMENT && !TEXT_ELEMENT) throw Error('Missing both main and text element!');

    const FIXED_NAME = el.name.replace(/\s/gi, '');

    const CHILD_ELEMENTS = el.children?.filter((child: Frame) =>
      this.acceptedTypes.includes(child.type)
    );
    CHILD_ELEMENTS?.forEach((state: Frame) => {
      const PARSED_CSS = this.parseNestedCss(state, config, ID);
      css += PARSED_CSS.css;
      imports = imports.concat(PARSED_CSS.imports);
    });

    if (MAIN_ELEMENT) {
      console.log(MsgProcessElementsCreatingElement(MAIN_ELEMENT.name, FIXED_NAME));

      const { updatedCss, updatedImports } = parseCssFromElement(
        MAIN_ELEMENT,
        TEXT_ELEMENT as any,
        config.remSize,
        config.outputFormatTokens,
        config.outputFolderTokens
      );

      css += `\n.${FIXED_NAME}__#${ID} {\n${updatedCss}}`;
      imports = imports.concat(updatedImports);
    }

    if (TEXT_ELEMENT) {
      const { updatedCss, updatedImports } = parseTypographyStylingFromElement({
        textElement: TEXT_ELEMENT,
        remSize: config.remSize,
        usePostscriptFontNames: config.usePostscriptFontNames,
        outputFormatTokens: config.outputFormatTokens,
        outputFormatColors: config.outputFormatColors,
        letterSpacingUnit: config.letterSpacingUnit,
        outputFolderTokens: config.outputFolderTokens
      } as TypographyElement);

      css += `\n.${FIXED_NAME}__#${ID} {\n${updatedCss}}`;
      imports = imports.concat(updatedImports);
    }

    return { css, imports };
  }

  /**
   * @description Process CSS for any "flat" elements
   */
  private parseFlatCss(
    layoutElement: Frame,
    textElement: Frame | null = null
  ): UpdatedCssAndImports {
    try {
      let css = ``;
      let imports: Record<string, unknown>[] = [];

      if (layoutElement) {
        const FIXED_NAME = this.name.replace(/\s/gi, '');
        console.log(MsgProcessElementsCreatingElement(this.name, FIXED_NAME));

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
    } catch (error: any) {
      throw Error(error);
    }
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
