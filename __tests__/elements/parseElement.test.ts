import { parseElement } from '../../bin/usecases/usecaseInteractors/elements/parseElement';

import { elementsPage } from '../../testdata/elements/elementsPage';

//import { filteredElements } from '../../testdata/elements/filteredElements';
//import { components } from '../../testdata/elements/components';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', async () => {
    // @ts-ignore
    await expect(parseElement()).rejects.toThrow();
  });

  test('It should throw an error if passing in incomplete set of arguments', async () => {
    // @ts-ignore
    await expect(parseElement({})).rejects.toThrow();
  });
});

describe('Success cases', () => {
  test.only('It should asdf', async () => {
    const element = {
      ...elementsPage[0],
      description: 'element=sub\ndescription=\n# Sub\n\nTiny text snippets.'
    };
    // @ts-ignore
    await expect(parseElement(element, 16)).resolves.toBe('asdf');
  });
});
