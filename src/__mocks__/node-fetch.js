import { TEST_STRING } from "./constans";

export default (url: string) => {
  return new Promise((resolve, reject) => {
    resolve({
      text: () => {
        return TEST_STRING;
      }
    })
  });
};
