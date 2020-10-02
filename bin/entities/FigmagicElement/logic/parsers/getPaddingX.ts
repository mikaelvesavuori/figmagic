import { FRAME as Frame } from '../../../../contracts/Figma';

import { ErrorGetPaddingX } from '../../../../frameworks/errors/errors';

export type PaddingHorizontal = {
  left: number;
  right: number;
};

export function getPaddingX(textElement: Frame, element: Frame): PaddingHorizontal | null {
  try {
    if (!textElement || !element) return null;

    if (!textElement.absoluteBoundingBox || !element.absoluteBoundingBox)
      throw new Error(ErrorGetPaddingX);

    const PARENT_WIDTH = element.absoluteBoundingBox.width;
    const TEXT_WIDTH = textElement.absoluteBoundingBox.width;
    // @ts-ignore
    const PADDING_LEFT = textElement.absoluteBoundingBox.x - element.absoluteBoundingBox.x;
    // @ts-ignore
    const PADDING_RIGHT = PARENT_WIDTH - (PADDING_LEFT + TEXT_WIDTH);

    return {
      left: Math.round(PADDING_LEFT),
      right: Math.round(PADDING_RIGHT)
    };
  } catch (error) {
    throw new Error(error);
  }
}
