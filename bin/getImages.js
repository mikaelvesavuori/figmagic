const fs = require('fs');
const request = require('request');

const resolvedImages = JSON.parse(require('../figma/resolvedImages.js'));
const resolvedImageIds = resolvedImages.fixedIds;

const options = {
	url: `https://api.figma.com/v1/images/KLLDK9CBSg7eAayiTY3kVqC8?ids=${resolvedImageIds}`,
	headers: {
		'X-Figma-Token': '363-7526bfc3-cb4d-487e-80fe-461679ae1470'
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
					//console.log('Matched ' + imgId + ' @ ' + index);
					//console.log(Object.keys(resolvedImages)[index]);
					namedComponentsWithImages[componentName] = imageUrl;
				}
			});
		});

		/* BUG
		** _body.images and resolvedImages do not align in indexes, thus ending in images with wrong names
		*/

		/*
		Object.keys(_body.images).forEach((key, index) => {
			const componentName = Object.keys(resolvedImages)[index];
			console.log(
				Object.values(_body.images)[index],
				Object.keys(resolvedImages)[index],
				Object.values(resolvedImages)[index]
			);
			namedComponentsWithImages[componentName] = Object.values(_body.images)[index]; // Object.values(resolvedImages)[index];
		});
		*/

		/*
		Object.keys(_body.images).forEach((key, index) => {
			const componentName = Object.keys(resolvedImages)[index];
			console.log(
				Object.values(_body.images)[index],
				Object.keys(resolvedImages)[index],
				Object.values(resolvedImages)[index]
			);
			namedComponentsWithImages[componentName] = Object.values(_body.images)[index]; // Object.values(resolvedImages)[index];
		});
		*/

		//console.log(namedComponentsWithImages);

		/* TODO:
		** Use ./writeFile.js instead?
		*/

		fs.writeFile('figma/images.json', JSON.stringify(namedComponentsWithImages), 'utf-8', function(
			error
		) {
			if (error) {
				return console.log(error);
			}
		});
	} else {
		console.warn(error);
	}
}

request(options, callback);
