import * as fsPromise from "fs/promises";

export const showDirectory = async (currentPath) => {
  const directory = await fsPromise.readdir(currentPath, { withFileTypes: true });

  const dataDir = directory.reduce((result, currentValue, i) => {
    const type = currentValue.isDirectory() ? "Directory" : "File";
    const name = directory[i].name;
    return [...result, { name, type }];
  }, []);
  console.table(dataDir);
};
