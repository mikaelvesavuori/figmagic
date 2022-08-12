import { FRAME as Frame } from '../../../../contracts/Figma';

import { ErrorGetPaddingY } from '../../../../frameworks/errors/errors';

export type PaddingVertical = {
  top: number;
  bottom: number;
};

export function getPaddingY(textElement: Frame, element: Frame): PaddingVertical | null {
  if (!textElement) return null;
  if (
    !element.absoluteBoundingBox ||
    !element.absoluteBoundingBox.height ||
    !textElement.absoluteBoundingBox ||
    !textElement.absoluteBoundingBox.height
  )
    throw Error(ErrorGetPaddingY);

  const parentHeight = element.absoluteBoundingBox.height;
  const textHeight = textElement.absoluteBoundingBox.height;
  // @ts-ignore
  const paddingTop = textElement.absoluteBoundingBox.y - element.absoluteBoundingBox.y;
  const paddingBottom = parentHeight - (paddingTop + textHeight);

  return {
    top: Math.round(paddingTop),
    bottom: Math.round(paddingBottom)
  };
}
