import { convertCamelColor } from './colorConversion';

describe('converts color text', () => {
	test('when it has no capital letter in the middle', () => {
		expect(convertCamelColor('Red')).toBe('Red');
	});

	test('when it has one capital letter in the middle', () => {
		expect(convertCamelColor('MidnightBlue')).toBe('Midnight Blue');
	});

	test('when it has more capital letters in the middle', () => {
		expect(convertCamelColor('GreenLightViolet')).toBe('Green Light Violet');
	});
});
