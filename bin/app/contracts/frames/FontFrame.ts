import { Style } from '../../../domain/Element/Style';

type FontChild = {
  name: string;
  characters: string;
  style: Style;
};

export interface FontFrame {
  children: FontChild[];
}
