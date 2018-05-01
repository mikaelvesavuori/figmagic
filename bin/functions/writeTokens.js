const camelize = require('./camelize.js');
const formatName = require('./formatName.js');
const processTokens = require('./processTokens.js');
const writeFile = require('./writeFile.js');

function writeTokens(tokens, isGrid = false) {
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

module.exports = writeTokens;
