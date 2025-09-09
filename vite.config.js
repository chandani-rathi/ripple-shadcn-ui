import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { ripple } from 'vite-plugin-ripple';
import path from 'path';

export default defineConfig({
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
