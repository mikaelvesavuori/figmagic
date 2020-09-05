import { ElementMetadataInterface } from '../../contracts/ElementMetadataInterface';

export const makeElementMetadataInterface = (): ElementMetadataInterface => {
  return new ElementMetadata();
};

export class ElementMetadata {
  css: string;
  html: string;
  extraProps: string;
  text: string;
  imports: string[];

  constructor() {
    this.css = ``;
    this.html = ``;
    this.extraProps = ``;
    this.text = ``;
    this.imports = [];
  }

  addCss(css: string): void {
    this.css += css;
  }

  addHtml(html: string): void {
    this.html += html;
  }

  addExtraProps(extraProps: string): void {
    this.extraProps += extraProps;
  }

  addText(text: string): void {
    this.text += text;
  }

  addImports(imports: string[]): void {
    // Flatten imports and remove duplicates
    this.imports = [...new Set(imports)];
    //this.imports = imports.concat(imports);
  }
}
