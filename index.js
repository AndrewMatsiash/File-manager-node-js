import readline from "readline";
import os, { homedir } from "os";
import fs from "fs";

import { navigationByDirectories, readFile, sayCurrentlyPath, sayGoodby, sayHallo, showDirectory } from "./helper.js";
import { join } from "path";
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
  const params = strFromConsole.length > 1 ? strFromConsole[1] : "";

  switch (true) {
    case "cd":
      navigationByDirectories(params).then(() => sayCurrentlyPath(currentPath));
      break;
    case command === "ls" && params.length === 0:
       showDirectory(currentPath).then(() => sayCurrentlyPath(currentPath));;
      break;
    case command === "cat": 
       readFile(params).then(() => sayCurrentlyPath(currentPath));
      break;
    case "exit":
      return false;
  }
});

process.on("exit", () => {
  sayGoodby(userName);
});
