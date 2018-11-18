import { bellhop } from "./index";
import { TEST_STRING } from "./__mocks__/constans";
jest.mock('node-fetch');
jest.mock('fs');

test('Download by HTTPS', () => {
  const link = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png';
  return expect(bellhop(link)).resolves.toEqual(TEST_STRING);
});

test('Download by file', () => {
  const link = '/path/to/file.yml';
  return expect(bellhop(link)).resolves.toEqual(TEST_STRING);
});
