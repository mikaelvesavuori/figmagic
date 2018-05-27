import fs from 'fs';
import request from 'request';
import imagesJson from '../figma/resolvedImages.js';
import keys from './meta/keys.mjs';

const figmaUrl = keys.url;
const figmaToken = keys.token;
const resolvedImages = JSON.parse(imagesJson);
const resolvedImageIds = resolvedImages.fixedIds;

const invalidKeys = (() => {
	if (
		figmaUrl === undefined ||
		figmaUrl === null ||
		figmaUrl === '' ||
		figmaToken === undefined ||
		figmaToken === null ||
		figmaToken === ''
	) {
		return true;
	} else {
		return false;
	}
})();

if (invalidKeys) {
	console.warn('Invalid or non-existing values in bin/meta/keys.mjs!');
} else {
	const options = {
		url: `https://api.figma.com/v1/images/${figmaUrl}?ids=${resolvedImageIds}&format=png&scale=2`,
		headers: {
			'X-Figma-Token': figmaToken
		}
	};

	request(options, callback);
}

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
		** Use ./writeFile.mjs instead?
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
