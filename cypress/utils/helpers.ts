export const wordToTitleCase = (word: string) =>
  `${word.charAt(0).toUpperCase()}${word.slice(1)}`;

export const getTodayPlus = (
  days: number
): { text: string; dateText: string } => {
  const today = new Date();
  const future = new Date();
  future.setDate(today.getDate() + days);
  return {
    text: future.toLocaleDateString("en-US"),
    dateText: future.getDate.toString(),
  };
};
