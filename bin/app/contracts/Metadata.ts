import { Element } from '../../entities/Element/Element';

export interface Metadata {
  text: string;
  dataType: string;
  element: Element;
  extraProps: any[];
  imports: any[];
}
