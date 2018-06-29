import { setupGridTokens } from "./setupGridTokens.mjs";
import { setupColorTokens } from "./setupColorTokens.mjs";
import { setupSpacingTokens } from "./setupSpacingTokens.mjs";
import { setupFontTokens } from "./setupFontTokens.mjs";
import { setupFontSizeTokens } from "./setupFontSizeTokens.mjs";
import { setupFontWeightTokens } from "./setupFontWeightTokens.mjs";
import { setupLineHeightTokens } from "./setupLineHeightTokens.mjs";
//import { setupTypographyTokens } from './setupTypographyTokens.mjs';

export function processTokens(sheet, name) {
  const _name = name.toLowerCase();
  let processedTokens = undefined;

  // Grid
  if (_name === "grid") {
    processedTokens = setupGridTokens(sheet);
  }

  // Design tokens
  if (
    _name === "color" ||
    _name === "colour" ||
    _name === "colors" ||
    _name === "colours"
  ) {
    processedTokens = setupColorTokens(sheet);
  }
  if (_name === "spacing" || _name === "spacings") {
    processedTokens = setupSpacingTokens(sheet);
  }
  if (_name === "fontfamily" || _name === "fontfamilies") {
    processedTokens = setupFontTokens(sheet);
  }
  if (_name === "fontsize" || _name === "fontsizes") {
    processedTokens = setupFontSizeTokens(sheet);
  }
  if (_name === "fontweight" || _name === "fontweights") {
    processedTokens = setupFontWeightTokens(sheet);
  }
  if (_name === "lineheight" || _name === "lineheights") {
    processedTokens = setupLineHeightTokens(sheet);
  }
  /*
	if (name === 'typography')) {
		processedTokens = setupTypographyTokens(sheet);
	}
	*/

  return processedTokens;
}
