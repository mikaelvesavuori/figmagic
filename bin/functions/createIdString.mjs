import fs from "fs";
import { writeFile } from "./writeFile.mjs";

export function createIdString(ids) {
  let idString = "";

  Object.values(ids).forEach(id => {
    if (!id.startsWith("-")) {
      idString += `${id},`;
    }
  });

  let fixedIds = idString.replace(/:/g, "%3A");
  if (fixedIds.endsWith(",")) {
    fixedIds = fixedIds.substring(0, fixedIds.length - 1);
  }

  const fixedObject = `module.exports = '${JSON.stringify({
    ...ids,
    fixedIds
  })}'`;

  writeFile(fixedObject, "figma", "resolvedImages.js");
}
