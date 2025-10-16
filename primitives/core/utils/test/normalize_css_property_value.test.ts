import { describe, it, expect } from 'vitest';
import { normalizeCssPropertyValue } from '../src/normalize-css-property-value';

describe('normalize_css_property_value utility', () => {
	 it('should convert numbers to px for normal CSS properties', () => {
    expect(normalizeCssPropertyValue('width', 16)).toBe('16px');
    expect(normalizeCssPropertyValue('height', 0)).toBe('0');
    expect(normalizeCssPropertyValue('margin', 10)).toBe('10px');
  });

  it('should keep unitless properties as numbers', () => {
    expect(normalizeCssPropertyValue('line-height', 1.5)).toBe('1.5');
    expect(normalizeCssPropertyValue('opacity', 1)).toBe('1');
    expect(normalizeCssPropertyValue('z-index', 100)).toBe('100');
    expect(normalizeCssPropertyValue('-webkit-flex-grow', 1)).toBe('1');
  });

  it('should handle CSS custom properties', () => {
    expect(normalizeCssPropertyValue('--my-var', 10)).toBe('10');
    expect(normalizeCssPropertyValue('--my-var', null)).toBe('');
    expect(normalizeCssPropertyValue('--foo', 'bar')).toBe('bar');
  });

  it('should handle null or undefined values', () => {
    expect(normalizeCssPropertyValue('width', null)).toBe('');
    expect(normalizeCssPropertyValue('height', undefined)).toBe('');
  });

  it('should handle boolean values', () => {
    expect(normalizeCssPropertyValue('display', true)).toBe('true');
    expect(normalizeCssPropertyValue('display', false)).toBe('');
  });

  it('should convert strings as-is', () => {
    expect(normalizeCssPropertyValue('margin', '12px')).toBe('12px');
    expect(normalizeCssPropertyValue('color', 'red')).toBe('red');
  });

  it('should work with kebab-case and camelCase interchangeably', () => {
    expect(normalizeCssPropertyValue('line-height', 2)).toBe('2');
    expect(normalizeCssPropertyValue('fontSize', 16)).toBe('16px');
  });

  it('should handle edge numeric cases', () => {
    expect(normalizeCssPropertyValue('width', 0)).toBe('0');
    expect(normalizeCssPropertyValue('opacity', 0)).toBe('0');
    expect(normalizeCssPropertyValue('line-height', 0)).toBe('0'); // unitless
  });

  it('should convert unknown types to string', () => {
    expect(normalizeCssPropertyValue('content', Symbol('test'))).toBe('Symbol(test)');
    expect(normalizeCssPropertyValue('custom', { foo: 'bar' })).toBe('[object Object]');
  });
});
