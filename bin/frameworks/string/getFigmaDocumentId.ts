import { ErrorGetFigmaDocumentId } from '../../frameworks/errors/errors';

/**
 * @description Get Figma document ID, by either getting the ID substring from a full URL or passing through what seems like an ID
 */
export function getFigmaDocumentId(url: string): string {
  if (!url) throw Error(ErrorGetFigmaDocumentId);
  if (!url.startsWith('https://www.figma.com/file/')) return url;
  return url.split('https://www.figma.com/file/')[1].split('/')[0];
}
