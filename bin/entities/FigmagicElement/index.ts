import { FigmaElement } from '../../contracts/FigmaElement';
import { FRAME as Frame } from '../../contracts/Figma';
import { Config } from '../../contracts/Config';
import { UpdatedCssAndImports } from '../../contracts/Imports';
import { TypographyElement } from '../../contracts/TypographyElement';

import { parseCssFromElement } from './logic/parseCssFromElement';
import { parseTypographyStylingFromElement } from './logic/parseTypographyStylingFromElement';
import { processNestedCss } from './logic/processNestedCss';

import { MsgProcessElementsCreatingElement } from '../../frameworks/messages/messages';
import { ErrorProcessElementsNoMainElement } from '../../frameworks/errors/errors';

/**
 * @description Factory function to create Figmagic element
 */
export const makeFigmagicElement = (
  element: FigmaElement,
  config: Config,
  description = ''
): FigmagicElement => {
  return new FigmagicElement(element, config, description);
};

class FigmagicElement {
  id: string;
  name: string;
  children?: Frame[];
  type: string;

  config: Config;
  description: string;
  element: string;
  css: string;
  html: string;
  extraProps: string;
  text: string | undefined;
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

    const { updatedCss, updatedImports } = this.handleElements();
    this.setCss(updatedCss);

    // @ts-ignore
    this.imports = [...new Set(updatedImports)];
  }

  /**
   * @description Controller to funnel elements to the correct handler.
   */
  private handleElements(): any {
    try {
      // Filter out meta layers (using ":") or hidden ones (using "_")
      // @ts-ignore
      const FILTERED_ELEMENTS = this.children
        .filter((c) => c.name[0] !== ':')
        .filter((c) => c.name[0] !== '_');

      // If all the remaining elements/layers contain only groups, use the "nested" handler
      if (FILTERED_ELEMENTS?.every((a: any) => a.type === 'GROUP'))
        return this.handleNestedElements(FILTERED_ELEMENTS);
      else return this.handleFlatElements(FILTERED_ELEMENTS);
    } catch (error) {
      throw new Error(error);
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
   * @description Try setting Figmagic element text to the characters of an element-root-level layer going by the name ":text".
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
   * @description Set description for the Figmagic element. This is later outputted to the description file.
   */
  private setDescription(): void {
    let description = this.description;
    if (this.description.match(/description=(.*)/)) {
      const INDEX = this.description.indexOf('description=');
      const MARKER_LENGTH = 12; // "description=" is 12 characters
      description = description.slice(INDEX + MARKER_LENGTH, description.length);
      description.replace(/^\s*\n/gm, '');
      this.description = description;
    }
  }

  /**
   * @description Set element's placeholder text value, if we find an element-root-level layer going by the name ":placeholder".
   */
  private setPlaceholderText(): void {
    const PLACEHOLDER_TEXT_CHILD = this.children?.filter(
      (child: Frame) => child.name.toLowerCase() === ':placeholder'
    )[0];

    if (PLACEHOLDER_TEXT_CHILD)
      this.addExtraProps(`placeholder="${PLACEHOLDER_TEXT_CHILD.characters}"`);
  }

  /**
   * @description Set element type (such as "type=checkbox"). This attribute is specified by the designer in Figma's description box.
   */
  private setElementType(): void {
    const TYPE = this.description.match(/type=(.*)/)?.[0];
    if (TYPE) this.addExtraProps(`type="${TYPE.split('type=')[1]}" `);
  }

  /**
   * @description Handle nested, multi-level elements. To correctly calculate elements we need both a "main" (layout) element and a "text" element.
   */
  private handleNestedElements(elements: Frame[]): UpdatedCssAndImports {
    try {
      let css = ``;
      let imports: Record<string, unknown>[] = [];

      elements?.forEach((el: Frame) => {
        if (!el.name) return;
        if (el.name[0] === '_') return;

        const MAIN_ELEMENT = el.children?.filter(
          (e: Frame) => e.type === 'RECTANGLE' && e.name[0] !== '_'
        )[0];
        if (!MAIN_ELEMENT) throw new Error(ErrorProcessElementsNoMainElement);

        const TEXT_ELEMENT = el.children?.filter(
          (e: Frame) => e.type === 'TEXT' && e.name[0] !== '_'
        )[0];

        // Clean names from any spaces
        const FIXED_NAME = MAIN_ELEMENT.name.replace(/\s/gi, '');

        // Parse layout CSS from element
        console.log(MsgProcessElementsCreatingElement(MAIN_ELEMENT.name, FIXED_NAME));

        const { updatedCss, updatedImports } = parseCssFromElement(
          MAIN_ELEMENT,
          TEXT_ELEMENT as any,
          this.config.remSize,
          this.config.outputFormatTokens,
          this.config.outputFolderTokens
        );

        // Add 'dot' selector
        css += `\n.${FIXED_NAME} {\n${updatedCss}}`;

        imports = imports.concat(updatedImports);

        if (TEXT_ELEMENT) {
          const { updatedCss, updatedImports } = parseTypographyStylingFromElement({
            textElement: TEXT_ELEMENT,
            remSize: this.config.remSize,
            usePostscriptFontNames: this.config.usePostscriptFontNames,
            outputFormatTokens: this.config.outputFormatTokens,
            letterSpacingUnit: this.config.letterSpacingUnit,
            outputFolderTokens: this.config.outputFolderTokens
          } as TypographyElement);
          css += `\n.${FIXED_NAME} {\n${updatedCss}}`;
          imports = imports.concat(updatedImports);
        }
      });

      const PROCESSED_CSS = processNestedCss(css);

      return { updatedCss: PROCESSED_CSS, updatedImports: imports };
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description Handle flat, single-layer elements. To correctly calculate elements we need both a "main" (layout) element and a "text" element.
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
          letterSpacingUnit: this.config.letterSpacingUnit,
          outputFolderTokens: this.config.outputFolderTokens
        } as TypographyElement);
        css += updatedCss;
        imports = imports.concat(updatedImports);
        this.text = TEXT_ELEMENT.characters || '';
      }

      if (MAIN_ELEMENT) {
        const { updatedCss, updatedImports } = this.processCssSelfnamedLayer(
          MAIN_ELEMENT,
          TEXT_ELEMENT
        );

        const COMBINED_CSS = css + updatedCss;

        let processedCss = Array.from(new Set(COMBINED_CSS.split(/\n/gi))).toString();
        processedCss = processedCss.replace(/;,/gi, ';\n ');

        css = processedCss;
        imports = imports.concat(updatedImports);
      }

      return { updatedCss: css, updatedImports: imports };
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description Process CSS for any component that has a self-named layer. This pattern is how we communicate that it's a layout element, e.g. input and not a H1.
   */
  private processCssSelfnamedLayer(
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
    } catch (error) {
      throw new Error(error);
    }
  }
}
