import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';
import { processTokens } from './processTokens.mjs';
import { writeFile } from './writeFile.mjs';

/**
 * Write tokens to file
 *
 * @exports
 * @function
 * @param {Array} tokens - The final array of design tokens
 * @param {string} format - The file format as a string
 * @returns {void} - Will write file to disk through writeFile()
 * @throws {Error} - When no than one token is provided
 */
export function writeTokens(tokens, format) {
	if (tokens.length > 0) {
		tokens.forEach(token => {
			let tokenName = camelize(token.name);
			tokenName = formatName(tokenName);

			const processedToken = processTokens(token, tokenName);

			writeFile(processedToken, 'tokens', tokenName, true, format);
		});
	} else {
		throw new Error('Less than one token provided to writeTokens()!');
	}
}
