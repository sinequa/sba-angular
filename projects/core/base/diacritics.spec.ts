import { diacriticsInsensitiveRegexp } from './diacritics';
import { Utils } from './utils';


const text = "J'habite dans la région Rhône-Alpes...";
const search = "Rhône";
const searchNorm = Utils.removeAccents(search);

describe("Diacritics", () => {
  it("Utils.removeAccent should remove accents", () => {
    expect(searchNorm).toEqual("Rhone");
  })

  it("normal Regexp search is diacritics sensitive", () => {
    expect(text.match(new RegExp(search, 'g'))).toBeTruthy();
    expect(text.match(new RegExp(searchNorm, 'g'))).toBeFalsy();
  });

  it("diacriticsInsensitiveRegexp should match in any case", () => {
    expect(text.match(diacriticsInsensitiveRegexp(search))).toBeTruthy();
    expect(text.match(diacriticsInsensitiveRegexp(searchNorm))).toBeTruthy();
  });

  it("diacriticsInsensitiveRegexp prefix should work", () => {
    expect(text.match(diacriticsInsensitiveRegexp('Rhone', '\\b'))).toBeTruthy();
    expect(text.match(diacriticsInsensitiveRegexp('hone', '\\b'))).toBeFalsy();
  });

  it("diacriticsInsensitiveRegexp suffix should work", () => {
    expect(text.match(diacriticsInsensitiveRegexp('Rhone', '', '\\b'))).toBeTruthy();
    expect(text.match(diacriticsInsensitiveRegexp('Rhon', '', '\\b'))).toBeFalsy();
  });
});
