import { FigmaElement } from '../../contracts/FigmaElement';
import { FRAME as Frame } from '../../contracts/Figma';
import { Config } from '../../contracts/Config';

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

    const { updatedCss, updatedImports } = this.handleElements(this.children); // await

    this.addCss(updatedCss);
    this.addHtml(html);
    this.addExtraProps(extraProps);
    this.addText(text);
    // @ts-ignore
    this.imports = [...new Set(updatedImports)];
  }

  /**
   * @description Both these big functions generate updated CSS and imports
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
  private handleNestedElements(): any {
    try {
      let css = ``;
      let imports: Record<string, unknown>[] = [];

      let extraProps = ``;
      let text = ``;

      if (this.children) {
        this.children.map((el: any) => {
          if (!el.name) return;
          if (el.name[0] === '_') return;

          const MAIN_ELEMENT = el.children.filter(
            (e: any) => e.type === 'RECTANGLE' && e.name[0] !== '_'
          )[0];

          const TEXT_ELEMENT = el.children.filter(
            (e: any) => e.type === 'TEXT' && e.name[0] !== '_'
          )[0];

          // Set placeholder text
          if (el.children) {
            el.children.filter((child: Frame) => {
              if (
                (child.type === 'GROUP' && child.name.toLowerCase() === 'placeholder') ||
                (child.type === 'GROUP' && child.name.toLowerCase() === ':placeholder')
              ) {
                if (child.children) {
                  child.children.filter((subChild: Frame) => {
                    if (
                      (subChild.type === 'TEXT' && subChild.name.toLowerCase() === 'placeholder') ||
                      (subChild.type === 'TEXT' && subChild.name.toLowerCase() === ':placeholder')
                    ) {
                      if (!extraProps.includes(`placeholder="${subChild.characters}"`))
                        extraProps += `placeholder="${subChild.characters}" `;
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

            if (el.extraProps && !el.extraProps.includes(`type="${TYPE}`))
              el.addExtraProps(`type="${TYPE}" `);
          }

          // Check and set correct selector type: class or pseudo-element
          const SELECTOR_TYPE = '.';

          if (!MAIN_ELEMENT) throw new Error(ErrorProcessElementsNoMainElement);

          // Clean names from any spaces
          const FIXED_NAME = MAIN_ELEMENT.name.replace(/\s/gi, '');

          // Parse layout CSS from element
          console.log(MsgProcessElementsCreatingElement(MAIN_ELEMENT.name, FIXED_NAME));

          const elementStyling = parseCssFromElement(
            MAIN_ELEMENT,
            TEXT_ELEMENT,
            this.config.remSize,
            this.config.outputTokenFormat
          );

          //this.addImports(elementStyling.imports);
          imports = imports.concat(elementStyling.imports);
          //this.addCss(`\n${SELECTOR_TYPE}${FIXED_NAME} {\n${elementStyling.css}}`);
          css += `\n${SELECTOR_TYPE}${FIXED_NAME} {\n${elementStyling.css}}`;

          // Parse typography CSS from element (requires layout element to exist)
          if (TEXT_ELEMENT) {
            const typography = parseTypographyStylingFromElement(
              TEXT_ELEMENT,
              this.config.remSize,
              this.config.outputTokenFormat
            );
            //this.setImports(typography.imports);
            //this.addImports(typography.imports); // Should not add; should equal/be (=); imports.concat(typography.imports)
            //this.addCss(`\n${SELECTOR_TYPE}${FIXED_NAME} {\n${typography.css}}`);
            //this.addText(TEXT_ELEMENT.characters); // Should not add; should equal/be (=)
            imports = imports.concat(typography.imports);
            css += `\n${SELECTOR_TYPE}${FIXED_NAME} {\n${typography.css}}`;
            text = TEXT_ELEMENT.characters;
            if (3 < 1) console.log('AAAA', text);
          }
        });
      }

      const PROCESSED_CSS = processNestedCss(css);
      //this.addCss(PROCESSED_CSS);

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
  private handleFlatElements(): any {
    try {
      let css = ``;
      let imports: Record<string, unknown>[] = [];

      // Check for text elements
      const TEXT_ELEMENT = (() => {
        if (this.children) {
          return this.children.filter((e: any) => e.type === 'TEXT' && e.name[0] !== '_')[0];
        }
      })();

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
        const TYPE = (() => {
          const _TYPE = this.description.match(/type=(.*)/);
          if (_TYPE && _TYPE[1]) return _TYPE[1];
        })();
        this.addExtraProps(` type="${TYPE}"`);
      }

      // Set text styling
      if (TEXT_ELEMENT) {
        const typography = parseTypographyStylingFromElement(
          TEXT_ELEMENT,
          this.config.remSize,
          this.config.outputTokenFormat
        );
        //this.setImports(typography.imports);
        //this.addImports(typography.imports); // Should not add; should equal/be (=); imports.concat(typography.imports)
        //this.addCss(typography.css);
        //this.addText(TEXT_ELEMENT.characters); // Should not add; should equal/be (=)
        imports = imports.concat(typography.imports);
        css += typography.css;
        this.text = TEXT_ELEMENT.characters || '';
      }

      this.replaceHtml('{{TEXT}}', this.text || '');

      // Process CSS for any component that has a self-named layer
      // This pattern is how we communicate that it's a layout element, e.g. input and not a H1
      const { updatedCss, updatedImports } = this.processCssSelfnamedLayer(TEXT_ELEMENT);

      css = updatedCss;
      imports = updatedImports;

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
  private processCssSelfnamedLayer(textElement: any): any {
    try {
      const MAIN_ELEMENT = (() => {
        if (this.children) {
          const ELEMENTS = this.children.filter((e) => e.name === this.name);
          if (ELEMENTS[0]) return ELEMENTS[0];
        }
      })();

      let css = ``;
      let imports: Record<string, unknown>[] = [];

      if (MAIN_ELEMENT) {
        const FIXED_NAME = MAIN_ELEMENT.name.replace(/\s/gi, '');
        console.log(MsgProcessElementsCreatingElement(MAIN_ELEMENT.name, FIXED_NAME));

        const elementStyling = parseCssFromElement(
          MAIN_ELEMENT,
          textElement,
          this.config.remSize,
          this.config.outputTokenFormat
        );

        //this.setImports(updatedImports.concat(elementStyling.imports));
        //this.addImports(elementStyling.imports);
        //this.addCss(elementStyling.css);
        imports = imports.concat(elementStyling.imports);
        css += elementStyling.css;
      }

      return { updatedCss: css, updatedImports: imports };
    } catch (error) {
      throw new Error(error);
    }
  }
}
