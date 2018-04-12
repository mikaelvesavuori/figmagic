let creationState = {
	hasCreatedDesignTokensPage: false,
	hasCreatedComponentsPage: false
};

function createPage(figmaPages) {
	let correctPage = undefined;
	let isMatchFound = false;

	function findShortenedNameMatch(originalString, matchString) {
		return originalString.toLowerCase().replace(' ', '') === matchString;
	}

	figmaPages.forEach(page => {
		if (!isMatchFound) {
			if (
				(findShortenedNameMatch(page.name, 'designtokens') &&
					creationState.hasCreatedDesignTokensPage === false) ||
				(findShortenedNameMatch(page.name, 'components') &&
					creationState.hasCreatedComponentsPage === false)
			) {
				isMatchFound = true;
				foundMatch(page);
			}
		}

		function foundMatch(page) {
			if (page.name.toLowerCase().replace(' ', '') === 'designtokens') {
				creationState.hasCreatedDesignTokensPage = true;
				correctPage = page;
			} else if (page.name.toLowerCase().replace(' ', '') === 'components') {
				creationState.hasCreatedComponentsPage = true;
				correctPage = page.children[0].children;
			}
		}
	});

	return correctPage;
}

module.exports = createPage;
