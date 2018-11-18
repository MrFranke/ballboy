import { HTTP_CONTENT } from "./constans";

export default (url: string) => {
  return new Promise((resolve, reject) => {
    resolve({
      text: () => {
        return HTTP_CONTENT;
      }
    })
  });
};
