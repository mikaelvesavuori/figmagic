#! /usr/bin/env node

const createPage = require('./createPage.js');
const writeTokens = require('./writeTokens.js');
const writeComponents = require('./writeComponents.js');
const setupComponents = require('./setupComponents.js');

const figmaDocument = require('../figma/figma.json');
const figmaPages = figmaDocument.document.children;
const figmaComponents = figmaDocument.components;

let designtokensPage = createPage(figmaPages, 'designtokens');
let componentsPage = createPage(figmaPages, 'components');

/* TODO
** Add null checking
*/
initIds();
createTokens();
createComponents();

function initIds() {
	const createIds = require('./createIds.js');
	createIds(figmaComponents);
}

function createTokens() {
	const designTokens = designtokensPage.children;
	writeTokens(designTokens);
}

function createComponents() {
	const fixedFigmaComponents = setupComponents(figmaComponents, componentsPage);
	writeComponents(fixedFigmaComponents);
}

/*
function displayWarning() {
	console.warn(
		'Sorry but it seems your Figma document does not contain any frames...? Please check that you: 1) have downloaded a JSON file of your document, and 2) made sure the document has frames for the things you wish to tokenize (such as Grid, Typography, Colors...)'
	);
}
*/
