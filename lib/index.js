"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ballboy = void 0;

var _url = require("url");

var _http = _interopRequireDefault(require("http"));

var _https = _interopRequireDefault(require("https"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getUrl = path => {
  let url;

  try {
    url = new URL(path);
  } catch (e) {
    url = (0, _url.pathToFileURL)(path);
  }

  return url;
};

const downloadByHttp = (url, httpConfig) => {
  const isHttps = url.protocol === 'https:';
  const agent = isHttps ? _https.default : _http.default;
  return new Promise((resolve, reject) => {
    let data = Buffer.from([]);
    agent.get(url.href, httpConfig, res => {
      if (res.statusCode !== 200) {
        reject(`Error! Status code: ${res.statusCode}`);
      }

      res.on('data', chunk => {
        data = Buffer.concat([data, Buffer.from(chunk)]);
      });
      res.on('end', () => {
        resolve(data.toString());
      });
    });
  });
};

const downloadByFile = async url => {
  return new Promise((resolve, reject) => {
    _fs.default.readFile(url.pathname, (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(data.toString());
    });
  });
};

const download = async (url, HTTPConfig) => {
  switch (url.protocol) {
    case 'http:':
    case 'https:':
      return downloadByHttp(url, HTTPConfig);

    case 'file:':
      return downloadByFile(url);
  }
};

const ballboy = path => {
  const url = getUrl(path);
  const HTTPConfig = ballboy.HTTPConfig || {};
  return download(url, HTTPConfig);
};

exports.ballboy = ballboy;
var _default = ballboy;
exports.default = _default;
//# sourceMappingURL=index.js.map