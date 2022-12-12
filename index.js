import readline from "readline";
import os, { homedir } from "os";
import path from "path";
import { sayCurrentlyPath, sayGoodby, sayHallo } from "./helper.js";
import { moveUpTheDirectory } from "./fs/moveUpTheDirectory.js";
import { showDirectory } from "./fs/showDirectory.js";
import { readFile } from "./fs/readFile.js";
import { createEmptyFile } from "./fs/createEmptyFile.js";
import { renameFile } from "./fs/renameFile.js";
import { navigationByDirectories } from "./fs/navigationByDirectories.js";
import * as fsPromise from "fs/promises";
import fs from "fs";
import { pipeline } from "stream/promises";
import { copyFile } from "./fs/copyFile.js";
import { showOsParameter } from "./os/showOsParameter.js";

const rl = readline.createInterface(process.stdin, process.stdout);

const userHomeDir = homedir();
const userName = process.argv.at(-1).split("=")[1];
let currentPath = process.cwd();

sayHallo(userName);
sayCurrentlyPath(currentPath);

function promptInput(prompt, handler) {
  rl.question(prompt, (input) => {
    if (handler(input) !== false) {
      promptInput(prompt, handler);
    } else {
      rl.close();
    }
  });
}

promptInput("app>", (input) => {
  const strFromConsole = input.replace(/ +/g, " ").trim().split(" ");
  const command = strFromConsole[0];
  const params = strFromConsole.length > 1 ? strFromConsole : "";

  switch (true) {
    case command === "up":
      moveUpTheDirectory();
      break;
    case "cd" && params.length === 1:
      navigationByDirectories(params[1]);
      break;
    case command === "ls" && params.length === 0:
      showDirectory();
      break;
    case command === "cat":
      readFile(params);
      break;
    case command === "add":
      createEmptyFile(params[1]);
      break;
    case command === "rn" && params.length === 3:
      renameFile(params[1], params[2]);
      break;
    case command === "cp" && params.length === 3:
      copyFile(params[1], params[2]);
      break;
    case command === "mv" && params.length === 3:
      moveFile(params[1], params[2]);
      break;
    case command === "os" && params.length === 2:
      showOsParameter(params[1]);
      break;
    case "exit":
      return false;
      default:
        console.log('invalid command');
  }
  sayCurrentlyPath(process.cwd());
});

process.on("exit", () => {
  sayGoodby(userName);
});
