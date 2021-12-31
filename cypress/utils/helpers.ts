export const stringToTitleCase = (str: string) =>
  str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

export const getTodayPlus = (
  days: number
): { text: string; dateText: string } => {
  const today = new Date();
  const future = new Date();
  future.setDate(today.getDate() + days);
  return {
    text: future.toLocaleDateString("en-US", {
      month: "2-digit",
      year: "numeric",
      day: "2-digit"
    }),
    dateText: future.getDate.toString(),
  };
};
