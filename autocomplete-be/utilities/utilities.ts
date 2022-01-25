import path from 'path';
import fs from 'fs/promises';
import eTag = require('etag');
import { IncomingHttpHeaders } from 'http';

const PATH_TO_DATA = path.join(__dirname, 'cities.ts');

export const getQueryFromUrl = (url: string): string => {
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

export const getFileInfo = async () => {
  const stats = await fs.stat(PATH_TO_DATA);
  return stats.mtime.toUTCString();
};

export const generateEtag = (stat: eTag.StatsLike) => {
  return eTag(stat);
};

export const getStats = async () => {
  const { ctime, mtime, ino, size } = await fs.stat(PATH_TO_DATA);

  return { ctime, mtime, ino, size };
};

export const isEtagChanged = (
  etag: string,
  requestHeaders: IncomingHttpHeaders,
): boolean => {
  const noneMatch = requestHeaders['if-none-match'];
  return etag === noneMatch;
};
