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
    context.showMain();
    const canvasElement = context.storyContext.canvasElement;
    let component = context.storyContext.originalStoryFn;
    if(!context.storyContext.originalStoryFn.isRippleComponent) {
      component = context.storyFn();
      console.log(component)
    }
    
    // document.body.innerHTML = "";
    const cleanup =  mount(component, {
      target : canvasElement,
      props: context.storyContext.args ?? {}
    });
    return cleanup;
  }
};

export default preview;