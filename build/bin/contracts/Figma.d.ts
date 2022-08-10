export declare type FigmaNode = {
    id: string;
    name: string;
    visible: boolean;
    type: string;
    pluginData: any;
    sharedPluginData: any;
};
export declare type DOCUMENT = {
    children: FigmaNode[];
};
export declare type CANVAS = {
    children: FigmaNode[];
    backgroundColor: Color;
    prototypeStartNodeID: string;
    exportSettings: ExportSetting[];
};
export interface FRAME {
    absoluteBoundingBox?: Rectangle;
    blendMode?: BlendMode;
    background?: Paint[];
    backgroundColor?: Color;
    characters?: string;
    children?: FRAME[];
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
    overflowDirection?: 'HORIZONTAL_SCROLLING' | 'VERTICAL_SCROLLING' | 'HORIZONTAL_AND_VERTICAL_SCROLLING';
    preserveRatio?: boolean;
    rectangleCornerRadii?: number[];
    relativeTransform?: Transform;
    size?: Vector;
    strokeAlign?: 'INSIDE' | 'OUTSIDE' | 'CENTER';
    strokeWeight?: number;
    strokes?: Paint[];
    style?: any;
    styles?: any;
    transitionDuration?: number;
    transitionEasing?: EasingType;
    transitionNodeID?: string;
    type: string;
    verticalPadding?: number;
    characterStyleOverrides?: number[];
    styleOverrideTable?: any;
    layoutVersion?: number;
    prototypeStartNodeID?: any;
    prototypeDevice?: any;
}
export declare type GROUP = FRAME;
export declare type VECTOR = {
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
export declare type STAR = VECTOR;
export declare type LINE = VECTOR;
export declare type ELLIPSE = VECTOR;
export declare type REGULAR_POLYGON = VECTOR;
export interface RECTANGLE extends VECTOR {
    cornerRadius: number;
    rectangleCornerRadii: number[];
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
export declare type SLICE = {
    absoluteBoundingBox: Rectangle;
    exportSettings: ExportSetting;
    relativeTransform: Transform;
    size: Vector;
};
export declare type COMPONENT = VECTOR;
export interface INSTANCE extends FRAME {
    componentId: string;
}
export declare type Color = {
    a: number;
    b: number;
    g: number;
    r: number;
};
export declare type ExportSetting = {
    constraint: Constraint;
    format: 'JPG' | 'PNG' | 'SVG';
    suffix: string;
};
export declare type Constraint = {
    type: 'SCALE' | 'WIDTH' | 'HEIGHT';
    value: number;
};
export declare type Rectangle = {
    height?: number;
    width?: number;
    x?: number;
    y?: number;
};
export declare type BlendMode = 'PASS_THROUGH' | 'NORMAL' | 'DARKEN' | 'MULTIPLY' | 'LINEAR_BURN' | 'COLOR_BURN' | 'LIGHTEN' | 'SCREEN' | 'LINEAR_DODGE' | 'COLOR_DODGE' | 'OVERLAY' | 'SOFT_LIGHT' | 'HARD_LIGHT' | 'DIFFERENCE' | 'EXCLUSION' | 'HUE' | 'SATURATION' | 'COLOR' | 'LUMINOSITY';
export declare type EasingType = 'EASE_IN' | 'EASE_OUT' | 'EASE_IN_AND_OUT' | 'LINEAR';
export declare type LayoutConstraint = {
    vertical?: 'TOP' | 'BOTTOM' | 'CENTER' | 'TOP_BOTTOM' | 'SCALE';
    horizontal?: 'LEFT' | 'RIGHT' | 'CENTER' | 'LEFT_RIGHT' | 'SCALE';
};
export declare type LayoutGrid = {
    color: Color;
    pattern: 'COLUMNS' | 'ROWS' | 'GRID';
    sectionSize: number;
    visible: boolean;
    alignment: 'MIN' | 'STRETCH' | 'CENTER';
    count: number;
    gutterSize: number;
    offset: number;
};
export declare type Effect = {
    radius: number;
    type: 'INNER_SHADOW' | 'DROP_SHADOW' | 'LAYER_BLUR' | 'BACKGROUND_BLUR';
    visible: boolean;
    blendMode: BlendMode;
    color: Color;
    offset: Vector;
};
export declare type Hyperlink = {
    type: 'URL' | 'NODE';
    url: string;
    nodeID: string;
};
export declare type Paint = {
    opacity?: number;
    position?: string;
    type?: 'SOLID' | 'GRADIENT_LINEAR' | 'GRADIENT_RADIAL' | 'GRADIENT_ANGULAR' | 'GRADIENT_DIAMOND' | 'IMAGE' | 'EMOJI';
    gradientStops?: GradientStop[];
    color?: Color;
    blendMode?: BlendMode;
    gradientHandlePositions?: Vector | Vector[];
    ColorStop?: ColorStop[];
    gifRef?: string;
    imageRef?: string;
    imageTransform?: Transform;
    rotation?: number;
    scaleMode?: 'FILL' | 'FIT' | 'TILE' | 'STRETCH';
    scalingFactor?: number;
    visible?: boolean;
};
export declare type Vector = {
    x: number;
    y: number;
};
export declare type Size = {
    height: number;
    width: number;
};
export declare type Transform = any;
export declare type Path = any;
export declare type FrameOffset = {
    node_id: string;
    node_offset: Vector;
};
export declare type ColorStop = {
    color: Color;
    position: string;
};
export declare type Strokes = {
    color: Color;
    length: number;
    type: string;
};
export declare type TypeStyle = {
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
export declare type Component = {
    key: string;
    name: string;
    description: string;
    componentSetId: string;
    documentationLinks: string[];
};
export declare type Components = {
    [key: string]: Component;
};
export declare type Style = {
    key: string;
    name: string;
    description: string;
    style_type: StyleType;
};
export declare type StyleType = 'FILL' | 'TEXT' | 'EFFECT' | 'GRID';
export declare type GradientStop = {
    color: RgbaColor;
    position: number;
};
export declare type RgbaColor = {
    r: number;
    g: number;
    b: number;
    a: number;
};
