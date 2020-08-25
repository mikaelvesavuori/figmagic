import { Element } from './Element';

export interface Metadata {
  text: string;
  dataType: null | 'enum';
  element: Element;
  extraProps: any[];
  imports: any[];
}
