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
		console.error('No pages provided to createPage()!');
		process.exit(1);
	}
}

function findShortenedNameMatch(originalString, matchString) {
	return originalString.toLowerCase().replace(' ', '') === matchString;
}
