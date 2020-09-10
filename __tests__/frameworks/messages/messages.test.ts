import {
  MsgProcessElementsCreatingElement,
  MsgDownloadFileWritingFile
} from '../../../bin/frameworks/messages/messages';

describe('Failure cases', () => {});

describe('Success cases', () => {
  test('It should show new and old values with separating marks', () => {
    expect(MsgProcessElementsCreatingElement('something', 'something')).toBe(
      '* something > something'
    );
  });

  test('It should write a helpful line describing what file it has written', () => {
    expect(MsgDownloadFileWritingFile('asdf')).toMatch(`* Writing file: asdf`);
  });
});
