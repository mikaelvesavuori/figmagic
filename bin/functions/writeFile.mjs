import fs from "fs";
import { createFolder } from "./createFolder.mjs";

export function writeFile(file, name, path = "tokens") {
  createFolder(path);
  write();

  function write() {
    const fileName = `${path}/${name}.mjs`;
    const mjsStyle = `const ${name} = ${JSON.stringify(
      file,
      null,
      " "
    )}\n\nexport default ${name};`;
    // const legacyJsStyle = 'module.exports = ' + JSON.stringify(file, null, ' ');

    fs.writeFileSync(fileName, mjsStyle, "utf-8", function(error) {
      if (error) {
        return console.log(error);
      }
    });
  }
}
