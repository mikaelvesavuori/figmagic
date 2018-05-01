const setupGridTokens = require('./setupGridTokens.js');
const setupColorTokens = require('./setupColorTokens.js');
const setupSpacingTokens = require('./setupSpacingTokens.js');
const setupFontTokens = require('./setupFontTokens.js');
const setupFontSizeTokens = require('./setupFontSizeTokens.js');
const setupLineHeightTokens = require('./setupLineHeightTokens.js');
//const setupTypographyTokens = require('./setupTypographyTokens.js');

function processTokens(sheet, name) {
	const _name = name.toLowerCase();
	let processedTokens = undefined;

	// Grid
	if (_name === 'grid') {
		processedTokens = setupGridTokens(sheet);
	}

	// Design tokens
	if (_name === 'color' || _name === 'colour' || _name === 'colors' || _name === 'colours') {
		processedTokens = setupColorTokens(sheet);
	}
	if (_name === 'spacing' || _name === 'spacings') {
		processedTokens = setupSpacingTokens(sheet);
	}
	if (_name === 'fontfamily' || _name === 'fontfamilies') {
		processedTokens = setupFontTokens(sheet);
	}
	if (_name === 'fontsize' || _name === 'fontsizes') {
		processedTokens = setupFontSizeTokens(sheet);
	}
	if (_name === 'lineheight' || _name === 'lineheights') {
		processedTokens = setupLineHeightTokens(sheet);
	}
	/*
	if (name === 'typography')) {
		processedTokens = setupTypographyTokens(sheet);
	}
	*/

	return processedTokens;
}

module.exports = processTokens;
