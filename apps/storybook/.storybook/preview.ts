import type { Preview } from '@storybook/web-components-vite'
import { mount } from 'ripple';
import './preview.css';

export function isRippleComponent(fn) {
  if (typeof fn !== 'function') return false;

  const src = fn.toString();
  const args = src
    .match(/\(([^)]*)\)/)?.[1]
    ?.split(',')
    .map(a => a.trim())
    .filter(Boolean) || [];

  const rippleArgs = ["__anchor", "props", "__block"];

  // Must match exactly in order and length
  return (
    args.length === rippleArgs.length &&
    args.length == 3
    && args[0] == rippleArgs[0]
    && args[2] == rippleArgs[2]
  );
}

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
    context.showMain();
    const canvasElement = context.storyContext.canvasElement;
    let component = context.storyContext.originalStoryFn;
    if(!isRippleComponent(context.storyContext.originalStoryFn)) {
      component = context.storyFn();
    }
    
    const cleanup =  mount(component, {
      target : canvasElement,
      props: context.storyContext.args ?? {}
    });
    return () => {
      try {
        cleanup()
      } catch (error) {
        console.error(error)
      }
    };
  }
};

export default preview;