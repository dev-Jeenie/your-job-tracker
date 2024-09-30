export const urlValidator = (string: string): boolean => {
  const pattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}([\/\w\.-]*)*(\?.*)?$/;
  return pattern.test(string);
};
