import { Effects } from '../../../domain/Element/Element';

type ShadowChild = {
  name: string;
  opacity: string;
  effects: Effects[];
};

export interface ShadowFrame {
  children: ShadowChild[];
}
