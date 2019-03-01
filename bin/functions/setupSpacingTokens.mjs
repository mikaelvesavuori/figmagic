import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';
import { normalizeUnits } from './normalizeUnits.mjs';

export function setupSpacingTokens(spacingFrame) {
	if (spacingFrame) {
		const spacings = spacingFrame.children;
		const spacingObject = {};

		spacings.forEach(spacing => {
			let normalizedName = camelize(spacing.name);
			normalizedName = formatName(normalizedName);
			const normalizedUnit = normalizeUnits(spacing.absoluteBoundingBox.width, 'px', 'em');
			spacingObject[normalizedName] = normalizedUnit;
		});

		return spacingObject;
	} else {
		console.error('No frame for setupSpacingTokens()!');
		process.exit(1);
	}
}
