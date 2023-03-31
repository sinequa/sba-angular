import { replacementList } from "diacritics";

const charMap = Object.fromEntries(
  replacementList.map(({base, chars}) => [base, `[${base}${chars}]`])
);

export function diacriticsInsensitiveRegexp(str: string, prefix = '', suffix = '', flags = 'g') {
  const pattern = prefix + str.replace(/\S/g, ch => charMap[ch] || ch) + suffix;
  return new RegExp(pattern, flags);
}
