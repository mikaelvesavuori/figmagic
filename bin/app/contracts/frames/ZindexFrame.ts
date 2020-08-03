import { AbsoluteBoundingBox } from '../../../domain/Element/Element';

type ZindexChild = {
  name: string;
  characters: string;
};

export interface ZindexFrame {
  children: ZindexChild[];
}
