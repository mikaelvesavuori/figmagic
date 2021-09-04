/**
 * @description Replace all IDs in the shape "__#{something}" from a given string, exchanging them with spaces.
 */
export function removeAllIds(str: string): string {
  return str.replace(/__#(.*?) /gi, ' ');
}
