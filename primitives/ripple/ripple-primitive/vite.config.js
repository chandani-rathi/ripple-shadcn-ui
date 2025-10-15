import { defineConfig } from 'vite';
import { ripple } from 'vite-plugin-ripple';
import path from "node:path"
import packageJson from "./package.json";
import viteConfig from '../../../vite.config';

const workspaceDeps = Object.keys(packageJson.dependencies).filter(
	k => packageJson.dependencies[k].startsWith("workspace")
);

const resolveAlias = () => {
	return workspaceDeps.reduce(
		(alias, dep) => {
			const folderName = dep.split("/").pop()
			alias[dep] = path.resolve(__dirname, `../${folderName}/src`)
			return alias;
		}, {}
	)
}

console.log(resolveAlias())

export default defineConfig({
	plugins: [...viteConfig.plugins],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			...resolveAlias(),
			'@ripple-primitives/primitive': path.resolve(__dirname, '../../core/primitive/src'),
			'@ripple-primitives/primitive-ui': path.resolve(__dirname, '../primitive/src'),
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
			external: ['ripple', 'ripple/internal/client'],
			plugins: [],
		},
	},
});
