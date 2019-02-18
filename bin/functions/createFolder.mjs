import fs from "fs";

export function createFolder(dir) {
  if (dir) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  } else console.error("No directory specified for createFolder()!");
}
