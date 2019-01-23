/**
 * decorator to query DOM for element(s)
 * (wraps document.queryselector)
 */
export function QueryAll<T extends Element = Element>(selector: string) {
  // create getter function for property
  const getter = function() {
    return document.querySelectorAll<T>(selector);
  };

  return (decoratorTarget: any, propKey: string) => {
    Object.defineProperty(decoratorTarget, propKey, {
      get: getter,
      enumerable: true,
      configurable: true
    });
  };
}
