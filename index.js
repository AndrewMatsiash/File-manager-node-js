import readline from "readline";
import fs from "fs/promises";
import os from "os";
import path, { join, isAbsolute, extname } from "path";
import { navigationByDirectories, sayCurrentlyPath, sayGoodby, sayHallo } from "./helper.js";
const rl = readline.createInterface(process.stdin, process.stdout);

const userHomeDir = os.homedir();
const userName = process.argv.at(-1).split("=")[1];
let currentPath = "/Users/andrej/Desktop/File-manager-node-js/index.js";

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

promptInput("app> ", (input) => {
  const strFromConsole = input.replace(/ +/g, " ").trim().split(" ");
  const command = strFromConsole[0];
  const params = strFromConsole.length > 1 ? strFromConsole[1] : "";

  switch (command) {
    case "cd":
      navigationByDirectories(params).then(() => sayCurrentlyPath(currentPath));
      break;
    case "exit":
      return false;
  }
});

process.on("exit", () => {
  sayGoodby(userName);
});
