#! /usr/bin/env node

// Function requires
const createIds = require('./functions/createIds.js');
const createPage = require('./functions/createPage.js');
const writeTokens = require('./functions/writeTokens.js');
const writeComponents = require('./functions/writeComponents.js');
const setupComponents = require('./functions/setupComponents.js');

// Refs
const figmaDocument = require(`${process.cwd()}/figma/figma.json`);
const figmaPages = figmaDocument.document.children;
const figmaComponents = figmaDocument.components;

// Page setup
let pageNames = ['grid', 'designtokens', 'components'];
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
