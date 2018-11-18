import { ballboy } from "./index";
import { FILE_CONTENT, HTTP_CONTENT } from "./__mocks__/constans";
jest.mock('node-fetch');
jest.mock('fs');

test('Download by HTTPS', () => {
  const link = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png';
  return expect(ballboy(link)).resolves.toEqual(HTTP_CONTENT);
});

test('Download by file', () => {
  const link = '/path/to/file.yml';
  return expect(ballboy(link)).resolves.toEqual(FILE_CONTENT);
});
