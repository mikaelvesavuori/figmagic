import { writeFile } from './writeFile.mjs';
import fetch from 'node-fetch';

/**
 * Get data from API
 *
 * @exports
 * @async
 * @function
 * @returns {object} - The fetched data inside of an object
 */
export async function getFromApi() {
	let data = {};

	const url = 'https://api.figma.com/v1/files/' + process.env.FIGMA_URL;

	await fetch(url, {
		headers: {
			'X-Figma-Token': process.env.FIGMA_TOKEN
		}
	})
		.then(res => res.json())
		.then(json => {
			data = json;
			writeFile(JSON.stringify(json), 'figma', 'figma.json');
		});

	return data;
}
