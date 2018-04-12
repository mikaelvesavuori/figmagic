const fs = require('fs');
const request = require('request');

const resolvedImages = JSON.parse(require(`${process.cwd()}/figma/resolvedImages.js`));
const resolvedImageIds = resolvedImages.fixedIds;

const options = {
	url: `https://api.figma.com/v1/images/{FILE}?ids=${resolvedImageIds}&format=png&scale=2`,
	headers: {
		'X-Figma-Token': '{TOKEN}'
	}
};

function callback(error, response, body) {
	if (!error && response.statusCode === 200) {
		const _body = JSON.parse(body);
		let namedComponentsWithImages = {};

		// Find a match
		Object.keys(_body.images).forEach((id, index) => {
			Object.values(resolvedImages).forEach((imgId, indexInner) => {
				if (imgId === id) {
					const imageUrl = Object.values(_body.images)[index];
					const componentName = Object.keys(resolvedImages)[indexInner];
					namedComponentsWithImages[componentName] = imageUrl;
				}
			});
		});

		/* TODO:
		** Use ./writeFile.js instead?
		*/

		fs.writeFile(
			`${process.cwd()}/figma/images.json`,
			JSON.stringify(namedComponentsWithImages),
			'utf-8',
			function(error) {
				if (error) {
					return console.log(error);
				}
			}
		);
	} else {
		console.warn(error);
	}
}

request(options, callback);
