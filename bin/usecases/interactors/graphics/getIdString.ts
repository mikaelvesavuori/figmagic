import { Id } from '../../../contracts/Files';

import { ErrorGetIdstring } from '../../../frameworks/errors/errors';

/**
 * @description Collate valid string of IDs
 */
export const getIdString = (ids: Id[]): string => {
  if (!ids) throw Error(ErrorGetIdstring);

  let idString = '';
  ids.forEach((item) => (idString += `${item.id},`));
  return idString.slice(0, idString.length - 1);
};
