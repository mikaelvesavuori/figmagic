/**
 * @description Get temporary ID part from CSS class name (class name used during nested CSS processing)
 */
export function getId(str: string): string | null {
  const MATCH = str.match(/__#(.*?) /gi);
  if (MATCH) return MATCH[0].replace('__#', '');
  return null;
}
