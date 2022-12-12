import readline from "readline";
import  { homedir } from "os";
import { sayCurrentlyPath, sayGoodby, sayHallo } from "./helper.js";
import { moveUpTheDirectory } from "./fs/moveUpTheDirectory.js";
import { showDirectory } from "./fs/showDirectory.js";
import { readFile } from "./fs/readFile.js";
import { createEmptyFile } from "./fs/createEmptyFile.js";
import { renameFile } from "./fs/renameFile.js";
import { navigationByDirectories } from "./fs/navigationByDirectories.js";
import { copyFile } from "./fs/copyFile.js";
import { showOsParameter } from "./os/showOsParameter.js";
import { moveFile } from "./fs/moveFile.js";
import { showHashFile } from "./hash/showHashFile.js";

const rl = readline.createInterface(process.stdin, process.stdout);

const userHomeDir = homedir();
const userName = process.argv.at(-1).split("=")[1];
process.chdir(userHomeDir);

sayHallo(userName);
sayCurrentlyPath();

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
    case command === "cd" && params.length === 1:
      navigationByDirectories(params[1]);
      break;
    case command === "ls" && params.length === 0:
      showDirectory();
      break;
    case command === "cat" && params.length === 1:
      readFile(params);
      break;
    case command === "add" && params.length === 1:
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
    case command === "hash" && params.length === 2:
      showHashFile("sha256", params[1]);
      break;
    case "exit":
      return false;
    default:
      console.log("invalid command");
  }
  sayCurrentlyPath();
});

process.on("exit", () => {
  sayGoodby(userName);
});
