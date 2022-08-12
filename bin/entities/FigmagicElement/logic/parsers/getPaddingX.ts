import { FRAME as Frame } from '../../../../contracts/Figma';

import { ErrorGetPaddingX } from '../../../../frameworks/errors/errors';

export type PaddingHorizontal = {
  left: number;
  right: number;
};

export function getPaddingX(textElement: Frame, element: Frame): PaddingHorizontal | null {
  if (!textElement || !element) return null;

  if (!textElement.absoluteBoundingBox || !element.absoluteBoundingBox)
    throw Error(ErrorGetPaddingX);

  const parentWidth = element.absoluteBoundingBox.width;
  const textWidth = textElement.absoluteBoundingBox.width;
  // @ts-ignore
  const paddingLeft = textElement.absoluteBoundingBox.x - element.absoluteBoundingBox.x;
  // @ts-ignore
  const paddingRight = parentWidth - (paddingLeft + textWidth);

  return {
    left: Math.round(paddingLeft),
    right: Math.round(paddingRight)
  };
}
