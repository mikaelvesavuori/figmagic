import { FRAME as Frame } from '../../../../bin/contracts/Figma';

import { createPage } from '../../../../bin/usecases/interactors/common/createPage';

import { designTokensPage, designTokensChildren } from '../../../../testdata/designTokensPage';

const matchingPageName = 'Design tokens';

describe('Failure cases', () => {
  test('It should throw an error if array is empty', () => {
    const FIGMA_PAGES: Frame[] = [];
    expect(() => {
      createPage(FIGMA_PAGES, matchingPageName);
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should return an empty array if array has non-matching values', () => {
    const FIGMA_PAGES: Frame[] = [{ id: '0:0', type: 'DOCUMENT', name: 'asdf', children: [] }];
    expect(createPage(FIGMA_PAGES, matchingPageName)).toEqual(expect.arrayContaining([]));
  });

  test('It should return an empty array if array has non-matching values, even with a "name" property', () => {
    const FIGMA_PAGES = [{ name: 'demovalue', something: 123 }];
    // @ts-ignore
    expect(createPage(FIGMA_PAGES, matchingPageName)).toEqual(expect.arrayContaining([]));
  });

  test('It should receive the children of its matching page ("design tokens")', () => {
    // @ts-ignore
    expect(createPage(designTokensPage, matchingPageName)).toEqual(
      expect.arrayContaining(designTokensChildren)
    );
  });
});
