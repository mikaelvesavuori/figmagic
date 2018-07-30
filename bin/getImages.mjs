import request from "request";
import { writeFile } from "./functions/writeFile.mjs";
import imagesJson from "../figma/resolvedImages.js"; // For dev: '../figma/resolvedImages.js'; For package use: '../../../figma/resolvedImages.js'
import keys from "./meta/keys.mjs";

const figmaUrl = keys.url;
const figmaToken = keys.token;
const resolvedImages = JSON.parse(imagesJson);
const resolvedImageIds = resolvedImages.fixedIds;

const fileFormat = (() => {
  if (process.argv[2] === "--graphics") {
    return "svg";
  } else {
    return "png";
  }
})();

const invalidKeys = (() => {
  if (
    figmaUrl === undefined ||
    figmaUrl === null ||
    figmaUrl === "" ||
    figmaToken === undefined ||
    figmaToken === null ||
    figmaToken === ""
  ) {
    return true;
  } else {
    return false;
  }
})();

if (invalidKeys) {
  console.warn("Invalid or non-existing values in bin/meta/keys.mjs!");
} else {
  const options = {
    url: `https://api.figma.com/v1/images/${figmaUrl}?ids=${resolvedImageIds}&format=${fileFormat}&scale=2`,
    headers: {
      "X-Figma-Token": figmaToken
    }
  };

  request(options, callback);
}

function callback(error, response, body) {
  if (!error && response.statusCode === 200) {
    const _body = JSON.parse(body);
    let namedComponentsWithImages = {};

    // Find a match
    Object.keys(_body.images).forEach((id, index) => {
      Object.values(resolvedImages).forEach((imgId, indexInner) => {
        if (imgId === id) {
          const imageUrl = Object.values(_body.images)[index];
          const componentName = Object.keys(resolvedImages)[indexInner];
          namedComponentsWithImages[componentName] = imageUrl;
        }
      });
    });

    writeFile(
      JSON.stringify(namedComponentsWithImages),
      "figma",
      "images.json"
    );
  } else {
    console.warn(error);
  }
}
