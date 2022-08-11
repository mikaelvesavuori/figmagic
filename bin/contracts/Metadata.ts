import { Imports } from './Imports';

export interface Metadata {
  dataType: null | 'enum';
  html: string;
  element: string;
  extraProps: string;
  text: string;
  imports: Imports;
}
