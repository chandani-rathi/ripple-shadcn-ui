import { defineConfig } from 'vite';
import { ripple } from 'vite-plugin-ripple';
import path from "node:path"
import packageJson from "./package.json";

const workspaceDeps = Object.keys(packageJson.dependencies).filter(
	k => packageJson.dependencies[k].startsWith("workspace")
)


export default defineConfig({
	plugins: [ripple()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
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
			external: ['ripple', 'ripple/internal/client', ...workspaceDeps],
			plugins: [],
		},
	},
});
