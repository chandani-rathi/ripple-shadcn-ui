import { defineConfig } from 'vite';
import { ripple } from 'vite-plugin-ripple';
import path from "node:path"

export default defineConfig({
	plugins: [ripple()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@ripple-primitives/primitive': path.resolve(__dirname, '../../core', 'primitive', 'src'),
			'@ripple-primitives/primitive-ui': path.resolve(__dirname, '../', 'primitive', 'src'),
		},
	},
	build: {
		target: 'esnext',
		manifest: false,
		minify: false,
		lib: {
			entry: 'src/index.ts',
			fileName: (format) => `index.${format}.js`,
			formats: ['es', 'cjs'],
		},
		rollupOptions: {
			input: 'src/index.ts',
			output: {
				dir: 'dist',
				globals: {},
				exports: 'named',
			},
			external: ['ripple', 'ripple/internal/client', '@ripple-primitives/primitive-ui', '@ripple-primitives/primitive'],
			plugins: [],
		},
	},
});
