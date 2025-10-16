import { defineConfig } from 'vitest/config';
import viteConfig from './vite.config';
import vitestConfig from '../../../vitest.config';


export default defineConfig({
  plugins: viteConfig.plugins,
  resolve: { ...viteConfig.resolve, conditions: ['browser']},
  test: vitestConfig.test
});