export const moveUpTheDirectory = async (path) => {
  return (path = join(path, ".."));
};
