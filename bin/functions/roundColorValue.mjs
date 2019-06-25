export function roundColorValue(quantity, scale = 255) {
	return (parseFloat(quantity) * parseInt(scale)).toFixed(0);
}
