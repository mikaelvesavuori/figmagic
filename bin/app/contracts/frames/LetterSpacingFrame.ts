import { Style } from '../../../domain/Element/Style';

type LetterSpacingChild = {
  name: string;
  characters: string;
  style: Style;
};

export interface LetterSpacingFrame {
  children: LetterSpacingChild[];
}
