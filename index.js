import readline from "readline";
import os, { homedir } from "os";
import { sayCurrentlyPath, sayGoodby, sayHallo } from "./helper.js";
import { moveUpTheDirectory } from "./fs/moveUpTheDirectory.js";
import { showDirectory } from "./fs/showDirectory.js";
import { readFile } from "./fs/readFile.js";
import { createEmptyFile } from "./fs/createEmptyFile.js";
import { renameFile } from "./fs/renameFile.js";


const rl = readline.createInterface(process.stdin, process.stdout);

const userHomeDir = homedir();
const userName = process.argv.at(-1).split("=")[1];
let currentPath = userHomeDir;

sayHallo(userName);
sayCurrentlyPath(userHomeDir);

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
      moveUpTheDirectory(currentPath).then((path) => {
        currentPath = path;
        sayCurrentlyPath(currentPath);
      });
      break;
    case "cd":
      navigationByDirectories(params[1]).then(() => sayCurrentlyPath(currentPath));
      break;
    case command === "ls" && params.length === 0:
      showDirectory(currentPath).then(() => sayCurrentlyPath(currentPath));
      break;
    case command === "cat":
      readFile(params).then(() => sayCurrentlyPath(currentPath));
      break;
    case command === "add":
      createEmptyFile(currentPath, params[1]).then(() => sayCurrentlyPath(currentPath));
      break;
    case command === "rn" && params.length === 3:
      renameFile(currentPath, params[1], params[2]).then(() => sayCurrentlyPath(currentPath));
      break;
    case "exit":
      return false;
  }
});

process.on("exit", () => {
  sayGoodby(userName);
});
