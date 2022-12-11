import path from "path";
import * as fsPromise from "fs/promises";

export const renameFile = async (currentPath, oldNameFile, newFileName) => {
  try {
    await fsPromise.rename(path.join(currentPath, oldNameFile), path.join(currentPath, newFileName));
    console.log("File renamed successfully!");
  } catch (error) {
    console.log("Error renaming file");
  }
};
