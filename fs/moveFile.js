import * as fsPromise from "fs/promises";
import fs from "fs";
import { pipeline } from "stream/promises";
import path from "path";

export const moveFile = async(pathFile,movePathDir) => {
  try {
    await fsPromise.stat(path.join(pathFile));
    const nameFile = path.basename(pathFile);
    const readStream = fs.createReadStream(path.join(pathFile),{flags: "r"});
    const writeStream = fs.createWriteStream(path.join(movePathDir, nameFile),{flags: "wx"});
    await  pipeline(readStream,writeStream);
    await fsPromise.unlink(path.resolve(pathFile))
  } catch {
    console.log("wong path");
  }

}
