import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { ripple } from 'vite-plugin-ripple';
import path from 'path';

export const getWorkspaceDeps = async (packageJson) => {
	if(!packageJson) {
		packageJson = await import("./package.json");
	}
	return Object.keys(packageJson.dependencies).filter(
		k => packageJson.dependencies[k].startsWith("workspace")
	)
}

export default defineConfig({
	base: './',
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './registry/new-york'),
		},
	},
	plugins: [ripple(), tailwindcss()],
	server: {
		port: 3000,
	},
	build: {
		target: 'esnext',
	},
});
