#! /usr/bin/env node

// Function imports
import { createIds } from "./functions/createIds.mjs";
import { createPage } from "./functions/createPage.mjs";
import { writeTokens } from "./functions/writeTokens.mjs";
import { writeComponents } from "./functions/writeComponents.mjs";
import { setupComponents } from "./functions/setupComponents.mjs";

// Refs
import figmaDocument from "../../../figma/figma.json"; // For dev: '../figma/figma.json'; For package use: '../../../figma/figma.json'
const figmaPages = figmaDocument.document.children;
const figmaComponents = figmaDocument.components;

// Page setup
let pageNames = ["grid", "designtokens", "components"];
let pages = {};

pageNames.forEach(page => {
  pages[page] = createPage(figmaPages, page);
});

// Create IDs for components
createIds(figmaComponents);

// Create grid, tokens, components
writeTokens(pages.grid[0], true);
writeTokens(pages.designtokens.children);
writeComponents(setupComponents(figmaComponents, pages.components));

/* TODO
** Add null checking

function displayWarning() {
	console.warn(
		'Sorry but it seems your Figma document does not contain any frames...? Please check that you: 1) have downloaded a JSON file of your document, and 2) made sure the document has frames for the things you wish to tokenize (such as Grid, Typography, Colors...)'
	);
}
*/
