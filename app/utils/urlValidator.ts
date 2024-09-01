export const urlValidator = (string: string): boolean => {
  const pattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/.*)?$/;
  return pattern.test(string);
};