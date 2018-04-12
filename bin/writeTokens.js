const camelize = require('./camelize.js');
const processTokens = require('./processTokens.js');
const writeFile = require('./writeFile.js');

function writeTokens(tokens) {
	tokens.forEach(token => {
		const tokenName = camelize(token.name);
		const processedToken = processTokens(token, tokenName);
		writeFile(processedToken, tokenName);
	});
}

module.exports = writeTokens;
