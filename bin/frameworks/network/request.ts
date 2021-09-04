import https from 'https';

import { isJsonString } from '../filesystem/isJsonString';

/**
 * @description HTTPS request helper function.
 */
export async function request(urlPath: string, figmaToken?: string): Promise<any> {
  const options = {
    hostname: 'api.figma.com',
    path: urlPath,
    port: 443,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Charset': 'UTF-8'
    } as Record<string, any>
  };

  if (urlPath.includes('https://') || urlPath.includes('http://')) {
    const URL_PATH = urlPath.replace('https://', '').replace('http://', '');
    const indexFirstSlash = URL_PATH.indexOf('/');
    const hostname = URL_PATH.substring(0, indexFirstSlash);
    const path = URL_PATH.substring(indexFirstSlash, URL_PATH.length);

    options.hostname = hostname;
    options.path = path;
  }

  if (figmaToken)
    options.headers = {
      ...options.headers,
      'X-Figma-Token': figmaToken
    };

  let data = '';

  return new Promise((resolve, reject) => {
    https
      .get(options, (resp) => {
        resp.on('data', (chunk) => {
          // @ts-ignore
          if (resp.statusCode >= 200 && resp.statusCode < 300) data += chunk;
          else reject(`Not OK: Status code is ${resp.statusCode}`);
        });
        resp.on('end', () => {
          if (isJsonString(data)) resolve(JSON.parse(data));
          resolve(data);
        });
      })
      .on('error', (error) => reject(error));
  });
}
