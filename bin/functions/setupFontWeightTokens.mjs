import { camelize } from "./camelize.mjs";
import { formatName } from "./formatName.mjs";

export function setupFontWeightTokens(frame) {
  if (frame) {
    let fontWeightObject = {};

    frame.children.forEach(type => {
      let name = camelize(type.name);
      name = formatName(name);
      const fontWeight = type.style.fontWeight;

      fontWeightObject[name] = fontWeight;
    });

    return fontWeightObject;
  } else console.error("No frame for setupFontWeightTokens()!");
}
