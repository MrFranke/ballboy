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
    let data = '';
    agent.get(url.href, (res) => {
      if (res.statusCode !== 200) { reject(`Status code: ${res.statusCode}`); }
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => { resolve(data); });
    });
  });
};

const downloadByFile: Downloader = async (url) => {
  return fs.readFileSync(url.pathname).toString();
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
