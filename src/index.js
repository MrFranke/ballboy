import { pathToFileURL } from 'url';
import http from 'http';
import https from 'https';
import fs from 'fs';

type Ballboy = {
  (path: string): Promise<string>;
  HTTPConfig: {}
};
type Downloader = (url: URL, httpConfig?: {}) => Promise<string>;

const getUrl = (path: string): URL => {
  let url;
  try {
    url = new URL(path);
  } catch (e) {
    url = pathToFileURL(path);
  }
  return url;
};

const downloadByHttp: Downloader = (url, httpConfig) => {
  const isHttps = url.protocol === 'https:';
  const agent = isHttps ? https : http;
  return new Promise((resolve, reject) => {
    let data = Buffer.from([]);
    agent.get(url.href, httpConfig, (res) => {
      if (res.statusCode !== 200) { reject(`Error! Status code: ${res.statusCode}`); }
      res.on('data', (chunk) => { data  = Buffer.concat([data, Buffer.from(chunk)]) });
      res.on('end', () => { resolve(data.toString()); });
    });
  });
};

const downloadByFile: Downloader = async (url) => {
  return new Promise((resolve, reject) => {
    fs.readFile(url.pathname, (err, data) => {
      if (err) { reject(err); }
      try {
        resolve(data.toString());
      } catch (e) {
        reject(e);
      }

    });
  });
};

const download: Downloader = async (url, HTTPConfig) => {
  switch (url.protocol) {
    case 'http:':
    case 'https:':
      return downloadByHttp(url, HTTPConfig);
    case 'file:':
      return downloadByFile(url);
  }
};

export const ballboy: Ballboy = (path) => {
  const url = getUrl(path);
  const HTTPConfig = ballboy.HTTPConfig || {};
  return download(url, HTTPConfig);
};

export default ballboy;
