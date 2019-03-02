// Use these if you want to create tokens from the local file, else we assume that you want tokens from returned data from a Figma API fetch
// import figmaDocument from './figma/figma.json';
// figmaDocument.document.children

export function createPage(figmaPages) {
	let hasCreatedDesignTokensPage = false;

	if (figmaPages && figmaPages.length > 0) {
		let correctPage = undefined;
		let isMatchFound = false;

		figmaPages.forEach(page => {
			if (!isMatchFound) {
				if (
					findShortenedNameMatch(page.name, 'designtokens') &&
					hasCreatedDesignTokensPage === false
				) {
					isMatchFound = true;
					foundMatch(page);
				}
			}

			function foundMatch(page) {
				const fixedPageName = page.name.toLowerCase().replace(' ', '');

				if (fixedPageName === 'designtokens') {
					hasCreatedDesignTokensPage = true;
					correctPage = page;
				}
			}
		});

		return correctPage;
	} else {
		throw new Error('No pages provided to createPage()!');
	}
}

export function findShortenedNameMatch(originalString, matchString) {
	if (originalString) {
		if (matchString) {
			return originalString.toLowerCase().replace(' ', '') === matchString;
		} else throw new Error('No "matchString" was provided to findShortenedNameMatch()!');
	} else throw new Error('No "originalString" was provided to findShortenedNameMatch()!');
}
