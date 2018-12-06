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
    const res = new Res();
    cb(res);
    HTTP_CONTENT.split().forEach(letter => res.data(letter));
    res.end();
  }
}
