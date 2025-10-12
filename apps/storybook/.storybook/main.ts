import type { IndexInput, StorybookConfig } from 'storybook/internal/types';
import { compile } from 'ripple/compiler';
import fsPromise from "node:fs/promises"
import fs from 'node:fs';
import { dirname } from 'node:path';
import { loadCsf } from "storybook/internal/csf-tools";
const VITE_FS_PREFIX = '/@fs/';
const IS_WINDOWS = process.platform === 'win32';

async function existsInRoot(filename: string, root: string) {
  if (filename.startsWith(VITE_FS_PREFIX)) {
    return false; // vite already tagged it as out of root
  }
  return fs.existsSync(root + filename);
}

async function createVirtualImportId(filename: string, root: string, type: string) {
  const parts = ['ripple', `type=${type}`];
  if (type === 'style') {
    parts.push('lang.css');
  }
  if (await existsInRoot(filename, root)) {
    filename = root + filename;
  } else if (filename.startsWith(VITE_FS_PREFIX)) {
    filename = IS_WINDOWS
      ? filename.slice(VITE_FS_PREFIX.length) // remove /@fs/ from /@fs/C:/...
      : filename.slice(VITE_FS_PREFIX.length - 1); // remove /@fs from /@fs/home/user
  }
  // return same virtual id format as vite-plugin-vue eg ...App.ripple?ripple&type=style&lang.css
  return `${filename}?${parts.join('&')}`;
}

const getAbsolutePath = (packageName: string) => {
  return "/.storybook/"
}
  dirname("/preset"); //require.resolve(packageName + "/preset")


const config: StorybookConfig = {
  "stories": [
    '../stories/**/*stories.ripple',
  ],
  "addons": [],
  experimental_indexers: [
    {
      test: /\.ripple$/,
      createIndex: async (fileName, { makeTitle }) => {
        console.log(fileName);
        const code = await fsPromise.readFile(fileName, 'utf8');
        const { js, css } = await compile(code, fileName, {
          mode: 'client',
        });

        if (css !== '') {
          const cssId = createVirtualImportId(fileName, "", 'style');
          js.code += `\nimport ${JSON.stringify(cssId)};\n`;

        }

        const file = await loadCsf(js.code, { fileName, makeTitle })
        const { meta, stories } = file.parse();
        const storyEntries: IndexInput[] = []

        stories.map(({ name, tags, id, localName, parameters, __stats }) => {
          storyEntries.push({
            type: 'story',
            exportName: (name ?? "default"),
            title: makeTitle(meta.title),
            importPath: fileName,
            tags: tags
          })
        })
        return storyEntries;
      },
    },
  ],
  framework: getAbsolutePath("@storybook/ripple")
};
export default config;