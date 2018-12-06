import { pathToFileURL } from 'url';
import http from 'http';
import https from 'https';
import fs from 'fs';


type Ballboy = (path: string) => Promise<string>;
type Downloader = (url: URL) => Promise<string>;

const getUrl = (path: string): URL => {
  let url;
  try {
    url = new URL(path);
  } catch (e) {
    url = pathToFileURL(path);
  }
  return url;
};


const downloadByHttp: Downloader = (url) => {
  const isHttps = url.protocol === 'https:';
  const agent = isHttps ? https : http;
  return new Promise((resolve, reject) => {
    let data = new Buffer(0);
    agent.get(url.href, (res) => {
      if (res.statusCode !== 200) { reject(`Error! Status code: ${res.statusCode}`); }
      res.on('data', (chunk) => { data  = Buffer.concat([data, new Buffer(chunk)]) });
      res.on('end', () => { resolve(data.toString()); });
    });
  });
};

const downloadByFile: Downloader = async (url) => {
  return new Promise((resolve, reject) => {
    fs.readFile(url.pathname, (err, data) => {
      if (err) { reject(err); }
      resolve(data.toString());
    });
  });
};

const download: Downloader = async (url: URL) => {
  switch (url.protocol) {
    case 'http:':
    case 'https:':
      return downloadByHttp(url);
    case 'file:':
      return downloadByFile(url);
  }
};

export const ballboy: Ballboy = (path) => {
  const url = getUrl(path);
  return download(url);
};

export default ballboy;
