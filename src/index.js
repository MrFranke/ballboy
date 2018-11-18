import { pathToFileURL } from 'url';
import fetch from 'node-fetch';
import fs from 'fs';


type Bellhop = (path: string) => Promise<string>;
type Downloader = (path: string) => Promise<string>;

const getUrl = (path: string): URL => {
  let url;
  try {
    url = new URL(path);
  } catch (e) {
    url = pathToFileURL(path);
  }
  return url;
};


const downloadByHttp: Downloader = async (path) => {
  const data = await fetch(path.href);
  return data.text();
};

const downloadByFile: Downloader = async (path) => {
  return fs.readFileSync(path.pathname).toString();
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

export const bellboy: Bellhop = (path) => {
  const url = getUrl(path);
  return download(url);
};

export default bellboy;
