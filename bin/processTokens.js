const setupColorTokens = require('./setupColorTokens.js');
const setupGridTokens = require('./setupGridTokens.js');
const setupSpacingTokens = require('./setupSpacingTokens.js');
const setupFontTokens = require('./setupFontTokens.js');
const setupFontSizeTokens = require('./setupFontSizeTokens.js');
const setupLineHeightTokens = require('./setupLineHeightTokens.js');
//const setupTypographyTokens = require('./setupTypographyTokens.js');

function processTokens(sheet, name) {
	const _name = name.toLowerCase();
	let processedTokens = undefined;

	if (_name === 'colors' || _name === 'colours') {
		processedTokens = setupColorTokens(sheet);
	}
	if (_name === 'grid') {
		processedTokens = setupGridTokens(sheet);
	}
	if (_name === 'spacing' || _name === 'spacings') {
		processedTokens = setupSpacingTokens(sheet);
	}
	if (_name === 'fonts') {
		processedTokens = setupFontTokens(sheet);
	}
	if (_name === 'fontsizes') {
		processedTokens = setupFontSizeTokens(sheet);
	}
	if (_name === 'lineheights') {
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
