export interface FigmagicElement {
  id: string;
  name: string;
  description?: string;
  element?: string;
  imports?: any[];
  css?: string;
  html?: string;
  text?: string;
  extraProps?: string;
}
