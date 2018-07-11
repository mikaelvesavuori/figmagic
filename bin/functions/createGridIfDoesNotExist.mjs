import fs from "fs";
fs.exists("./tokens/grid.mjs", function(exists) {
  if (exists) {
    console.log("Grid exists");
    return true;
  } else {
    console.log("Grid does not exist");
    if (!fs.existsSync("tokens")) {
      fs.mkdirSync("tokens");
    }

    fs.writeFile(
      "tokens/grid.mjs",
      "const grid = {\n\n}\n\nexport default grid;",
      "utf-8",
      function(error) {
        if (error) {
          return console.log(error);
        }
      }
    );
  }
});
