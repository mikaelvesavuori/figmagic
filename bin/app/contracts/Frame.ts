import { AbsoluteBoundingBox, Effects, Fills, Style } from './Element';

export interface Frame {
  children: FrameChild[];
  name: string;
}

type FrameChild = {
  absoluteBoundingBox: AbsoluteBoundingBox;
  characters: string;
  children: FrameChild[];
  cornerRadius: string;
  effects: Effects[];
  fills: Fills;
  name: string;
  opacity: number;
  strokeWeight: string;
  style: Style;
};
