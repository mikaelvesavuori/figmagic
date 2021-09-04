import { FRAME as Frame } from '../../../../contracts/Figma';

import { ErrorGetPaddingY } from '../../../../frameworks/errors/errors';

export type PaddingVertical = {
  top: number;
  bottom: number;
};

export function getPaddingY(textElement: Frame, element: Frame): PaddingVertical | null {
  try {
    if (!textElement) return null;
    if (
      !element.absoluteBoundingBox ||
      !element.absoluteBoundingBox.height ||
      !textElement.absoluteBoundingBox ||
      !textElement.absoluteBoundingBox.height
    )
      throw new Error(ErrorGetPaddingY);

    const PARENT_HEIGHT = element.absoluteBoundingBox.height;
    const TEXT_HEIGHT = textElement.absoluteBoundingBox.height;
    // @ts-ignore
    const PADDING_TOP = textElement.absoluteBoundingBox.y - element.absoluteBoundingBox.y;
    const PADDING_BOTTOM = PARENT_HEIGHT - (PADDING_TOP + TEXT_HEIGHT);

    return {
      top: Math.round(PADDING_TOP),
      bottom: Math.round(PADDING_BOTTOM)
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
