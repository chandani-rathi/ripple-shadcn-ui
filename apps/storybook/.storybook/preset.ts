import { ripple } from 'vite-plugin-ripple';

export default {
  name: '@storybook/ripple',
  core: {
    disableTelemetry: true,
    builder: '@storybook/builder-vite',
  },
  framework: {
    name: '@storybook/ripple',
    options: {},
  },
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');
    return mergeConfig(config, {
      plugins: [ripple()] // <-- plural "plugins"
    });
  },
};
