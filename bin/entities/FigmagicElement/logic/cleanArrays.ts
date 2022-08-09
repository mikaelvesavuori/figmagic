import { classRepresentsTextOnlyElement } from './classRepresentsTextOnlyElement';

import { UniqueCssValues } from '../../../contracts/Css';

import { ErrorCleanArrays } from '../../../frameworks/errors/errors';

/**
 * @description Collate/package array objects for easier handling in later steps
 */
export function cleanArrays(
  classNames: RegExpMatchArray | null,
  classContent: string[],
  textOnlySubchildren: string[]
): UniqueCssValues[] {
  if (!classNames || !classContent) throw Error(ErrorCleanArrays);

  const classes: UniqueCssValues[] = [];

  let skipNext = false;

  classContent.forEach((currentClassContent, index) => {
    if (skipNext) {
      skipNext = false;
      return;
    }
    const className = classNames[index];
    const isNextClassSameLogicalClass = className === classNames[index + 1];
    const isTextOnly = classRepresentsTextOnlyElement(className, textOnlySubchildren);

    const layout = (() => {
      if (isTextOnly) return [];

      return currentClassContent
        .split(/\n/gi)
        .filter((item: string) => item)
        .filter((item: string) => item !== '}');
    })();

    const typography = (() => {
      const content = (() => {
        /**
         * The typography always comes second, so if we don't have the
         * same logical class coming up next, then the current class must
         * be inferred as being the typography class.
         */
        if (!isNextClassSameLogicalClass) return currentClassContent;

        /**
         * We will do the typography processing now which would otherwise
         * have been in the next step, so skip the next run.
         */
        skipNext = true;
        return classContent[index + 1];
      })();

      return content
        .split(/\n/gi)
        .filter((item: string) => item)
        .filter((item: string) => item !== '}');
    })();

    classes.push({ className, css: [...layout, ...typography] });
  });

  return classes;
}
