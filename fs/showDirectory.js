import * as fsPromise from "fs/promises";

export const showDirectory = async () => {
  const directory = await fsPromise.readdir(process.cwd(), { withFileTypes: true });

  const dataDir = directory.reduce((result, currentValue, i) => {
    const type = currentValue.isDirectory() ? "Directory" : "File";
    const name = directory[i].name;
    return [...result, { name, type }];
  }, []);
  console.table(dataDir);
};
