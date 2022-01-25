import http from 'http';
import { createAutoComplete } from '../auto-complete/index';
import {
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
} from './utilities/utilities';

const port = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  try {
    const data = await readFile();
    const autoComplete = createAutoComplete(data) as (
      prefix: string,
    ) => string[];

    const url = req.url as string;
    const query = getQueryFromUrl(url);
    const results = autoComplete(query);
    const method = req.method;

    const eTag = generateEtag(results.join(' '));

    const lastModified = await getFileInfo();

    if (isEtagChanged(eTag, req.headers)) {
      sendCachedData(res, lastModified);
      return;
    }

    if (results.length && method === 'GET') {
      setCache(res, eTag, lastModified);
      sendData(res, results);
    } else {
      sendUserError(res);
    }
  } catch (error) {
    sendServerError(res);
  }
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
