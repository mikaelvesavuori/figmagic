import fs from "fs";
import { createFolder } from "./createFolder.mjs";

export function writeFile(file, path, name, isToken = false) {
  createFolder(path);
  write();

  function write() {
    let fileContent = file;
    let filePath = `${path}/${name}`;

    if (isToken) {
      fileContent = `const ${name} = ${JSON.stringify(
        file,
        null,
        " "
      )}\n\nexport default ${name};`;
      filePath += `.mjs`;
    }

    fs.writeFile(filePath, fileContent, "utf-8", function(error) {
      if (error) {
        return console.log(error);
      }
    });
  }
}
