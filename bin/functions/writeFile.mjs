import fs from "fs";
import { createFolder } from "./createFolder.mjs";

export function writeFile(file, path, name, isToken = false, format) {
  if (file && path && name) {
    createFolder(path);
    write(file, path, name, isToken, format);
  } else
    console.error("Missing required parameters to correctly run writeFile()!");
}

function write(file, path, name, isToken, format) {
  let fileContent = file;
  let filePath = `${path}/${name}`;

  if (isToken) {
    fileContent = `const ${name} = ${JSON.stringify(
      file,
      null,
      " "
    )}\n\nexport default ${name};`;
    filePath += `.${format}`;
  }

  fs.writeFile(filePath, fileContent, "utf-8", function(error) {
    if (error) {
      return console.log(error);
    }
  });
}
