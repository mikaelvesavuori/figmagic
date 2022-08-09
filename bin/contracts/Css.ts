export type Css = {
  css: string;
  imports: string[];
};

export type ProcessedSelfnamedCss = {
  updatedCss: string;
  updatedImports: string[];
};

export type IntersectingCssValues = string[];

export type UniqueCssValues = {
  css: string[];
  className: string;
};
