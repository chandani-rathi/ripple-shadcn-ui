import { defineConfig } from 'vitest/config';
import viteConfig from './vite.config';
import vitestConfig from '../../../vitest.config';
import path from 'node:path';

export default defineConfig({
	plugins: viteConfig.plugins,
	resolve: {
		...viteConfig.resolve,
		alias: {
			'@ripple-primitives/primitive': path.resolve(__dirname, '../../core', 'primitive', 'src'),
			'@ripple-primitives/primitive-ui': path.resolve(__dirname, '../', 'primitive', 'src'),
		},
		conditions: ['browser'],
	},
	test: vitestConfig.test,
});
