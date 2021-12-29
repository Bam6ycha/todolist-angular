import { IRequestOptions } from "./interfaces";

//! custom fetch

const load = (url: string | URL, options: IRequestOptions = {}) =>
  new Promise((resolve, reject) => {
    if (options.signal && options.signal.aborted) {
      return reject(new DOMException("Aborted", "AbortError"));
    }

    const xhr = new XMLHttpRequest();

    xhr.responseType = options.responseType ?? "json";

    const newURL = url instanceof URL ? url.href : url;

    const request = new Request(newURL, options);

    if (options.headers) {
      const headers = Object.entries(options.headers);
      headers.forEach((item: [string, string]) =>
        request.headers.set(item[0], item[1])
      );
    }

    xhr.open(request.method, request.url, true);

    if (options.body) {
      xhr.send(options.body);
    } else {
      xhr.send();
    }

    xhr.onload = () => {
      if (xhr.status < 200 && xhr.status > 299) {
        reject(new Error(`${xhr.status}`));
      }
    };

    if (request.signal) {
      request.signal.addEventListener("abort", xhr.abort);

      xhr.onreadystatechange = (): void => {
        if (xhr.readyState === 4) {
          const options = {
            status: xhr.status,
            statusText: xhr.statusText,
            url: xhr.responseURL,
            body: xhr.response
          };
          request.signal.removeEventListener("abort", xhr.abort);

          resolve(options);
        }
      };
    }
  });

load("https://my-json-server.typicode.com/typicode/demo/comments", {
  responseType: "arraybuffer",
  headers: {
    "Content-type": "application/x-www-form-urlencoded",
    "Content-Language": "ru"
  }
}).then((result: Response) => console.log(result));

fetch("https://my-json-server.typicode.com/typicode/demo/comments", {}).then(
  (response) => console.log(Object.fromEntries(response.headers.entries()))
);
