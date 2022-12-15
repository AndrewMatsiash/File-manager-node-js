import path from "path";
import fs from "fs";
import { getDataPath } from "../helper.js";

export const readFile = async (pathFile) => {
  const { isDirectory, error } = await getDataPath(pathFile);

  if (error) {
    console.log("invalid path");
    return;
  }

  if (isDirectory) {
    console.log("the path is to directory not to file");
    return;
  }

  let data = "";

  const readStream = fs.createReadStream(path.join(pathFile));

  return new Promise((resolve, reject) => {
    readStream.on("data", (chunk) => {
      data += chunk.toString();
    });
    readStream.on("end", (chunk) => {
      resolve(data);
    });
    readStream.on("error", () => {
      reject("error reading file");
    });
  });
};
