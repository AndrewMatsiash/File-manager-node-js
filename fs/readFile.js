import path from "path";
import * as fsPromise from "fs/promises";

export const readFile = async (pathFile) => {
  const readStream = fsPromise.createReadStream(path.join(pathFile));
  readStream.pipe(process.stdout);
};
