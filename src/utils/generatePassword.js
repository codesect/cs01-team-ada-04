const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const similarCharacters = /[ilLI|oO0`']/g;
// eslint-disable-next-line no-useless-concat
const symbols = '!@#$%^&*()+_-=}{[]|:;"/?.><,`~' + "'";
const uppercase = lowercase.toUpperCase();

function random() {
  const crypto = window.crypto || window.msCrypto;

  if (!crypto) {
    return Math.random();
  }

  const array = new Uint32Array(1);
  crypto.getRandomValues(array);

  // translate from a random integer to a floating point from 0 to 1
  return array[0] / Math.pow(2, 32);
}

function pickOneFrom(str) {
  const atIndex = Math.floor(random() * str.length);

  return str[atIndex];
}

function generatePassword(options = {}) {
  const {
    excludeSimilar = false,
    length = 12,
    hasLowercase = true,
    hasNumbers = false,
    hasSymbols = false,
    hasUppercase = true,
  } = options;

  if (!hasLowercase && !hasNumbers && !hasSymbols && !hasUppercase) {
    throw new Error(
      'Invalid options! One of "hasLowercase", "hasUppercase", "hasNumbers", or "hasSymbols" has to be true.',
    );
  }

  let characters = '';

  if (hasLowercase) {
    characters += lowercase;
  }

  if (hasUppercase) {
    characters += uppercase;
  }

  if (hasNumbers) {
    characters += numbers;
  }

  if (hasSymbols) {
    characters += symbols;
  }

  if (
    excludeSimilar &&
    hasLowercase + hasNumbers + hasSymbols + hasUppercase > 1
  ) {
    characters = characters.replace(similarCharacters, '');
  }

  return Array(length)
    .fill('')
    .map(() => pickOneFrom(characters))
    .join('');
}

export default generatePassword;
