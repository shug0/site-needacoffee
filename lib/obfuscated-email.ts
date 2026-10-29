// Keeps the address out of the published HTML and JS, where scrapers look for "x@y.z".
// Not encryption: anyone running the page's JS gets it back, which is the point.
// To change the address, paste the output of this command into ENCODED_EMAIL:
// node --experimental-strip-types --no-warnings -e "import('./lib/obfuscated-email.ts').then(m => console.log(m.encodeEmail('new@address')))"
const KEY = 'needacoffee';

export const ENCODED_EMAIL = 'DQoLEAAAGyYIAAAKBAYLBwUKA0gDFw==';

function xorWithKey(text: string): string {
  return Array.from(text, (char, index) =>
    String.fromCharCode(char.charCodeAt(0) ^ KEY.charCodeAt(index % KEY.length))
  ).join('');
}

export function encodeEmail(email: string): string {
  return btoa(xorWithKey(email));
}

export function decodeEmail(encoded: string): string {
  return xorWithKey(atob(encoded));
}
