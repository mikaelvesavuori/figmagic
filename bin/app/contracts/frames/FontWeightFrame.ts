import { Style } from '../../../domain/Element/Style';

type FontWeightChild = {
  name: string;
  characters: string;
  style: Style;
};

export interface FontWeightFrame {
  children: FontWeightChild[];
}
