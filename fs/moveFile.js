import * as fsPromise from "fs/promises";
import fs from "fs";
import { pipeline } from "stream/promises";
import path from "path";
import { getDataPath } from "../helper.js";

export const moveFile = async (pathFile, movePathDir) => {
  try {
    const { isFile, error: pathFileError } = await getDataPath(pathFile);
    const { isDirectory, error: movePathDirError } = await getDataPath(movePathDir);

    if (!isFile) {
      console.log(`${pathFile} is not a file`);
      return;
    }

    if (!isDirectory) {
      console.log(`${movePathDir} is not a directory`);
      return;
    }

    if (movePathDirError || pathFileError) {
      console.log("wrong path");
      return;
    }

    const pathToFile = path.isAbsolute(pathFile) ? pathFile : path.join(process.cwd(), pathFile);
    const pathToDir = path.isAbsolute(movePathDir) ? movePathDir : path.join(process.cwd(), movePathDir);

    const nameFile = path.basename(pathFile);
    const readStream = fs.createReadStream(pathToFile, { flags: "r" });
    const writeStream = fs.createWriteStream(path.join(pathToDir, nameFile), { flags: "wx" });
    await pipeline(readStream, writeStream);
    await fsPromise.unlink(path.resolve(pathFile));
  } catch {
    console.log("wong path");
  }
};
