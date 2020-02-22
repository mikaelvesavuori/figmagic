import { roundColorValue } from '../bin/functions/roundColorValue';

test('It should round a color value into a single decimal', () => {
	expect(roundColorValue(0.5176470875740051, 255)).toBe('132');
});

test('Full value (1) should be 255', () => {
	expect(roundColorValue(1.0, 255)).toBe('255');
});

test('Zero value (0) should be 0', () => {
	expect(roundColorValue(0.0, 255)).toBe('0');
});
