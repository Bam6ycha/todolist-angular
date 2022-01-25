import http = require('http');
import { createAutoComplete } from '../auto-complete/index';
import { data } from './utilities/cities';
import {
  getQueryFromUrl,
  generateEtag,
  getStats,
  getFileInfo,
  isEtagChanged,
} from './utilities/utilities';

const autoComplete = createAutoComplete(data) as (prefix: string) => string[];
const port = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  const stats = await getStats();
  const eTag = generateEtag(stats);
  const lastModified = await getFileInfo();

  if (isEtagChanged(eTag, req.headers)) {
    res.setHeader('last-modified', `${lastModified}`);
    res.statusMessage = 'Not Modified';
    res.statusCode = 304;
    res.end();
    return;
  }

  const url = req.url as string;
  const query = getQueryFromUrl(url);
  const results = autoComplete(query);
  const method = req.method;

  if (results.length && method === 'GET') {
    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.setHeader('access-control-allow-origin', `*`);
    res.setHeader('Content-type', 'application/json');
    res.setHeader('etag', `${eTag}`);
    res.setHeader('Cache-Control', 'max-age=3600');
    res.setHeader('last-modified', `${lastModified}`);
    res.write(JSON.stringify(results));
    res.end();
  } else {
    res.statusCode = 404;
    res.statusMessage = 'Not Found';
    res.write(`${res.statusCode} ${res.statusMessage}`);
    res.end();
  }
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
