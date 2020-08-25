import { ErrorGetIdstring } from '../../../frameworks/errors/errors';

/**
 * @description Collate valid string of IDs
 *
 * @param ids Figma 'Graphics' page
 */
export const getIdString = (ids: any[]): string => {
  if (!ids) throw new Error(ErrorGetIdstring);

  let idString = '';

  ids.forEach((item) => {
    idString += `${item.id},`;
  });

  // Remove last comma
  idString = idString.slice(0, idString.length - 1);

  return idString;
};
