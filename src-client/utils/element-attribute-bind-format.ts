/**
 * form an object into a custom element attribute binding format
 * (custom elements follow HTML5 and take attribute as strings)
 */
export function elementAttributeBindFormat(object: Object): string {
  return JSON.stringify(object);
}
