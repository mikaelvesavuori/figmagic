import { FigmaElement } from '../../contracts/FigmaElement';
import { FRAME as Frame } from '../../contracts/Figma';
import { Config } from '../../contracts/Config';
import { UpdatedCssAndImports } from '../../contracts/Imports';

import { parseCssFromElement } from './logic/parseCssFromElement';
import { parseTypographyStylingFromElement } from './logic/parseTypographyStylingFromElement';
import { processNestedCss } from './logic/processNestedCss';

import { MsgProcessElementsCreatingElement } from '../../frameworks/messages/messages';
import { ErrorProcessElementsNoMainElement } from '../../frameworks/errors/errors';

// TODO: Clean up and document

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
  }

  init(): void {
    this.setElement();

    const html = ``;
    const extraProps = ``; // Any extra properties, like "placeholder"
    const text = ``;
    //const imports = [];

    const { updatedCss, updatedImports } = this.handleElements(this.children);

    this.addCss(updatedCss);
    this.addHtml(html);
    this.addExtraProps(extraProps);
    this.addText(text);

    // @ts-ignore
    this.imports = [...new Set(updatedImports)];
  }

  /**
   * @description Both these big functions generate updated CSS and imports. Nested element have only GROUPs at the base of them, while "flat" elements can have zero or more GROUPs, but always something else at the base.
   * @param children Elements
   */
  private handleElements(children: any): any {
    try {
      if (children.every((a: any) => a.type === 'GROUP')) {
        return this.handleNestedElements();
      } else return this.handleFlatElements();
    } catch (error) {
      throw new Error(error);
    }
  }

  private addCss(css: string): void {
    this.css += css;
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

  /*
  private addImports(imports: string[]): void {
    // Flatten imports and remove duplicates
    this.imports = [...new Set(imports)];
    //this.imports = imports.concat(imports);
  }
  */

  /*
  private setImports(imports: string[]): void {
    this.imports = this.imports.concat(imports);
  }
  */

  /**
   * @description Get the type of HTML element this represents
   *
   * @param element Element
   */
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
   * @description Handle CSS for all elements that are nested
   *
   * @param element Element
   */
  private handleNestedElements(): UpdatedCssAndImports {
    try {
      let css = ``;
      let imports: Record<string, unknown>[] = [];

      if (this.children) {
        this.children.forEach((el: Frame) => {
          if (!el.name) return;
          if (el.name[0] === '_') return;

          const MAIN_ELEMENT =
            el.children && el.children.length > 0
              ? el.children.filter((e: Frame) => e.type === 'RECTANGLE' && e.name[0] !== '_')[0]
              : null;

          const TEXT_ELEMENT =
            el.children && el.children.length > 0
              ? el.children.filter((e: Frame) => e.type === 'TEXT' && e.name[0] !== '_')[0]
              : null;

          // Set placeholder text
          if (el.children) {
            el.children.filter((child: Frame) => {
              if (
                (child.type === 'GROUP' && child.name.toLowerCase() === 'placeholder') ||
                (child.type === 'GROUP' && child.name.toLowerCase() === ':placeholder')
              ) {
                // TODO/Improvement: This seems to be mapped to a single child depth; could be recursive to support any depth
                if (child.children) {
                  child.children.filter((subChild: Frame) => {
                    if (
                      (subChild.type === 'TEXT' && subChild.name.toLowerCase() === 'placeholder') ||
                      (subChild.type === 'TEXT' && subChild.name.toLowerCase() === ':placeholder')
                    ) {
                      if (!this.extraProps.includes(`placeholder="${subChild.characters}"`))
                        this.addExtraProps(`placeholder="${subChild.characters}" `);
                    }
                  });
                }
              }
            });
          }

          // Set "type", for example for input element
          if (this.description.match(/type=(.*)/)) {
            const TYPE = (() => {
              const _TYPE = this.description.match(/type=(.*)/);
              if (_TYPE && _TYPE[1]) return _TYPE[1];
            })();

            if (this.extraProps && !this.extraProps.includes(`type="${TYPE}`))
              this.addExtraProps(`type="${TYPE}" `);
          }

          // Check and set correct selector type: class or pseudo-element
          const SELECTOR_TYPE = '.';

          if (!MAIN_ELEMENT) throw new Error(ErrorProcessElementsNoMainElement);

          // Clean names from any spaces
          const FIXED_NAME = MAIN_ELEMENT.name.replace(/\s/gi, '');

          // Parse layout CSS from element
          console.log(MsgProcessElementsCreatingElement(MAIN_ELEMENT.name, FIXED_NAME));

          const { updatedCss, updatedImports } = parseCssFromElement(
            MAIN_ELEMENT,
            TEXT_ELEMENT as any,
            this.config.remSize,
            this.config.outputTokenFormat
          );

          css += `\n${SELECTOR_TYPE}${FIXED_NAME} {\n${updatedCss}}`;
          imports = imports.concat(updatedImports);

          // Parse typography CSS from element (requires layout element to exist)
          if (TEXT_ELEMENT) {
            const { updatedCss, updatedImports } = parseTypographyStylingFromElement(
              TEXT_ELEMENT,
              this.config.remSize,
              this.config.outputTokenFormat
            );
            css += `\n${SELECTOR_TYPE}${FIXED_NAME} {\n${updatedCss}}`;
            imports = imports.concat(updatedImports);
            this.text = TEXT_ELEMENT.characters || '';
          }
        });
      }

      const PROCESSED_CSS = processNestedCss(css);

      return { updatedCss: PROCESSED_CSS, updatedImports: imports };
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description Add description to list of elements
   *
   * @param elements String from Figma description block
   */
  private handleFlatElements(): UpdatedCssAndImports {
    try {
      let css = ``;
      let imports: Record<string, unknown>[] = [];

      // Get same-named layer
      const MAIN_ELEMENT = this.children?.filter((element: Frame) => element.name === this.name)[0];

      // Check for text elements
      const TEXT_ELEMENT = this.children?.filter((element: Frame) => element.type === 'TEXT')[0];

      // Set placeholder text
      if (this.children) {
        this.children.forEach((child: Frame) => {
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
        const TYPE = (() => {
          const _TYPE = this.description.match(/type=(.*)/);
          if (_TYPE && _TYPE[1]) return _TYPE[1];
        })();
        this.addExtraProps(` type="${TYPE}"`);
      }

      // Set text styling
      if (TEXT_ELEMENT) {
        const { updatedCss, updatedImports } = parseTypographyStylingFromElement(
          TEXT_ELEMENT,
          this.config.remSize,
          this.config.outputTokenFormat
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

  /**
   * @description Process CSS for layer with same name as self
   *
   * @param textElement Text element
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
          this.config.outputTokenFormat
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
