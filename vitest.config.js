import { configDefaults, defineConfig } from 'vitest/config';
import viteConfig from './vite.config';
import path from 'node:path';

export default defineConfig({
	plugins: viteConfig.plugins,
	resolve: {
		alias: {
			'@': './src',
		},
		conditions: ['browser'],
	},
	test: {
		globals: true,
		setupFiles: [path.join(__dirname, './scripts/setup-tests.ts')],
		include: ['**/*.test.ripple', '**/*.test.ts'],
		environment: 'jsdom',
		...configDefaults.test,
	},
});
