/**
 * @description Get temporary ID part from CSS class name (class name used during nested CSS processing)
 */
export function getId(str: string): string | null {
  const match = str.match(/__#(.*?) /gi);
  if (match) return match[0].replace('__#', '');
  return null;
}
