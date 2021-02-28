import fetch from 'node-fetch';

import { ImageResponse } from '../../contracts/ImageResponse';

import { ErrorGetFromApi } from '../errors/errors';

/**
 * @description Get data from the Figma API
 */
export async function getFromApi(
  figmaToken: string,
  figmaUrl: string,
  type = 'files'
): Promise<ImageResponse> {
  try {
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
    throw new Error(error);
  }
}
