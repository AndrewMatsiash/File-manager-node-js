import zlib from "zlib";
import path from "path";
import fs from "fs";
import { getDataPath } from "../helper.js";
import { pipeline } from "stream/promises";

export const decompressFile = async (pathDecompressFile, pathDecompressToDir) => {
  try {
    const { isFile, error: pathFileError } = await getDataPath(pathDecompressFile);
    const { isDirectory, error: movePathDirError } = await getDataPath(pathDecompressToDir);

    if (!isFile) {
      console.log(`${pathDecompressToDir} is not a file`);
      return;
    }

    if (!isDirectory) {
      console.log(`${pathDecompressToDir} is not a directory`);
      return;
    }

    if (movePathDirError || pathFileError) {
      console.log("wrong path");
      return;
    }

    const pathToFile = path.isAbsolute(pathDecompressFile)
      ? pathDecompressFile
      : path.join(process.cwd(), pathDecompressFile);
    const pathToDir = path.isAbsolute(pathDecompressToDir)
      ? pathDecompressToDir
      : path.join(process.cwd(), pathDecompressToDir);

    const nameFile = path.basename(pathToFile).replace(".br", "");
    const readStream = fs.createReadStream(pathToFile, { flags: "r" });
    const writeStream = fs.createWriteStream(path.join(pathToDir, nameFile), { flags: "w" });
    const brotliDecompress = zlib.createBrotliDecompress();
    await pipeline(readStream, brotliDecompress, writeStream);
  } catch {
    console.log("wong path");
  }
};
