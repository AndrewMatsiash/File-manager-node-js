import * as fsPromise from "fs/promises";
import fs from "fs";
import { pipeline } from "stream/promises";
import path from "path";
import { getDataPath } from "../helper";

export const copyFile = async (pathFile, pathDirCopyFile) => {
  try {
    const { isDirectory, error } = await getDataPath(pathFile);

    if (isDirectory) {
      console.log(`${pathFile} is not a file`);
      return;
    }

    if (error) {
      console.log(error);
      return;
    }

    const pathToFile = path.isAbsolute(pathFile) ? pathFile : path.join(process.cwd(), pathFile);
    const pathToDir = path.isAbsolute(pathDirCopyFile) ? pathDirCopyFile : path.join(process.cwd(), pathDirCopyFile);

    const nameFile = path.basename(pathFile);
    const readStream = fs.createReadStream(pathToFile, { flags: "r" });
    const writeStream = fs.createWriteStream(path.join(pathToDir, nameFile), { flags: "wx" });
    await pipeline(readStream, writeStream);
  } catch {
    console.log("wrong path");
  }
};
