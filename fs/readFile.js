import path from "path";
import * as fsPromise from "fs/promises";

export const readFile = async (pathFile) => {
  const readStream = fsPromise.createReadStream(path.join(pathFile));
  let result = "";
  await readStream.on("data", (chunk) => {
    result += chunk;
  });
  readStream.on("end", () => process.stdout._write(result));
};
