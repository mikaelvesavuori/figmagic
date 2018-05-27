import fs from 'fs';

export function createIdString(ids) {
	let idString = '';

	Object.values(ids).forEach(id => {
		if (!id.startsWith('-')) {
			idString += `${id},`;
		}
	});

	let fixedIds = idString.replace(/:/g, '%3A');
	if (fixedIds.endsWith(',')) {
		fixedIds = fixedIds.substring(0, fixedIds.length - 1);
	}

	const fixedObject = JSON.stringify({ ...ids, fixedIds });

	/* TODO:
	** Use ./writeFile.js instead?
	*/

	fs.writeFile(
		`${process.cwd()}/figma/resolvedImages.js`,
		`module.exports = '${fixedObject}'`,
		'utf-8',
		function(error) {
			if (error) {
				return console.log('ERROR: ' + error);
			}
		}
	);
}
