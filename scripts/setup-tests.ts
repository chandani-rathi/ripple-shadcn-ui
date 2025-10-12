import '@testing-library/jest-dom/vitest';
import * as axeMatchers from 'vitest-axe/matchers';
import { expect } from 'vitest';
import { beforeEach, afterEach } from 'vitest';
import { mount } from 'ripple';
import dom from '@testing-library/dom';
expect.extend(axeMatchers);

global.ResizeObserver = class ResizeObserver {
  cb: any;
  constructor(cb: any) {
    this.cb = cb;
  }
  observe() {
    this.cb([{ borderBoxSize: { inlineSize: 0, blockSize: 0 } }]);
  }
  unobserve() {}
  disconnect() {}
};


/**
 * @param {() => void} component 
 */
globalThis.render = function render(component) {
	mount(component, {
		target: /** @type {HTMLDivElement} */ (globalThis.container)
	});
}

beforeEach(() => {
	globalThis.container = /** @type {HTMLDivElement} */ (document.createElement('div'));
	document.body.appendChild(globalThis.container);
  Object.keys(dom.queries).forEach(
    query => {
      globalThis.container[query] = (...params) => dom.queries[query](globalThis.container, ...params);
    }
  )
	globalThis.error = undefined;
});

afterEach(() => {
	// Container is guaranteed to exist in all tests, so it was easier to type it without undefined.
	// And when we unset it, we just type-cast it to HTMLDivElement to avoid TS errors, because we
	// know it's guaranteed to exist in the next test again.
	document.body.removeChild(/** @type {HTMLDivElement} */ (globalThis.container));
	globalThis.container = /** @type {HTMLDivElement} */ (/** @type {unknown} */(undefined));

	globalThis.error = undefined;
});