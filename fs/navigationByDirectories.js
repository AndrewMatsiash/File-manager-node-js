export const navigationByDirectories = async (directory) => {
  try {
    process.chdir(directory);
  } catch (error) {
    console.log("Operation failed");
  }
};
