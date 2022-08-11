import { Components, FRAME as Frame } from './Figma';

export interface FigmaData {
  document: Document;
  components: Components;
}

export type FigmaResponse = {
  document: Document;
  components: Components;
  componentSets: Record<string, any>;
  schemaVersion: number;
  styles: Styles;
  name: string;
  lastModified: string;
  thumbnailUrl: string;
  version: string;
  role: string; // owner
  editorType: string; // figma
  linkAccess: string; // view
};

type Styles = {
  [id: string]: Style;
};

type Style = {
  [id: string]: Record<string, any>;
};

type Document = {
  id: string;
  name: string;
  type: string;
  children: Frame[];
};
