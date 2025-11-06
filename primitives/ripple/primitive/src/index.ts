export * from "./primitive.ripple";
export * from "./trackProps"

export function composeEventHandlers<E extends Event & { isPropagationStopped?: () => boolean }>(
  originalEventHandler?: (event: E ) => void,
  ourEventHandler?: (event: E) => void,
  { checkForDefaultPrevented = true } = {}
) {
  return function handleEvent(event: E) {
    let propagationStopped = false;
    const origStop = event.stopPropagation;
    if (typeof event.isPropagationStopped !== "function") {
      event.stopPropagation = function (...args: any[]) {
        propagationStopped = true;
        return origStop.apply(this, args);
      };
      (event as any).isPropagationStopped = () => propagationStopped;
    }

    originalEventHandler?.(event);

    if (checkForDefaultPrevented === false || !event.defaultPrevented) {
      return ourEventHandler?.(event);
    }
  };
}