import crypto from "crypto";
import fs from "fs";
import path from "path";
import { getDataPath } from "../helper.js";

export const showHashFile = async (hashName, pathFile) => {
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

    const hash = crypto.createHash(hashName);
    const streamRead = fs.createReadStream(pathToFile);
    streamRead.on("error", (err) => console.log("error hash file"));
    streamRead.on("data", (chunk) => hash.update(chunk));
    streamRead.on("end", () => console.log(hash.digest("hex")));
  } catch {
    console.log("wrong path");
  }
};
