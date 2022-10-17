/***********************************************************/
/* Global properties                                       */
/* https://www.figma.com/developers/api#global-properties  */
/***********************************************************/

export type FigmaNode = {
  id: string;
  name: string;
  visible: boolean;
  type: string;
  pluginData: any;
  sharedPluginData: any;
};

/****************************************************/
/* Node types                                       */
/* https://www.figma.com/developers/api#node-types  */
/****************************************************/

export type DOCUMENT = {
  children: FigmaNode[];
};

export type CANVAS = {
  children: FigmaNode[];
  backgroundColor: Color;
  prototypeStartNodeID: string;
  exportSettings: ExportSetting[];
};

export interface FRAME {
  absoluteBoundingBox?: Rectangle;
  absoluteRenderBounds?: Rectangle;
  blendMode?: BlendMode;
  //[DEPRECATED] Background of the node. This is deprecated, as backgrounds for frames are now in the fills field.
  background?: Paint[];
  //[DEPRECATED] Background color of the node. This is deprecated, as frames now support more than a solid color as a background. Please use the fills field instead.
  backgroundColor?: Color;
  characters?: string;
  children?: FRAME[]; //FigmaNode[];
  clipsContent?: boolean;
  constraints?: LayoutConstraint;
  cornerRadius?: number;
  counterAxisSizingMode?: 'FIXED' | 'AUTO';
  effects?: Effect[];
  exportSettings?: ExportSetting[];
  fills?: Paint[];
  horizontalPadding?: number;
  id: string;
  isMask?: boolean;
  isMaskOutline?: boolean;
  itemSpacing?: number;
  layoutAlign?: 'MIN' | 'CENTER' | 'MAX' | 'STRETCH';
  layoutGrids?: LayoutGrid[];
  layoutMode?: 'NONE' | 'HORIZONTAL' | 'VERTICAL';
  locked?: boolean;
  name: string;
  opacity?: number;
  overflowDirection?:
    | 'HORIZONTAL_SCROLLING'
    | 'VERTICAL_SCROLLING'
    | 'HORIZONTAL_AND_VERTICAL_SCROLLING';
  preserveRatio?: boolean;
  rectangleCornerRadii?: number[];
  relativeTransform?: Transform;
  size?: Vector;
  strokeAlign?: 'INSIDE' | 'OUTSIDE' | 'CENTER';
  strokeWeight?: number;
  strokes?: Paint[];
  // [BUG/CHANGE FROM FIGMA? Not listed but my older test data includes this field...?]
  style?: any;
  styles?: any;
  transitionDuration?: number;
  transitionEasing?: EasingType;
  transitionNodeID?: string;
  type: string;
  verticalPadding?: number;
  // [FIX ERROR] These come on the Frame, despite not being documented...?
  characterStyleOverrides?: number[];
  styleOverrideTable?: any; //Map<number, TypeStyle>;
  layoutVersion?: number;
  prototypeStartNodeID?: any;
  prototypeDevice?: any;
}

export type GROUP = FRAME;

export type VECTOR = {
  absoluteBoundingBox: Rectangle;
  blendMode: BlendMode;
  constraintsLayout: Constraint;
  effects: Effect[];
  exportSettings: ExportSetting[];
  fillGeometry: Path[];
  fills: Paint[];
  isMask: boolean;
  layoutAlign: 'MIN' | 'CENTER' | 'MAX' | 'STRETCH';
  locked: boolean;
  opacity: number;
  preserveRatio: boolean;
  relativeTransform: Transform;
  size: Vector;
  strokeAlignString: 'INSIDE' | 'OUTSIDE' | 'CENTER';
  strokeCap: 'NONE' | 'ROUND' | 'SQUARE' | 'LINE_ARROW' | 'TRIANGLE_ARROW';
  strokeDashes: number[];
  strokeGeometry: Path[];
  strokeJoin: 'MITER' | 'BEVEL' | 'ROUND';
  strokeMiterAngle: number;
  strokeWeight: number;
  strokes: Paint[];
  styles: Map<StyleType, string>;
  transitionDuration: number;
  transitionEasing: EasingType;
  transitionNodeID: string;
};

export interface BOOLEAN_OPERATION extends VECTOR {
  booleanOperation: 'UNION' | 'INTERSECT' | 'SUBTRACT' | 'EXCLUDE';
  children: FigmaNode[];
}

export type STAR = VECTOR;

export type LINE = VECTOR;

export type ELLIPSE = VECTOR;

export type REGULAR_POLYGON = VECTOR;

export interface RECTANGLE extends VECTOR {
  cornerRadius: number;
  rectangleCornerRadii: number[];
  // Added
  height?: number;
  width?: number;
  x?: number;
  y?: number;
}

export interface TEXT extends VECTOR {
  characterStyleOverrides: number[];
  characters: string;
  style: TypeStyle;
  styleOverrideTable: Map<number, TypeStyle>;
}

export type SLICE = {
  absoluteBoundingBox: Rectangle;
  exportSettings: ExportSetting;
  relativeTransform: Transform;
  size: Vector;
};

export type COMPONENT = VECTOR;

export interface INSTANCE extends FRAME {
  componentId: string;
}

/*****************************************************/
/* Property types                                    */
/* https://www.figma.com/developers/api#files-types  */
/*****************************************************/

export type Color = {
  a: number;
  b: number;
  g: number;
  r: number;
};

export type ExportSetting = {
  constraint: Constraint;
  format: 'JPG' | 'PNG' | 'SVG';
  suffix: string;
};

export type Constraint = {
  type: 'SCALE' | 'WIDTH' | 'HEIGHT';
  value: number;
};

export type Rectangle = {
  height?: number;
  width?: number;
  x?: number;
  y?: number;
};

export type BlendMode =
  // Normal blends
  | 'PASS_THROUGH'
  | 'NORMAL'
  // Darken
  | 'DARKEN'
  | 'MULTIPLY'
  | 'LINEAR_BURN'
  | 'COLOR_BURN'
  // Lighten
  | 'LIGHTEN'
  | 'SCREEN'
  | 'LINEAR_DODGE'
  | 'COLOR_DODGE'
  // Contrast
  | 'OVERLAY'
  | 'SOFT_LIGHT'
  | 'HARD_LIGHT'
  // Inversion
  | 'DIFFERENCE'
  | 'EXCLUSION'
  // Component
  | 'HUE'
  | 'SATURATION'
  | 'COLOR'
  | 'LUMINOSITY';

export type EasingType = 'EASE_IN' | 'EASE_OUT' | 'EASE_IN_AND_OUT' | 'LINEAR';

export type LayoutConstraint = {
  vertical?: 'TOP' | 'BOTTOM' | 'CENTER' | 'TOP_BOTTOM' | 'SCALE';
  horizontal?: 'LEFT' | 'RIGHT' | 'CENTER' | 'LEFT_RIGHT' | 'SCALE';
};

export type LayoutGrid = {
  color: Color;
  pattern: 'COLUMNS' | 'ROWS' | 'GRID';
  sectionSize: number;
  visible: boolean;

  // The following properties are only meaningful for directional grids (COLUMNS or ROWS)
  alignment: 'MIN' | 'STRETCH' | 'CENTER';
  count: number;
  gutterSize: number;
  offset: number;
};

export type Effect = {
  radius: number;
  type: 'INNER_SHADOW' | 'DROP_SHADOW' | 'LAYER_BLUR' | 'BACKGROUND_BLUR';
  visible: boolean;

  // The following properties are for shadows only
  blendMode: BlendMode;
  color: Color;
  offset: Vector;
};

export type Hyperlink = {
  type: 'URL' | 'NODE';
  url: string;
  nodeID: string;
};

export type Paint = {
  //gradients?: Gradients[];
  opacity?: number;
  position?: string;
  type?:
    | 'SOLID'
    | 'GRADIENT_LINEAR'
    | 'GRADIENT_RADIAL'
    | 'GRADIENT_ANGULAR'
    | 'GRADIENT_DIAMOND'
    | 'IMAGE'
    | 'EMOJI';

  // Added
  gradientStops?: GradientStop[];

  // For solid paints
  color?: Color;

  // For gradient paints
  blendMode?: BlendMode;
  gradientHandlePositions?: Vector | Vector[];
  ColorStop?: ColorStop[];

  // For image paints
  gifRef?: string;
  imageRef?: string;
  imageTransform?: Transform;
  rotation?: number;
  scaleMode?: 'FILL' | 'FIT' | 'TILE' | 'STRETCH';
  scalingFactor?: number;

  // [FIX] This is added by Figma, but not documented
  visible?: boolean;
};

export type Vector = {
  x: number;
  y: number;
};

export type Size = {
  height: number;
  width: number;
};

export type Transform = any;
export type Path = any;

export type FrameOffset = {
  node_id: string;
  node_offset: Vector;
};

export type ColorStop = {
  color: Color;
  position: string;
};

export type Strokes = {
  color: Color;
  length: number;
  type: string;
};

export type TypeStyle = {
  fontFamily?: string;
  fontPostScriptName?: string;
  paragraphSpacing?: number;
  paragraphIndent?: number;
  italic?: boolean;
  fills?: Paint[];
  hyperlink?: Hyperlink;
  opentypeFlags?: Map<string, number>;
  fontSize?: number;
  fontWeight?: number;
  letterSpacing?: number;
  lineHeightPx?: number;
  lineHeightPercent?: number;
  lineHeightPercentFontSize?: number;
  lineHeightUnit?: 'PIXELS' | 'FONT_SIZE_%' | 'INTRINSIC_%';
  textAlignHorizontal?: 'LEFT' | 'RIGHT' | 'CENTER' | 'JUSTIFIED';
  textAlignVertical?: 'TOP' | 'CENTER' | 'BOTTOM';
  textCase?: 'LOWER' | 'UPPER' | 'TITLE' | 'SMALL_CAPS' | 'SMALL_CAPS_FORCED';
  textDecoration?: 'STRIKETHROUGH' | 'UNDERLINE';
  textAutoResize?: 'HEIGHT' | 'WIDTH_AND_HEIGHT';
};

export type Component = {
  key: string;
  name: string;
  description: string;
  componentSetId?: string;
  documentationLinks?: string[];
};

export type Components = {
  [key: string]: Component;
};

export type Style = {
  key: string;
  name: string;
  description: string;
  style_type: StyleType;
};

export type StyleType = 'FILL' | 'TEXT' | 'EFFECT' | 'GRID';

export type GradientStop = {
  color: RgbaColor;
  position: number;
};

export type RgbaColor = {
  r: number;
  g: number;
  b: number;
  a: number;
};
