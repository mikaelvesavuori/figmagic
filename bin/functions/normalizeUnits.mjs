import { units } from '../meta/units.mjs';

export function normalizeUnits(value, currentUnit, newUnit) {
	if (value && currentUnit && newUnit) {
		let rootSize = undefined;
		let unitSize = undefined;

		// Set root size
		if (currentUnit === 'px') {
			rootSize = units.globalPxSize;
		}

		// Set root size; Kind of a hack? Not sure if this is going to break anything. Used because of 'unitless'
		if (currentUnit === 'percent') {
			rootSize = units.globalPxSize;
		}

		// Set new unit
		if (newUnit === 'rem' || newUnit === 'em') {
			unitSize = units.globalRemSize;
		}

		if (newUnit === 'unitless') {
			unitSize = value / 100;
		}

		if (rootSize !== undefined && unitSize !== undefined) {
			if (newUnit === 'unitless') {
				return unitSize;
			} else {
				const adjustedValue = value * (rootSize / unitSize);
				return `${adjustedValue}${newUnit}`;
			}
		} else {
			console.warn(
				'normalizeUnits(): rootSize and/or unitSize variables are either undefined or not incoming as px values.'
			);
			return;
		}
	} else {
		throw new Error('Missing parameters for normalizeUnits()!');
	}
}
