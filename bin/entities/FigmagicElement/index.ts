import { FigmaElement } from '../../contracts/FigmaElement';
import { FRAME as Frame } from '../../contracts/Figma';
import { Config } from '../../contracts/Config';
import { UpdatedCssAndImports } from '../../contracts/Imports';

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
    this.setDescription();

    const html = ``;
    const extraProps = ``; // Any extra properties, like "placeholder"
    const text = ``;
    //const imports = [];

    const { updatedCss, updatedImports } = this.handleElements(this.children);

    this.setCss(updatedCss);
    this.addHtml(html);
    this.addExtraProps(extraProps);
    this.addText(text);

    // @ts-ignore
    this.imports = [...new Set(updatedImports)];
  }

  private handleElements(children: any): any {
    try {
      if (children.every((a: any) => a.type === 'GROUP')) {
        return this.handleNestedElements();
      } else return this.handleFlatElements();
    } catch (error) {
      throw new Error(error);
    }
  }

  private setCss(css: string): void {
    this.css = css;
  }

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

  private setElement(): void {
    const ELEMENT_TYPE = (() => {
      const _ELEMENT = this.description.match(/element=(.*)/);
      if (_ELEMENT && _ELEMENT[1]) return _ELEMENT[1];
      return 'div';
    })();

    const HTML = `<${ELEMENT_TYPE}>{{TEXT}}</${ELEMENT_TYPE}>`;
    this.addHtml(HTML);
    this.element = ELEMENT_TYPE;
  }

  /**
   * @description Set description
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

  private setPlaceholderText(): void {
    this.children?.forEach((child: Frame) => {
      if (
        (child.type === 'TEXT' && child.name.toLowerCase() === 'placeholder') ||
        (child.type === 'TEXT' && child.name.toLowerCase() === ':placeholder')
      ) {
        this.addExtraProps(`placeholder="${child.characters}"`);
      }
    });
  }

  private setElementType(): void {
    if (this.description.match(/type=(.*)/)) {
      const TYPE = (() => {
        const _TYPE = this.description.match(/type=(.*)/);
        if (_TYPE && _TYPE[1]) return _TYPE[1];
      })();
      if (this.extraProps && !this.extraProps.includes(`type="${TYPE}`))
        this.addExtraProps(`type="${TYPE}" `);
    }
  }

  private handleNestedElements(): UpdatedCssAndImports {
    try {
      let css = ``;
      let imports: Record<string, unknown>[] = [];

      this.children?.forEach((el: Frame) => {
        if (!el.name) return;
        if (el.name[0] === '_') return;

        const MAIN_ELEMENT = el.children?.filter(
          (e: Frame) => e.type === 'RECTANGLE' && e.name[0] !== '_'
        )[0];
        if (!MAIN_ELEMENT) throw new Error(ErrorProcessElementsNoMainElement);

        const TEXT_ELEMENT = el.children?.filter(
          (e: Frame) => e.type === 'TEXT' && e.name[0] !== '_'
        )[0];

        this.setPlaceholderText(); // was filter loop
        this.setElementType();

        const FIXED_NAME = MAIN_ELEMENT.name.replace(/\s/gi, ''); // Clean names from any spaces

        // Parse layout CSS from element
        console.log(MsgProcessElementsCreatingElement(MAIN_ELEMENT.name, FIXED_NAME));

        const { updatedCss, updatedImports } = parseCssFromElement(
          MAIN_ELEMENT,
          TEXT_ELEMENT as any,
          this.config.remSize,
          this.config.outputTokenFormat,
          this.config.outputFolderTokens
        );

        css += `\n.${FIXED_NAME} {\n${updatedCss}}`; // Add 'dot' selector
        imports = imports.concat(updatedImports);

        if (TEXT_ELEMENT) {
          const { updatedCss, updatedImports } = parseTypographyStylingFromElement(
            TEXT_ELEMENT,
            this.config.remSize,
            this.config.outputTokenFormat,
            this.config.letterSpacingUnit,
            this.config.outputFolderTokens
          );
          css += `\n.${FIXED_NAME} {\n${updatedCss}}`;
          imports = imports.concat(updatedImports);
          this.text = TEXT_ELEMENT.characters || '';
        }
      });

      const PROCESSED_CSS = processNestedCss(css);

      return { updatedCss: PROCESSED_CSS, updatedImports: imports };
    } catch (error) {
      throw new Error(error);
    }
  }

  private handleFlatElements(): UpdatedCssAndImports {
    try {
      let css = `\n`;
      let imports: Record<string, unknown>[] = [];

      const MAIN_ELEMENT = this.children?.filter((element: Frame) => element.name === this.name)[0];
      const TEXT_ELEMENT = this.children?.filter((element: Frame) => element.type === 'TEXT')[0];

      this.setPlaceholderText();
      this.setElementType();

      // Set text styling
      if (TEXT_ELEMENT) {
        const { updatedCss, updatedImports } = parseTypographyStylingFromElement(
          TEXT_ELEMENT,
          this.config.remSize,
          this.config.outputTokenFormat,
          this.config.letterSpacingUnit,
          this.config.outputFolderTokens
        );
        css += updatedCss;
        imports = imports.concat(updatedImports);
        this.text = TEXT_ELEMENT.characters || '';
      }

      this.replaceHtml('{{TEXT}}', this.text || '');

      // Process CSS for any component that has a self-named layer
      // This pattern is how we communicate that it's a layout element, e.g. input and not a H1
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
          this.config.outputTokenFormat,
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
