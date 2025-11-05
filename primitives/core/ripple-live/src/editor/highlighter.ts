import { createHighlighterCore } from 'shiki/core'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'

const highlighterPromise = createHighlighterCore({
    themes: [
       import("shiki/themes/github-dark.mjs")
    ],
    langs: [
      async () => await import("../../node_modules/@ripple-ts/vscode-plugin/syntaxes/ripple.tmLanguage.json")
    ],
    langAlias: {
        "ripple" : "Ripple"
    },
    engine: createOnigurumaEngine(import('shiki/wasm'))
});

export async function highlightCode(code: string, { lang ="ripple", theme = "github-dark"  }) {
    const highlighter = await highlighterPromise;
    return highlighter.codeToHtml(code, { lang, theme });
}