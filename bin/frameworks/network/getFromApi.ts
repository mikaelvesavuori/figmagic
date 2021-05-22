import fetch from 'node-fetch';

import { ImageResponse } from '../../contracts/ImageResponse';

import { ErrorGetFromApi } from '../errors/errors';

/**
 * @description Get data from the Figma API
 */
export async function getFromApi(
  figmaToken: string,
  figmaUrl: string,
  versionName?: string | null,
  type = 'files'
): Promise<ImageResponse> {
  try {
    let endpoint = `https://api.figma.com/v1/${type}/${figmaUrl}`;

    if (versionName) {
      const versions = await fetch(`https://api.figma.com/v1/${type}/${figmaUrl}/versions`, {
        headers: {
          'X-Figma-Token': figmaToken
        }
      })
        .then((res) => res.json())
        .catch(() => {
          throw new Error(ErrorGetFromApi);
        });

      const requestedVersion = versions.versions.filter(
        (_version: any) => _version.label === versionName
      );
      const requestedVersionId = (() => {
        if (requestedVersion && requestedVersion.length > 0) {
          if (requestedVersion[0].id) {
            return requestedVersion[0].id;
          }
        }
      })();

      console.log('---> requestedVersionId', requestedVersionId);

      endpoint = `https://api.figma.com/v1/${type}/${figmaUrl}?version=${requestedVersionId}`;
    }

    return await fetch(endpoint, {
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
