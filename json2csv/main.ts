import path = require('path');
import fs = require('fs/promises');
import stream = require('stream');

interface IData {
  [key: string]: string;
}

const inputParameters: string[] = process.argv;
const inputFileName: string = inputParameters[2];
const outputFileName: string = inputParameters[3];

const getInputPath = (): string | void => {
  if (inputFileName) {
    return path.join(__dirname, inputFileName);
  }
};

const transformStream = new stream.Transform({
  transform(data, encoding = 'utf-8', callback) {
    const transformData = data.toString();
    callback(null, formationOfRightData(transformData));
  },
});

let isFirstObject = true;
const OPEN_BRACKET_INDEX = 2;

const setCache = (): ((data?: string) => string) => {
  let cache = '[';

  return function (value?: string): string {
    if (value === 'clean') {
      return (cache = '[');
    }

    if (value) {
      return (cache += value);
    }

    return cache;
  };
};

const getCache = (cache: (data?: string) => string): string => {
  return cache();
};

const isEmptyCache = (cache: string): boolean => {
  if (cache.length === 1) {
    return true;
  }

  return false;
};

const isFullData = (index: number): boolean => {
  if (index === -1) {
    return false;
  }

  return true;
};

const getFirstObject = (data: string): [IData, number] => {
  const firstCloseBracketIndex = data.indexOf('}');

  const object: [IData] = JSON.parse(
    `${data.slice(0, firstCloseBracketIndex + 1)}]`,
  );

  return [...object, firstCloseBracketIndex + OPEN_BRACKET_INDEX];
};

const getNecessaryHeaders = (object: [IData]): string => {
  return object
    .map((item) => Object.keys(item))
    .flat()
    .join(' ');
};

const getNecessaryDataFromObjects = (
  objects: IData[],
  keys: string[],
): string => {
  const result = objects.map((object) => keys.map((key) => object[key]));
  return result.join('\n');
};

const getNecessaryDataFromFirstObject = (data: string): string => {
  const [object] = getFirstObject(data);
  const headers = getNecessaryHeaders([object]).split(' ');
  const values = headers.map((item: string) => object[item]);

  return [[...headers], '\n', [...values], '\n'].join('');
};

const cache = setCache();
const headers: string[] = [];

const formationOfRightData = (data: string): string | void => {
  if (isFirstObject) {
    const [object, startIndex] = getFirstObject(data);
    [getNecessaryHeaders([object])]
      .join(' ')
      .split(' ')
      .forEach((header) => headers.push(header));

    const dataForCache = data.slice(startIndex);
    cache(dataForCache);

    isFirstObject = false;

    if (!isFullData(data.lastIndexOf(']'))) {
      return getNecessaryDataFromFirstObject(data);
    }

    if (isFullData(data.lastIndexOf(']'))) {
      const firstObjectData = getNecessaryDataFromFirstObject(data);
      const otherObjectsData = getNecessaryDataFromObjects(
        JSON.parse(getCache(cache)),
        headers,
      );

      return [firstObjectData, otherObjectsData].join('');
    }
  }

  if (!isEmptyCache(getCache(cache))) {
    const closeBracket = data.lastIndexOf('}');
    const newData = data.slice(0, closeBracket + 1);
    const objects = JSON.parse(`${getCache(cache)}${newData}]`);
    cache('clean');
    const dataForCache = data.slice(closeBracket + OPEN_BRACKET_INDEX);
    cache(dataForCache);

    return getNecessaryDataFromObjects(objects, headers);
  }

  if (isEmptyCache(getCache(cache))) {
    const closeBracket = data.lastIndexOf('}');
    const newData = data.slice(1, closeBracket + 1);
    const objects = JSON.parse(`${getCache(cache)}${newData}]`);
    const dataForCache = data.slice(closeBracket + OPEN_BRACKET_INDEX);
    cache(dataForCache);

    return getNecessaryDataFromObjects(objects, headers);
  }
};

const readWriteData = async (): Promise<void> => {
  const fileHandle = await fs.open(getInputPath() as string, 'r');
  const readFile = fileHandle.createReadStream();
  const fileHandleWrite = await fs.open(
    path.join(__dirname, outputFileName),
    'w',
  );
  const writableStream = fileHandleWrite.createWriteStream();

  readFile.pipe(transformStream).pipe(writableStream);
};

(async () => {
  await readWriteData();
})();
