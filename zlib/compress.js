import zlib from "zlib";
import path from "path";
import fs from "fs";
import { getDataPath } from "../helper.js";
import { pipeline } from "stream/promises";

export const compressFile = async (pathFile, pathCompressToDir) => {
  try {
    const { isFile, error: pathFileError } = await getDataPath(pathFile);
    const { isDirectory, error: movePathDirError } = await getDataPath(pathCompressToDir);

    if (!isFile) {
      console.log(`${pathFile} is not a file`);
      return;
    }

    if (!isDirectory) {
      console.log(`${pathCompressToDir} is not a directory`);
      return;
    }

    if (movePathDirError || pathFileError) {
      console.log("wrong path");
      return;
    }

    const pathToFile = path.isAbsolute(pathFile) ? pathFile : path.join(process.cwd(), pathFile);
    const pathToDir = path.isAbsolute(pathCompressToDir)
      ? pathCompressToDir
      : path.join(process.cwd(), pathCompressToDir);

    const nameFile = path.basename(pathToFile);
    const readStream = fs.createReadStream(pathToFile, { flags: "r" });
    const writeStream = fs.createWriteStream(path.join(pathToDir, `${nameFile}.br`), { flags: "wx" });
    const brotliCompress = zlib.createBrotliCompress();
    await pipeline(readStream, brotliCompress, writeStream);
  } catch {
    console.log("wong path");
  }
};
