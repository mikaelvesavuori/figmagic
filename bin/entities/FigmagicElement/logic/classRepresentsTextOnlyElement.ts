/**
 * @description Checks if a class represents a text-only element.
 */
export const classRepresentsTextOnlyElement = (
  className: string,
  textOnlySubchildren: string[] = []
): boolean => {
  const cleanedName = className.replace(' {', '');
  const rootClassName = cleanedName.slice(1, cleanedName.length - 11);

  let result = false;

  textOnlySubchildren.forEach((name) => {
    if (name.startsWith(`${rootClassName}`)) result = true;
  });

  return result;
};
