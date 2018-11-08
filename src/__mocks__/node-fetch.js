import fs from 'src/__mocks__/fs';

export default (url: string) => {
  return new Promise((resolve, reject) => {
    resolve({
      text: () => {
        return fs.readFileSync('src/components/specLoader/__mocks__/petstore.yaml').toString();
      }
    })
  });
};
