import { AbsoluteBoundingBox, Effects, Fills, Style } from '../Element/Element';

type FrameChild = {
  name: string;
  strokeWeight: string;
  characters: string;
  absoluteBoundingBox: AbsoluteBoundingBox;
  effects: Effects[];
  cornerRadius: string;
  style: Style;
  fills: Fills;
};

export interface Frame {
  children: FrameChild[];
}
