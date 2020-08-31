import { PrepComponent } from '../../bin/app/contracts/PrepFile';

import { prepComponent } from '../../bin/frameworks/filesystem/prepFile';

describe('Failure cases', () => {
  describe('No input', () => {
    test('prepComponent should throw an error if no argument is provided', async () => {
      // @ts-ignore
      await expect(() => prepComponent()).rejects.toThrow();
    });

    test('prepStyledComponents should throw an error if no argument is provided', async () => {
      // @ts-ignore
      await expect(() => prepComponent()).rejects.toThrow();
    });

    test('prepCss should throw an error if no argument is provided', async () => {
      // @ts-ignore
      await expect(() => prepComponent()).rejects.toThrow();
    });

    test('prepStorybook should throw an error if no argument is provided', async () => {
      // @ts-ignore
      await expect(() => prepComponent()).rejects.toThrow();
    });

    test('prepDescription should throw an error if no argument is provided', async () => {
      // @ts-ignore
      await expect(() => prepComponent()).rejects.toThrow();
    });
  });

  describe('Incorrect input', () => {
    test('prepComponent should throw an error if incorrect (empty) input is provided', async () => {
      // @ts-ignore
      await expect(() => prepComponent({})).rejects.toThrow();
    });

    test('prepStyledComponents should throw an error if incorrect (empty) input is provided', async () => {
      // @ts-ignore
      await expect(() => prepComponent({})).rejects.toThrow();
    });

    test('prepCss should throw an error if incorrect (empty) input is provided', async () => {
      // @ts-ignore
      await expect(() => prepComponent({})).rejects.toThrow();
    });

    test('prepStorybook should throw an error if incorrect (empty) input is provided', async () => {
      // @ts-ignore
      await expect(() => prepComponent({})).rejects.toThrow();
    });

    test('prepDescription should throw an error if incorrect (empty) input is provided', async () => {
      // @ts-ignore
      await expect(() => prepComponent({})).rejects.toThrow();
    });
  });
});

describe('Success cases', () => {
  test.only('It should asdasd', async () => {
    const data = {
      name: 'aaa',
      filePath: 'sss',
      format: 'ddd',
      templates: {},
      text: 'fff',
      extraProps: 'qqq'
    };
    await expect(prepComponent(data as PrepComponent)).resolves.toMatchObject({});
  });
});
