type BodyTypes = string | URLSearchParams | FormData | Blob | ArrayBuffer;

type CredentialValues = "omit" | "same-origin" | "include";

type ResponseType = "" | "arraybuffer" | "blob" | "document" | "json" | "text";

interface IRequestOptions {
  method?: string;
  headers?: HeadersInit;
  body?: BodyTypes;
  signal?: AbortSignal;
  credentilas?: CredentialValues;
  referref?: string;
  responseType?: ResponseType;
}

interface IResponseObject {
  status: number;
  statusText: string;
  headers: Headers;
}

export { IRequestOptions, IResponseObject };
