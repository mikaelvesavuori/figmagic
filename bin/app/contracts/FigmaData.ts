export interface FigmaData {
  document: Document;
  components?: any;
}

type Document = {
  children: any[];
};
