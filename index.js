import readline from "readline";
import { homedir } from "os";
import { sayCurrentlyPath, sayGoodby, sayHallo } from "./helper.js";
import { moveUpTheDirectory } from "./fs/moveUpTheDirectory.js";
import { showDirectory } from "./fs/showDirectory.js";
import { readFile } from "./fs/readFile.js";
import { createEmptyFile } from "./fs/createEmptyFile.js";
import { renameFile } from "./fs/renameFile.js";
import { navigationByDirectories } from "./fs/navigationByDirectories.js";
import { showOsParameter } from "./os/showOsParameter.js";
import { moveFile } from "./fs/moveFile.js";
import { showHashFile } from "./hash/showHashFile.js";
import { copyFile } from "./fs/copyFile.js";
import { compressFile } from "./zlib/compress.js";
import { decompressFile } from "./zlib/decompress.js";

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

promptInput("app>", async (input) => {
  const strFromConsole = input.replace(/ +/g, " ").trim().split(" ");
  const command = strFromConsole[0];
  const params = strFromConsole.length > 1 ? strFromConsole.splice(1) : "";

  switch (true) {
    case command === "up" && params.length === 0:
      moveUpTheDirectory();
      break;
    case command === "cd" && params.length === 1:
      navigationByDirectories(params[0]);
      break;
    case command === "ls" && params.length === 0:
      showDirectory();
      break;
    case command === "cat" && params.length === 1:
      const text = await readFile(params[0]);
      text && console.log(text);
      break;
    case command === "add" && params.length === 1:
      await createEmptyFile(params[0]);
      break;
    case command === "rn" && params.length === 2:
      renameFile(params[0], params[1]);
      break;
    case command === "cp" && params.length === 2:
      copyFile(params[0], params[1]);
      break;
    case command === "mv" && params.length === 2:
      moveFile(params[0], params[1]);
      break;
    case command === "os" && params.length === 1:
      showOsParameter(params[0]);
      break;
    case command === "hash" && params.length === 1:
      showHashFile("sha256", params[0]);
      break;
    case command === "compress" && params.length === 2:
      compressFile(params[0], params[1]);
      break;
    case command === "decompress" && params.length === 2:
      decompressFile(params[0], params[1]);
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
