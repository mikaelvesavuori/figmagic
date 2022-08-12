/**
 * @description Round number to less crazy floating point values
 */
export function roundNumber(num: number, decimals = 6): number {
  const number = num.toFixed(decimals);
  return parseFloat(number);
}
