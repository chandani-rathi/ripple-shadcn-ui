import type { Preview } from '@storybook/web-components-vite'
import { mount } from 'ripple';
import './preview.css';

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    options: {
      storySort: {
        order: ['Components', 'Utilities'],
      },
    },
    // disables Chromatic on a global level
    chromatic: { disable: true },
  },
  renderToCanvas: (context) => {
    console.log("renderer", context);
    const output = context.storyFn();
    console.log(output)
    const canvasElement = context.storyContext.canvasElement;
    // document.body.innerHTML = "";
    const cleanup =  mount(output, {
      target : canvasElement,
      props: context.storyContext.args ?? {}
    });
    context.showMain();
    return cleanup;
  }
};

export default preview;