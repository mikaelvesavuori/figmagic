import { Style } from '../../../domain/Element/Style';

type FontSizeChild = {
  name: string;
  characters: string;
  style: Style;
};

export interface FontSizeFrame {
  children: FontSizeChild[];
}
