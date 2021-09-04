import { request } from './request';

import { ImageResponse } from '../../contracts/ImageResponse';

import { ErrorGetFromApi } from '../errors/errors';
import { isJsonString } from '../filesystem/isJsonString';

/**
 * @description Get data from the Figma API
 */
export async function getFromApi(
  figmaToken: string,
  figmaUrl: string,
  versionName?: string | null,
  type = 'files'
): Promise<ImageResponse> {
  if (!figmaToken || !figmaUrl) throw new Error(ErrorGetFromApi);
  try {
    let endpoint = `/v1/${type}/${figmaUrl}`;

    if (versionName) {
      const versions = await request(`/v1/${type}/${figmaUrl}/versions`, figmaToken)
        .then((res) => {
          if (isJsonString(res)) return JSON.parse(res);
          else return res;
        })
        .catch(() => {
          throw new Error(ErrorGetFromApi);
        });

      if (versions.versions) {
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

        endpoint = `/v1/${type}/${figmaUrl}?version=${requestedVersionId}`;
      }
    }

    return await request(endpoint, figmaToken)
      .then((res) => res)
      .catch(() => {
        throw new Error(ErrorGetFromApi);
      });
  } catch (error: any) {
    throw new Error(error);
  }
}
