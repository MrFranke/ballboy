import { HTTP_CONTENT } from "./constans";

class Res {
  constructor(code= 200) {
    this.statusCode = code;
  }

  on(event, cb) {
    this[event] = cb;
  }
}

export default {
  get(url, options = {}, cb) {
    let res = new Res();
    if (url === 'http://path.to/error') {
      res = new Res(400);
    }
    cb(res);
    HTTP_CONTENT.split().forEach(letter => res.data(letter));
    res.end();
  }
}
