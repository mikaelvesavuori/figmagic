import fs from "fs";
import request from "request";
import { createFolder } from "./functions/createFolder.mjs";

export function downloadImages() {
  const downloadGraphics = (() => process.argv[2] === "--graphics")();

  fs.readFile(`${process.cwd()}/figma/images.json`, "utf-8", function read(
    error,
    data
  ) {
    if (error) {
      console.warn(error);
    } else {
      const parsedData = JSON.parse(data);
      let downloadableImages = [];

      Object.values(parsedData).forEach(image => {
        downloadableImages.push(image);
      });

      createFolder("./specs");
      if (downloadGraphics) {
        createFolder("./specs/graphics/");
      } else {
        createFolder("./specs/images/");
      }

      downloadableImages.forEach((image, index) => {
        const imageName = Object.keys(parsedData)[index];
        let imagePath;
        if (downloadGraphics) {
          imagePath = `specs/graphics/${imageName}.svg`;
        } else {
          imagePath = `specs/images/${imageName}.png`;
        }

        download(image, imagePath, () => {
          console.log(`Downloaded image: ${imageName}`);
        });
      });
    }
  });

  function download(uri, filename, callback) {
    request.head(uri, function(err, res, body) {
      request(uri)
        .pipe(fs.createWriteStream(filename))
        .on("close", callback);
    });
  }
}

downloadImages();
