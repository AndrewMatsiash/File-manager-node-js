
export const sayHallo = (userName) => {
  console.log(`Welcome to the File Manager, ${userName}!`);
};

export const sayGoodby = (userName) => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
};

export const sayCurrentlyPath = (currentPath) => {
  console.log(`You are currently in ${process.cwd()}`);
};
