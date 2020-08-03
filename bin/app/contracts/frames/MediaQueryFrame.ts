import { Style } from '../../../domain/Element/Style';
import { AbsoluteBoundingBox } from '../../../domain/Element/Element';

type MediaQueryChild = {
  name: string;
  characters: string;
  style: Style;
  absoluteBoundingBox: AbsoluteBoundingBox;
};

export interface MediaQueryFrame {
  children: MediaQueryChild[];
}
