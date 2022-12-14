import zlib from "zlib";
import path from "zlib";
import * as fsPromise from "fs/promises";

export const compressFile = async (pathCompressFile, pathToDir) => {
  try {
    await fsPromise.stat(path.join(pathCompressFile));
    const nameFile = path.basename(pathCompressFile);
    const readStream = fs.createReadStream(path.join(pathCompressFile), { flags: "r" });
    const writeStream = fs.createWriteStream(path.join(pathToDir, `${nameFile}`), { flags: "wx" });
    const brotliCompress = zlib.brotliCompress();
    await pipeline(readStream, brotliCompress, writeStream);
  } catch {
    console.log("wong path");
  }
};
