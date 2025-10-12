// renderer.js
export async function renderToCanvas({ storyFn, canvasElement }) {
  console.log("renderer")
  const output = storyFn();

  // Example: simple HTML render
  if (typeof output === 'string') {
    canvasElement.innerHTML = output;
  } else if (output instanceof HTMLElement) {
    canvasElement.innerHTML = '';
    canvasElement.appendChild(output);
  } else {
    canvasElement.innerHTML = `<pre>Unsupported output: ${JSON.stringify(output)}</pre>`;
  }
}
