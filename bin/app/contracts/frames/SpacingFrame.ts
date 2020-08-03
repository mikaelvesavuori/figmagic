import { AbsoluteBoundingBox } from '../../../domain/Element/Element';

type SpacingChild = {
  name: string;
  absoluteBoundingBox: AbsoluteBoundingBox;
};

export interface SpacingFrame {
  children: SpacingChild[];
}
