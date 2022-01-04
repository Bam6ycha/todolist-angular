type BodyTypes = string | URLSearchParams | FormData | Blob | ArrayBuffer;

type ResponseType = "" | "arraybuffer" | "blob" | "document" | "json" | "text";

interface IRequestOptions {
  method?: string;
  headers?: HeadersInit;
  body?: BodyTypes;
  signal?: AbortSignal;
  responseType?: ResponseType;
}

interface ICustomResponseObject {
  status: number;
  statusText: string;
  url: string;
  headers: IHeaders;
  body: BodyTypes;
}

interface IHeaders {
  [key: string]: string;
}

type resolve = (value: ICustomResponseObject) => void;
type reject = (error: DOMException | Error) => void;
type LoadFunction = (
  url: string | URL,
  options?: IRequestOptions
) => Promise<ICustomResponseObject>;

enum XHRStatuses {
  OK = 200,
  "OK created" = 201,
  "OK upperBound" = 299,
  "Not Modified" = 304
}

export {
  IRequestOptions,
  ICustomResponseObject,
  LoadFunction,
  reject,
  resolve,
  XHRStatuses,
  IHeaders
};
