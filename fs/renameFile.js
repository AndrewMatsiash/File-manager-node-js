import path from "path";
import * as fsPromise from "fs/promises";

export const renameFile = async (oldNameFile, newFileName) => {
  try {
    await fsPromise.rename(path.join(process.cwd(), oldNameFile), path.join(process.cwd(), newFileName));
    console.log("File renamed successfully!");
  } catch (error) {
    console.log("Error renaming file");
  }
};
