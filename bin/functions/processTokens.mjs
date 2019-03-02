import { setupColorTokens } from './setupColorTokens.mjs';
import { setupSpacingTokens } from './setupSpacingTokens.mjs';
import { setupFontTokens } from './setupFontTokens.mjs';
import { setupFontSizeTokens } from './setupFontSizeTokens.mjs';
import { setupFontWeightTokens } from './setupFontWeightTokens.mjs';
import { setupLineHeightTokens } from './setupLineHeightTokens.mjs';

export function processTokens(sheet, name) {
	if (sheet && name) {
		const _name = name.toLowerCase();
		let processedTokens = undefined;

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
		if (_name === 'fontweight' || _name === 'fontweights') {
			processedTokens = setupFontWeightTokens(sheet);
		}
		if (_name === 'lineheight' || _name === 'lineheights') {
			processedTokens = setupLineHeightTokens(sheet);
		}

		return processedTokens;
	} else {
		throw new Error('No sheet or name for processTokens()!');
	}
}
