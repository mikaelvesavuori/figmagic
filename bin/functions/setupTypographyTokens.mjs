/*
 ** TODO: Make sure this is single-dimensional, as the current one is multi-dimensional
 */

import units from '../meta/units.mjs';

/**
 * Places all Figma font sizes into a clean object
 *
 * @exports
 * @function
 * @param {object} typographyFrame - The typography frame from Figma
 * @returns {object} - Returns an object with all the font-relating aspects collected
 * @throws {Error} - When there is no provided Figma frame
 */
export function setupTypographyTokens(typographyFrame) {
	if (typographyFrame) {
		let typeTestObject = {};
		let typeObjects = [];

		typographyFrame.children.forEach(type => {
			const fontName = type.name;
			const fontFamily = type.style.fontPostScriptName;
			const fontSize = type.style.fontSize / units.globalRemSize + 'rem';
			const fontWeight = type.style.fontWeight;
			const lineHeight = type.style.lineHeightPercent / 100;

			const typeObject = {
				type: fontName,
				'font-family': fontFamily,
				'font-size': fontSize,
				'font-weight': fontWeight,
				'line-height': lineHeight
			};

			// How to deal with nested information?
			typeTestObject[fontName] = fontSize;

			const content = JSON.stringify(typeObject);
			typeObjects.push(content);
		});

		return typeTestObject;
	} else {
		throw new Error('No frame for setupTypographyTokens()!');
	}
}
