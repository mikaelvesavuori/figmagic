import { createPage } from '../bin/app/process/createPage';

import { Page } from '../bin/app/contracts/Page';

const matchingPageName = 'designtokens';

describe('Failure cases', () => {
  test('It should throw an error if array is empty', () => {
    const FIGMA_PAGES: Page[] = [];
    expect(() => {
      createPage(FIGMA_PAGES, matchingPageName);
    }).toThrow();
  });
});

describe('Success cases', () => {
  test('It should return an empty object if array has non-matching values', () => {
    const FIGMA_PAGES: Page[] = [{ name: 'asdf', children: [] }];
    expect(createPage(FIGMA_PAGES, matchingPageName)).toEqual(expect.objectContaining({}));
  });

  /*
  test('It should return an empty object if array has non-matching values, even with a "name" property', () => {
    const FIGMA_PAGES = [{ name: 'demovalue', something: 123 }];
    expect(createPage(FIGMA_PAGES, matchingPageName)).toEqual(expect.objectContaining({}));
  });

  test('It should find a match when passing in a "design tokens" page', () => {
    const FIGMA_PAGES = [{ name: 'Design tokens' }];
    expect(createPage(FIGMA_PAGES, matchingPageName)).toEqual(expect.objectContaining({}));
  });
  */
});
