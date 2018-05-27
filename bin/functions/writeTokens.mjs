import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';
import { processTokens } from './processTokens.mjs';
import { writeFile } from './writeFile.mjs';

export function writeTokens(tokens, isGrid = false) {
	if (isGrid) {
		const processedValues = processTokens(tokens, 'grid');
		writeFile(processedValues, 'grid');
	} else {
		tokens.forEach(token => {
			let tokenName = camelize(token.name);
			tokenName = formatName(tokenName);

			const processedToken = processTokens(token, tokenName);
			writeFile(processedToken, tokenName);
		});
	}
}
