import fs from 'fs';

export function createFolder(dir) {
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}
}
