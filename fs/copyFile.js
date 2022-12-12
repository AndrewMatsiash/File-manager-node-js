import * as fsPromise from "fs/promises";
import fs from "fs";
import { pipeline } from "stream/promises";
import path from "path";

export const copyFile = async (pathFile, pathDirCopyFile) => {
  try {
    await fsPromise.stat(pathFile);
    const nameFile = path.basename(pathFile);
    const readStream = fs.createReadStream(path.join(pathFile));
    const writeStream = fs.createWriteStream(path.join(pathDirCopyFile, nameFile));
    await  pipeline(readStream,writeStream);
  } catch {
    console.log("wong path");
  }
};