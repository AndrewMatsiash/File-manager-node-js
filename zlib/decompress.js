import zlib from "zlib";
import path from "zlib";
import * as fsPromise from "fs/promises";

export const decompressFile = async (pathDecompressFile, pathToDir) => {
  try {
    await fsPromise.stat(path.join(pathDecompressFile));
    const nameFile = path.basename(pathDecompressFile).replace(".br", "");
    const readStream = fs.createReadStream(path.join(pathDecompressFile), { flags: "r" });
    const writeStream = fs.createWriteStream(path.join(pathToDir, nameFile), { flags: "w" });
    const brotliCompress = zlib.brotliDecompress();
    await pipeline(readStream, brotliCompress, writeStream);
  } catch {
    console.log("wong path");
  }
};
