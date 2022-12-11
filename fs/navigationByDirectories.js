export const navigationByDirectories = async (directory) => {
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
    await fsPromise.access(newPathDir);
    currentPath = newPathDir;
  } catch {
    console.log("wrong path");
  }
};
