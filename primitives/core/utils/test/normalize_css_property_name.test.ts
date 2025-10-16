import { describe, it, expect } from 'vitest';
import { normalizeCssPropertyName } from '../src/normalize-css-property-value';

describe('normalizeCssPropertyName utility', () => {
	it('should convert camelCase to kebab-case', () => {
		expect(normalizeCssPropertyName('backgroundColor')).toBe('background-color');
		expect(normalizeCssPropertyName('fontSize')).toBe('font-size');
		expect(normalizeCssPropertyName('marginTop')).toBe('margin-top');
		expect(normalizeCssPropertyName('borderRadius')).toBe('border-radius');
	});

	it('should handle multiple uppercase letters', () => {
		expect(normalizeCssPropertyName('WebkitTransform')).toBe('-webkit-transform');
		expect(normalizeCssPropertyName('MozAppearance')).toBe('-moz-appearance');
	});

	it('should preserve CSS custom properties (starting with --)', () => {
		expect(normalizeCssPropertyName('--custom-property')).toBe('--custom-property');
		expect(normalizeCssPropertyName('--myColor')).toBe('--myColor');
		expect(normalizeCssPropertyName('--themePrimary')).toBe('--themePrimary');
	});

	it('should handle already lowercase properties', () => {
		expect(normalizeCssPropertyName('color')).toBe('color');
		expect(normalizeCssPropertyName('display')).toBe('display');
		expect(normalizeCssPropertyName('position')).toBe('position');
		expect(normalizeCssPropertyName('z-index')).toBe('z-index');
	});

	it('should handle consecutive uppercase letters', () => {
		expect(normalizeCssPropertyName('HTMLElement')).toBe('-h-t-m-l-element');
	});

	it('should handle empty string', () => {
		expect(normalizeCssPropertyName('')).toBe('');
	});

	it('should handle complex property names', () => {
		expect(normalizeCssPropertyName('borderTopLeftRadius')).toBe('border-top-left-radius');
		expect(normalizeCssPropertyName('textDecorationColor')).toBe('text-decoration-color');
	});
});

