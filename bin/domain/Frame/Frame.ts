import { AbsoluteBoundingBox, Effects, Fills, Style } from '../Element/Element';

type FrameChild = {
  children: FrameChild[];
  absoluteBoundingBox: AbsoluteBoundingBox;
  characters: string;
  cornerRadius: string;
  effects: Effects[];
  fills: Fills;
  name: string;
  opacity: number;
  strokeWeight: string;
  style: Style;
};

export interface Frame {
  children: FrameChild[];
}
