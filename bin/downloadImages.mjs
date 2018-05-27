import 'fs' from 'fs';
import 'request' from 'request';
import { createFolder } from './functions/createFolder.mjs';

export function downloadImages() {
	fs.readFile(`${process.cwd()}/figma/images.json`, 'utf-8', function read(error, data) {
		if (error) {
			console.warn(error);
		} else {
			const _data = JSON.parse(data);
			let downloadableImages = [];

			Object.values(_data).forEach(image => {
				downloadableImages.push(image);
			});

			// Make sure to create folders or the downloads will fail
			createFolder('./specs');
			createFolder('./specs/images/');

			downloadableImages.forEach((image, index) => {
				const imageName = Object.keys(_data)[index];
				download(image, `specs/images/${imageName}.jpg`, function() {
					console.log(`Downloaded image: ${imageName}`);
				});
			});
		}
	});
}

const download = function(uri, filename, callback) {
	request.head(uri, function(err, res, body) {
		request(uri)
			.pipe(fs.createWriteStream(filename))
			.on('close', callback);
	});
};