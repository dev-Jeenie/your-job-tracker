export const dateFormatter = (date?: string): string | null => {
  if (!date) return null;
  const year = new Date(date)?.getFullYear().toString().slice(2, 4);
  const month = (new Date(date)?.getMonth() + 1).toString().padStart(2, "0");
  const day = new Date(date)?.getDate().toString().padStart(2, "0");

  return `${year}.${month}.${day}`;
};
