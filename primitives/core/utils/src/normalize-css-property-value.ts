export const UNITLESS_PROPERTIES = new Set([
	// flex box related properties
	'flex',
	'flex-grow',
	'flex-shrink',
	'flex-basis',
	// grid related properties
	'grid-row',
	'grid-column',
	'grid-row-start',
	'grid-row-end',
	'grid-column-start',
	'grid-column-end',

	// typography related properties
	'font-weight',
	'line-height',
	'line-clamp',

	// misc
	'animation-iteration-count',
	'column-count',
	'columns',
	'counter-increment',
	'counter-reset',
	'border-image-slice',
	'border-image-width',
	'opacity',
	'orphans',
	'tab-size',
	'widows',
	'z-index',
	'zoom',
	'scale',

	// SVG-related properties
	'fill-opacity',
	'flood-opacity',
	'stroke-dasharray',
	'stroke-dashoffset',
	'stroke-miterlimit',
	'stroke-opacity',
	'stroke-width',
]);

// Vendor prefixes to include
const prefixes = ['-webkit-', '-moz-', '-ms-', '-o-'];
for (const prop of Array.from(UNITLESS_PROPERTIES)) {
	for (const prefix of prefixes) {
		UNITLESS_PROPERTIES.add(prefix + prop);
	}
}

/**
 * Takes a camelCased string and returns a hyphenated string
 * @param {string} property - normalized CSS property name (kebab-case or custom prop `--foo`)
 * @param {any} value
 * @returns {string}
 * normalize_css_property_value('width', 16)   //"16px"
 * normalize_css_property_value('line-height', 1.5)     // "1.5"  (unitless)
 * normalize_css_property_value('opacity', 1)           // "1"    (unitless)
 * normalize_css_property_value('-webkit-flex-grow', 1)           // "1"    (Vendor prefixes unitless)
 * normalize_css_property_value('--my-var', 10) // "10"
 * normalize_css_property_value('margin', '12px') // "12px"
 * normalize_css_property_value('color', null)          // ""
 */
export function normalizeCssPropertyValue(property, value) {
	if (typeof property === 'string' && property.startsWith('--')) {
		return value == null ? '' : String(value);
	}

	if (value == null) return '';

	if (typeof value === 'boolean') {
		return value ? 'true' : '';
	}

	if (typeof value === 'number') {
		if (value === 0) return '0';
		if (UNITLESS_PROPERTIES.has(property)) return String(value);
		return `${value}px`;
	}

	return String(value)
}


/** @type {Map<string, string>} */
const normalized_properties_cache = new Map();

/**
 * Takes a camelCased string and returns a hyphenated string
 * @param {string} str
 * @returns {string}
 * @example
 * normalize_css_property_name('backgroundColor') // 'background-color'
 */
export function normalizeCssPropertyName(str) {
	if (str.startsWith('--')) return str;

	let normalized_result = normalized_properties_cache.get(str);
	if (normalized_result != null) {
		return normalized_result;
	}

	normalized_result = str.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
	normalized_properties_cache.set(str, normalized_result);

	return normalized_result;
}

export function normalizeStyleObject(style) {
	if(typeof style !== "object") return style;
	const normalize = {};
	for (let [property, value] of Object.entries(style)) {
		const normalizeProperty = normalizeCssPropertyName(property)
		normalize[normalizeProperty] = normalizeCssPropertyValue(normalizeProperty, value)
	}
	return normalize;
}