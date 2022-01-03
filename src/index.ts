import {
  ICustomResponseObject,
  LoadFunction,
  reject,
  resolve,
  XHRStatuses
} from "./interfaces";

//! custom fetch

const load: LoadFunction = (url, options) =>
  new Promise((resolve: resolve, reject: reject) => {
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
      if (
        xhr.status === 200
        // xhr.status > XHRStatuses["OK upperBound"]
      ) {
        reject(new Error(`${xhr.status}`));
      }
    };

    xhr.onreadystatechange = (): void => {
      if (xhr.readyState === 4) {
        const customResponse: ICustomResponseObject = {
          status: xhr.status,
          statusText: xhr.statusText,
          url: xhr.responseURL,
          body: xhr.response,
          headers: xhr.getAllResponseHeaders()
        };

        resolve(customResponse);
      }
    };
  });

load("https://my-json-server.typicode.com/typicode/demo/comments", {
  method: "GET"
}).then((result) => console.log(result.body));

// fetch("https://my-json-server.typicode.com/typicode/demo/comments", {}).then(
//   (response) => console.log(Object.fromEntries(response.headers.entries()))
// );
