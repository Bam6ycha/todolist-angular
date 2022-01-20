import path = require('path');
import fs = require('fs/promises');

interface IData {
  [key: string]: string;
}

interface Dirent {
  isFile(): boolean;

  isDirectory(): boolean;

  isBlockDevice(): boolean;

  isCharacterDevice(): boolean;

  isSymbolicLink(): boolean;

  isFIFO(): boolean;

  isSocket(): boolean;

  name: string;
}

const inputParamenters: string[] = process.argv;
const inputFileName: string = inputParamenters[2];
const outputFileName: string = inputParamenters[3];

const getInputPath = (): string | void => {
  if (inputFileName) {
    return path.join(__dirname, inputFileName);
  }
};

const writeData = async (data: string): Promise<void> => {
  const outputFilePath = path.join(__dirname, outputFileName);
  if (await isOutputFileExist()) {
    await fs.rm(outputFileName, { recursive: true });
  }

  if (!(await isOutputFileExist())) {
    await fs.appendFile(outputFilePath, data);
  }
};

const getfilesInRootFolder = async (): Promise<Dirent[]> =>
  await fs.readdir(__dirname, { withFileTypes: true });

const isOutputFileExist = async (): Promise<boolean> => {
  const fileNames = await getfilesInRootFolder();
  for (let i = 0; i < fileNames.length; i++) {
    if (fileNames[i].name === outputFileName && fileNames[i].isFile()) {
      return true;
    }
  }
  return false;
};

const transformData = (data: IData[]): string => {
  const nessesaryField = data.map((item) => Object.keys(item))[0];

  const result: Array<string[] | string> = [nessesaryField, '\n'];

  for (let i = 0; i < data.length; i++) {
    const row: string[] = [];
    result.push(row);

    for (let j = 0; j <= nessesaryField.length; j++) {
      const object = data[i];
      const computedPropery = object[nessesaryField[j]];

      if (computedPropery) {
        row.push(computedPropery);
        continue;
      }

      if (j === nessesaryField.length) {
        row.push('\n');
      } else {
        row.push(' '.repeat(3));
      }
    }
  }

  return result.join(' ');
};

const readWriteData = async (): Promise<void> => {
  const fileHandle = await fs.open(getInputPath() as string, 'r');
  const readFile = fileHandle.createReadStream();

  readFile.on('data', async (data) => {
    const originalData: IData[] = JSON.parse(data.toString());
    const transormedData = transformData(originalData);

    await writeData(transormedData);
  });

  readFile.on('end', () => {
    readFile.close();
  });
};

(async () => {
  await readWriteData();
})();
