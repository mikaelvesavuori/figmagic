export interface FigmaData {
  document: Document;
  components?: object;
}

type Document = {
  id: string;
  name: string;
  type: string;
  children: any[];
};
