import fs from 'fs';
import trash from 'trash';

import { writeGraphicElementsMap } from '../../../../bin/usecases/interactors/elements/writeGraphicElementsMap';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      writeGraphicElementsMap();
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should write graphics elements map', async () => {
    const FOLDER = '__test-write-graphic-elements-map__';
    const FILE_PATH = `${FOLDER}/index.tsx`;
    const FILE_CONTENTS = `import More from './elements/More';

export const Graphics = {
  More,
};
`;

    writeGraphicElementsMap(FOLDER, FILE_PATH, FILE_CONTENTS);
    const FILE_EXISTS = fs.existsSync(FILE_PATH);
    expect(FILE_EXISTS).toBe(true);

    await trash(FOLDER);
  });
});
