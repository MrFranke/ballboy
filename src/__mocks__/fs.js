import { FILE_CONTENT } from "./constans";

export default {
  readFile(path, cb) {
    cb(null, FILE_CONTENT);
  }
}
