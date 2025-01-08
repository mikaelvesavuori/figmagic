import { readFileSync } from 'node:fs';
import { resolve } from 'path';
import { http, HttpResponse } from 'msw';

import { MsgSetMswInterceptedDataFromApi } from '../../bin/frameworks/messages/messages';

import mockFigmaFiles from './responses/mockFigmaFiles.json';
import mockFigmaFilesVersions from './responses/mockFigmaFilesVersions.json';
import mockFigmaImages from './responses/mockFigmaImages.json';

const FIGMA_API = 'https://api.figma.com/v1';
const FIGMA_BUCKET_URL =
  'https://s3-us-west-2.amazonaws.com/figma-alpha-api/img';

const logInterceptedRequest = (req: any) =>
  console.log(MsgSetMswInterceptedDataFromApi(req.url.href));

export const handlers = [
  http.get(`${FIGMA_API}/files/:file`, ({ request, params }) => {
    logInterceptedRequest(request);
    // force a response error if we get invalid-url
    if (params.file === 'invalid-url') {
      return HttpResponse.json(
        {
          status: 403,
          err: 'Not allowed',
        },
        {
          status: 403,
        },
      );
    }

    return HttpResponse.json(mockFigmaFiles, { status: 200 });
  }),
  http.get(`${FIGMA_API}/files/:file/versions`, ({ request }) => {
    logInterceptedRequest(request);
    return HttpResponse.json(mockFigmaFilesVersions, { status: 200 });
  }),
  http.get(`${FIGMA_API}/images/:file`, ({ request }) => {
    logInterceptedRequest(request);
    return HttpResponse.json(mockFigmaImages, { status: 200 });
  }),
  http.get(
    `${FIGMA_BUCKET_URL}/2f0d/1106/be444c1f7c5a79484c415e50e9010847`,
    ({ request }) => {
      logInterceptedRequest(request);
      return HttpResponse.text(
        `<svg width="55" height="56" viewBox="0 0 55 56" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.11131 28.0662L17.0333 51.499L52.1723 1.43805" stroke="#219653" stroke-width="5"/></svg>`,
        { status: 200 },
      );
    },
  ),
  http.get(
    `${FIGMA_BUCKET_URL}/8ba5/2322/bac5a41a1a59a9a76a12bbe21e0cd781`,
    ({ request }) => {
      logInterceptedRequest(request);
      return HttpResponse.text(
        `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="25" r="3" fill="black"/><circle cx="25" cy="25" r="3" fill="black"/><circle cx="34" cy="25" r="3" fill="black"/><circle cx="25" cy="25" r="23.5" stroke="#333333" stroke-width="3"/></svg>`,
        { status: 200 },
      );
    },
  ),
  http.get(
    `${FIGMA_BUCKET_URL}/3e15/3c93/1e96386d904b25bf987abc4b87c62ee1`,
    ({ request }) => {
      logInterceptedRequest(request);
      return HttpResponse.json(
        `<svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.78311 1.7831L52.2169 52.2169M1.78311 52.2169L52.2169 1.7831" stroke="black" stroke-width="5"/></svg>`,
        { status: 200 },
      );
    },
  ),
  http.get(
    'https://localhost/v1/files/lkhjtkl34kljf-fg3kj3443.hjt3hjk.net/.kj34jkl34',
    ({ request }) => {
      logInterceptedRequest(request);
      return HttpResponse.error();
    },
  ),
  http.get(
    'https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/0882/9cc7/c4731c8d0df07592cd6f7dc0519bb3bb-asdf',
    ({ request }) => {
      logInterceptedRequest(request);
      return HttpResponse.text(null, { status: 403 });
    },
  ),
  http.get(
    'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    ({ request }) => {
      logInterceptedRequest(request);

      const imageBuffer = readFileSync(
        resolve(__dirname, './files/googlelogo_color_272x92dp.png'),
      );
      return HttpResponse.arrayBuffer(imageBuffer as any, {
        headers: {
          'Content-Length': imageBuffer.byteLength.toString(),
          'Content-Type': 'image/jpeg',
        },
      });
    },
  ),
  http.get(
    'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg',
    ({ request }) => {
      logInterceptedRequest(request);

      const imageBuffer = readFileSync(
        resolve(__dirname, './files/Google__G__Logo.svg'),
      );
      return HttpResponse.arrayBuffer(imageBuffer as any, {
        headers: {
          'Content-Length': imageBuffer.byteLength.toString(),
          'Content-Type': 'image/jpeg',
        },
      });
    },
  ),
];
