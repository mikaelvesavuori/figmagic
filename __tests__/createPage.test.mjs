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
