import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';
import { processTokens } from './processTokens.mjs';
import { writeFile } from './writeFile.mjs';

export function writeTokens(tokens, format) {
	if (tokens.length > 0) {
		tokens.forEach(token => {
			let tokenName = camelize(token.name);
			tokenName = formatName(tokenName);

			const processedToken = processTokens(token, tokenName);

			writeFile(processedToken, 'tokens', tokenName, true, format);
		});
	} else {
		console.error('Less than one token provided to writeTokens()!');
		process.exit(1);
	}
}
