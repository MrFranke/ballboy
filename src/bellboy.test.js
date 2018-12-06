import { ballboy } from "./index";
import { FILE_CONTENT, HTTP_CONTENT, HTTPS_CONTENT } from "./__mocks__/constans";
jest.mock('http');
jest.mock('https');
jest.mock('fs');

test('Download by HTTP', async () => {
  const link = 'http://test.com/';
  const result = await ballboy(link);
  return expect(result).toEqual(HTTP_CONTENT);
});

test('Download by HTTPS', async () => {
  const link = 'https://test.com/';
  const result = await ballboy(link);
  return expect(result).toEqual(HTTPS_CONTENT);
});

test('Download by file', async () => {
  const link = '/path/to/file.yml';
  const result = await ballboy(link);
  return expect(result).toEqual(FILE_CONTENT);
});
