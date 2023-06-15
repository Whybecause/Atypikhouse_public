export const isFilled = (input: string): boolean => {
  if (input == null) return;
  return /\S/.test(input);
};