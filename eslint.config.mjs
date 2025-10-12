// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import ripple from 'eslint-plugin-ripple';

export default [...ripple.configs.recommended, ...storybook.configs["flat/recommended"]];
