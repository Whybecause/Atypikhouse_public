export const formatedString = (str: string): string => str.replace(/[^\w\s]/gi, " ").toLowerCase();

export const notUndefined = anyValue => typeof anyValue !== "undefined";

export function capitalizeFirstLetter(string: string):string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function prettifyIf0(value: number):string | number {
  value = value ?? 0;
  if (value === 0) return ("---");
  return value;
}