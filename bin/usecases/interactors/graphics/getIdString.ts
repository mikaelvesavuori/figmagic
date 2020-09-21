import { ErrorGetIdstring } from '../../../frameworks/errors/errors';

/**
 * @description Collate valid string of IDs
 */
export const getIdString = (ids: any[]): string => {
  if (!ids) throw new Error(ErrorGetIdstring);

  let idString = '';
  ids.forEach((item) => (idString += `${item.id},`));
  return idString.slice(0, idString.length - 1);
};
