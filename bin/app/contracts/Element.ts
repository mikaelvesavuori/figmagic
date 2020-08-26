export interface Element {
  absoluteBoundingBox: AbsoluteBoundingBox;
  children: any[];
  cornerRadius: string;
  description: string;
  effects: Effects[];
  fills: Fills[];
  gradients: Gradients[];
  id: string;
  name: string;
  strokeWeight: string;
  strokes: Strokes;
  style: Style;
  type: string;
}

export type AbsoluteBoundingBox = {
  height: number;
  width: number;
  x: number;
  y: number;
};

export type Strokes = {
  color: Color;
  length: number;
  type: string;
};

export type Color = {
  a: number;
  b: number;
  g: number;
  r: number;
};

export type Effects = {
  color: Color;
  radius: string;
  type: string;
  offset: {
    x: string;
    y: string;
    radius: string;
    type: string;
  };
};

export type Fills = {
  color?: Color;
  gradientStops?: GradientStops[];
  gradients?: Gradients[];
  opacity?: number;
  position?: string;
  type?: string;
};

export type Gradients = {
  gradientStops: GradientStops[];
};

export type GradientStops = {
  color: Color;
  position: string;
};

export type Style = {
  fontFamily: string;
  fontPostScriptName: string;
  fontSize: string;
  fontWeight: number;
  letterSpacing: string;
  lineHeightPercentFontSize: number;
  textAlignHorizontal: string;
  textCase: 'LOWER' | 'UPPER' | 'TITLE';
};
