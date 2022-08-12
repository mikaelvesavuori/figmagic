import https, { RequestOptions } from 'https';
import fs from 'fs';

import { isJsonString } from '../filesystem/isJsonString';
import { checkIfExists } from '../filesystem/checkIfExists';

/**
 * @description HTTPS request helper function.
 */
export async function request(urlPath: string, figmaToken?: string): Promise<any> {
  const options: RequestOptions = {
    hostname: 'api.figma.com',
    path: urlPath,
    port: 443,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Charset': 'UTF-8'
    }
  };

  if (urlPath.includes('https://') || urlPath.includes('http://')) {
    const urlPathWithoutProtocol = urlPath.replace('https://', '').replace('http://', '');
    const indexFirstSlash = urlPathWithoutProtocol.indexOf('/');
    const hostname = urlPathWithoutProtocol.substring(0, indexFirstSlash);
    const path = urlPathWithoutProtocol.substring(indexFirstSlash, urlPathWithoutProtocol.length);

    options.hostname = hostname;
    options.path = path;
  }

  /**
   * This is a basic implementation so we can use our own
   * public key and certificate.
   *
   * TODO: Make this customizable and get feedback on first version.
   */
  const keyPath = `${process.cwd()}/key.pem`;
  const certPath = `${process.cwd()}/cert.pem`;
  // @ts-ignore
  if (checkIfExists(keyPath)) options.key = getFile(keyPath);
  // @ts-ignore
  if (checkIfExists(certPath)) options.cert = getFile(certPath);

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

function getFile(filePath: string): Buffer {
  return fs.readFileSync(filePath);
}
