import { Style } from './Style';

export type AbsoluteBoundingBox = {
  width: number;
  height: number;
  x: number;
  y: number;
};

export type Strokes = {
  type: string;
  length: number;
  color: Color;
};

export type Color = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export type Effects = {
  type: string;
  color: Color;
  offset: {
    x: string;
    y: string;
  };
  radius: string;
};

export type Fills = {
  color: Color;
  gradients: Gradients[];
  gradientStops: GradientStops[];
  position: string;
  type: string;
  opacity: string;
};

export type Gradients = {
  gradientStops: GradientStops[];
};

export type GradientStops = {
  fill: Fills[];
};

export interface Element {
  absoluteBoundingBox: AbsoluteBoundingBox;
  strokeWeight: string;
  strokes: Strokes;
  cornerRadius: string;
  effects: Effects[];
  fills: Fills[];
  gradients: Gradients[];
  type: string;
  style: Style;
}
