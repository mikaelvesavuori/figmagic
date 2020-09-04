import { addDescriptionToElements } from '../../bin/usecases/usecaseInteractors/elements/addDescriptionToElements';

import { filteredElements } from '../../testdata/elements/filteredElements';
import { components } from '../../testdata/elements/components';

describe('Failure cases', () => {
  test('It should throw an error if no argument is provided', () => {
    // @ts-ignore
    expect(() => addDescriptionToElements()).toThrow();
  });

  test('It should throw an error if passed in incomplete set of arguments', () => {
    // @ts-ignore
    expect(() => addDescriptionToElements({})).toThrow();
  });
});

describe('Success cases', () => {
  test('It should correctly match and add description to filtered elements', () => {
    const x = addDescriptionToElements(filteredElements, components)[0];
    expect(x.description).toBe(`element=sub
description=
# Sub

Tiny text snippets.`);
  });
});
