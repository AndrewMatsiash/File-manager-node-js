import path, { join, isAbsolute, extname } from "path";
import * as fsPromise from "fs/promises";

export const sayHallo = (userName) => {
  console.log(`Welcome to the File Manager, ${userName}!`);
};

export const sayGoodby = (userName) => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
};

export const sayCurrentlyPath = (currentPath) => {
  console.log(`You are currently in ${currentPath}`);
};
