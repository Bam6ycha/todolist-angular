import path from 'path';
import fs from 'fs/promises';
import eTag from 'etag';
import { IncomingHttpHeaders, ServerResponse } from 'http';

const PATH_TO_DATA = path.join(__dirname, 'cities.json');

const getQueryFromUrl = (url: string): string => {
  if (isMatch(url)) {
    return url.slice(url.indexOf('=') + 1);
  }

  return '';
};

const isMatch = (url: string): boolean => {
  const validateURL = /complete=.*/;

  if (!!url.match(validateURL)) {
    return true;
  }

  return false;
};

const getFileInfo = async () => {
  const stats = await fs.stat(PATH_TO_DATA);
  return stats.mtime.toUTCString();
};

const generateEtag = (body: string) => {
  return eTag(body);
};

const isEtagChanged = (
  etag: string,
  requestHeaders: IncomingHttpHeaders,
): boolean => {
  const noneMatch = requestHeaders['if-none-match'];
  return etag === noneMatch;
};

const readFile = async (): Promise<string[] | Error> => {
  const fileHandle = await fs.open(PATH_TO_DATA, 'r');
  const readStream = fileHandle.createReadStream();

  return new Promise((resolve, reject) => {
    let data = '';
    readStream.on('data', (chunk) => {
      data += chunk;
    });

    readStream.on('error', () => reject(new Error('Something went wrong')));

    readStream.on('end', () => resolve(JSON.parse(data)));
  });
};

const sendCachedData = (res: ServerResponse, lastModified: string): void => {
  res.setHeader('last-modified', `${lastModified}`);
  res.statusMessage = 'Not Modified';
  res.statusCode = 304;
  res.end();
};

const sendData = (res: ServerResponse, data: string[]) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('access-control-allow-origin', `*`);
  res.setHeader('Content-type', 'application/json');
  res.write(JSON.stringify(data));
  res.end();
};

const setCache = (res: ServerResponse, eTag: string, lastModified: string) => {
  res.setHeader('etag', `${eTag}`);
  res.setHeader('Cache-Control', 'no-cache,max-age=3600');
  res.setHeader('last-modified', `${lastModified}`);
};

const sendUserError = (res: ServerResponse) => {
  res.statusCode = 404;
  res.statusMessage = 'Not Found';
  res.write(`${res.statusCode} ${res.statusMessage}`);
  res.end();
};

const sendServerError = (res: ServerResponse) => {
  res.statusCode = 500;
  res.statusMessage = `Something went wrong`;
  res.write(`${res.statusCode} ${res.statusMessage}`);
  res.end();
};

export {
  getQueryFromUrl,
  generateEtag,
  getFileInfo,
  isEtagChanged,
  readFile,
  sendCachedData,
  sendData,
  setCache,
  sendUserError,
  sendServerError,
};
