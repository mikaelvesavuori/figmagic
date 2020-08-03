import { Fills } from '../../../domain/Element/Element';

type ColorChild = {
  name: string;
  strokeWeight: string;
  fills: Fills[];
};

export interface ColorFrame {
  children: ColorChild[];
}
