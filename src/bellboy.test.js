import { ballboy } from "./index";
import { FILE_CONTENT, HTTP_CONTENT, HTTPS_CONTENT } from "./__mocks__/constans";
jest.mock('http');
jest.mock('https');
jest.mock('fs');

test('Download by HTTP', () => {
  const link = 'http://test.com/';
  return expect(ballboy(link)).resolves.toEqual(HTTP_CONTENT);
});

test('Download by HTTPS', () => {
  const link = 'https://test.com/';
  return expect(ballboy(link)).resolves.toEqual(HTTPS_CONTENT);
});

test('Download by file', () => {
  const link = '/path/to/file.yml';
  return expect(ballboy(link)).resolves.toEqual(FILE_CONTENT);
});
