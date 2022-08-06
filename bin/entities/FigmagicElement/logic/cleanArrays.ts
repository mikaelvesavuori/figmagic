import { ErrorCleanArrays } from '../../../frameworks/errors/errors';

/**
 * @description Collate/package array objects for easier handling in later steps
 */
export function cleanArrays(classNames: RegExpMatchArray | null, classContent: string[]): any {
  if (!classNames || !classContent) throw Error(ErrorCleanArrays);

  const CLASSES: any[] = [];

  /**
   * Layout + typography comes in couples following each other,
   * therefore do two in a go (so skip odd array indices).
   */
  classContent.forEach((arrayItem, index) => {
    if (index % 2 !== 0) return;

    const LAYOUT = arrayItem
      .split(/\n/gi)
      .filter((item: string) => item)
      .filter((item: string) => item !== '}');

    const TYPOGRAPHY = classContent[index + 1]
      ? classContent[index + 1]
          .split(/\n/gi)
          .filter((item: string) => item)
          .filter((item: string) => item !== '}')
      : [];

    const css = [...LAYOUT, ...TYPOGRAPHY];

    CLASSES.push({
      className: classNames[index],
      css
    });
  });

  return CLASSES;
}
