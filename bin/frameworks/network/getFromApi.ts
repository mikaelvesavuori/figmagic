import fetch from 'node-fetch';

import { ImageResponse } from '../../contracts/ImageResponse';

import { ErrorGetFromApi } from '../errors/errors';

/**
 * @description Get data from the Figma API
 */
export async function getFromApi(
  figmaToken: string | undefined | null,
  figmaUrl: string | undefined | null,
  type = 'files'
): Promise<ImageResponse> {
  try {
    if (!figmaToken || !figmaUrl) throw new Error(ErrorGetFromApi);

    return await fetch(`https://api.figma.com/v1/${type}/${figmaUrl}`, {
      headers: {
        'X-Figma-Token': figmaToken
      }
    })
      .then((res) => res.json())
      .catch(() => {
        throw new Error(ErrorGetFromApi);
      });
  } catch (error) {
    throw new Error(ErrorGetFromApi);
  }
}
