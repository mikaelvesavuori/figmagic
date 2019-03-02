/*
 ** TODO: Make sure this is single-dimensional, as the current one is multi-dimensional
 */

import units from '../meta/units.mjs';

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
