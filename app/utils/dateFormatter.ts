export const dateFormatter = (date: Date): string => {
  const year = date.getFullYear().toString().slice(2,4);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}.${month}.${day}`;
};
