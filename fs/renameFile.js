import path from "path";
import * as fsPromise from "fs/promises";

export const renameFile = async (pathOldNameFile, newFileName) => {
  const pathToFile = path.isAbsolute(pathOldNameFile) ? pathOldNameFile : path.join(process.cwd(), pathOldNameFile);
  try {
    await fsPromise.rename(pathToFile, newFileName);
    console.log("File renamed successfully!");
  } catch (error) {
    console.log(` ${pathOldNameFile} no such file exists`);
  }
};
