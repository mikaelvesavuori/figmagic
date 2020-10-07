/**
 * @description TODO
 */
export function removeAllIds(str: string): string {
  return str.replace(/__#(.*?) /gi, ' ');
}
