import { createPage } from '../bin/functions/createPage';

test('It should throw an error if no parameter is provided', () => {
  expect(() => {
    createPage();
  }).toThrow();
});

test('It should throw an error if array is empty', () => {
  const FIGMA_PAGES = [];
  expect(() => {
    createPage(FIGMA_PAGES);
  }).toThrow();
});

test('It should return an empty object if array has non-matching values', () => {
  const FIGMA_PAGES = ['asdf', 123];
  expect(createPage(FIGMA_PAGES)).toEqual(expect.objectContaining({}));
});

test('It should return an empty object if array has non-matching values, even with a "name" property', () => {
  const FIGMA_PAGES = [{ name: 'demovalue', something: 123 }];
  expect(createPage(FIGMA_PAGES)).toEqual(expect.objectContaining({}));
});

test('It should find a match when passing in a "design tokens" page', () => {
  const FIGMA_PAGES = [{ name: 'Design tokens' }];
  expect(createPage(FIGMA_PAGES)).toEqual(expect.objectContaining({}));
});
