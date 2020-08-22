import { Element } from '../../../domain/Element/Element';

export interface Metadata {
  text: string;
  dataType: string;
  element: Element;
  extraProps: any[];
  imports: any[];
}
