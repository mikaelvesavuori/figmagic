import { camelize } from "./camelize.mjs";
import { formatName } from "./formatName.mjs";
import { normalizeUnits } from "./normalizeUnits.mjs";

export function setupLineHeightTokens(frame) {
  if (frame) {
    let lineHeightObject = {};

    frame.children.forEach(type => {
      let name = camelize(type.name);
      name = formatName(name);
      const lineHeight = normalizeUnits(
        type.style.lineHeightPercent,
        "percent",
        "unitless"
      );

      lineHeightObject[name] = lineHeight;
    });

    return lineHeightObject;
  } else console.error("No frame for setupLineHeightTokens()!");
}
