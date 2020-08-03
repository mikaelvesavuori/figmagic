import { Style } from '../../../domain/Element/Style';

type LineHeightChild = {
  name: string;
  characters: string;
  style: Style;
};

export interface LineHeightFrame {
  children: LineHeightChild[];
}
