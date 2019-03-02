import { writeFile } from './writeFile.mjs';
import fetch from 'node-fetch';

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
