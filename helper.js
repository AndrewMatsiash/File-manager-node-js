import * as fsPromise from "fs/promises";
import path from "path";

export const sayHallo = (userName) => {
  console.log(`Welcome to the File Manager, ${userName}!`);
};

export const sayGoodby = (userName) => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
};

export const sayCurrentlyPath = (currentPath) => {
  console.log(`You are currently in ${process.cwd()}`);
};

export const getDataPath = async (pathFile) => {
  const pathFileT = path.isAbsolute(pathFile) ? pathFile : path.join(process.cwd(), pathFile);

  try {
    let data = await fsPromise.stat(pathFileT);
    return { isFile: data.isFile(), isDirectory: data.isDirectory() };
  } catch {
    return { error: "invalid path" };
  }
};
