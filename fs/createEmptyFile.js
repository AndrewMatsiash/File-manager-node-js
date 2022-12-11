import path from "path";
import * as fsPromise from "fs/promises";

export const createEmptyFile = async (fileName) => {
  try {
    await fsPromise.open(path.join(process.cwd(), fileName), "wx");
    console.log("File created");
  } catch (error) {
    console.log("a file with the same name already exists");
  }
};
