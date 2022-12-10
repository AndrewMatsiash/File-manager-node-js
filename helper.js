export const sayHallo = (userName) => {
	console.log(`Welcome to the File Manager, ${userName}!`);
};

export const sayGoodby = (userName) => {
	console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
};

export const sayCurrentlyPath = (currentPath) => {
	console.log(`You are currently in ${currentPath}`);
};

export const navigationByDirectories = async (directory) => {
  if (directory === "..") {
    currentPath = join(currentPath, "..");
    return;
  }

  if (path.extname(directory)) {
    console.log(`cd: not a directory: ${newPath}`);
    return;
  }

  if (isAbsolute(directory)) {
    currentPath = newPath;
    return;
  }

  try {
    const newPathDir = join(currentPath, directory);
  await  fs.access(newPathDir);
    currentPath = newPathDir;
  } catch {
    console.log("wrong path");
  } 
};
