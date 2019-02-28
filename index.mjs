#!/bin/sh
":"; //#; exec /usr/bin/env node --experimental-modules --no-warnings "$0" "$@"

import { createFolder } from "./bin/functions/createFolder.mjs";
import { getFromApi } from "./bin/functions/getFromApi.mjs";
import { createPage } from "./bin/functions/createPage.mjs";
import { writeTokens } from "./bin/functions/writeTokens.mjs";

import rimraf from "rimraf";
import dotenv from "dotenv";
dotenv.config();

(async () => {
  rimraf("./tokens", () => {});
  rimraf("./figma", () => {});

  createFolder("tokens");
  createFolder("figma");

  const data = await getFromApi();
  const tokens = createPage(data.document.children);
  writeTokens(tokens.children);
})();
