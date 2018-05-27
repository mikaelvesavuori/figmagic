import fs from 'fs';
import { createFolder } from './createFolder.mjs';

export function writeFile(file, name, path = 'tokens') {
	createFolder(path);
	write();

	function write() {
		const fileName = `${path}/${name}.js`;

		fs.writeFileSync(
			fileName,
			'module.exports = ' + JSON.stringify(file, null, ' '),
			'utf-8',
			function(error) {
				if (error) {
					return console.log(error);
				}
			}
		);
	}
}
