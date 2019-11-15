const charsets = [
  {
    length: 26,
    name: 'lowercase',
    regex: /[a-z]/,
  },
  {
    length: 26,
    name: 'uppercase',
    regex: /[A-Z]/,
  },
  {
    length: 10,
    name: 'numbers',
    regex: /[0-9]/,
  },
  {
    length: 31,
    name: 'symbols',
    regex: /[^a-zA-Z0-9]/,
  },
];

// Scale a number from one range to another
export function scale(num, in_min, in_max, out_min, out_max) {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}

// Calculate the entropy of a string based on the size of the charset used and
// the length of the string. Based on http://bit.ly/2XgL7g0
export function calculateEntropy(charsetSize, length) {
  return Math.round((Math.log(charsetSize) / Math.LN2) * length);
}

// Calculate the total charset lengths of a given string
export function calculateCharsetLength(string) {
  if (!string) {
    return 0;
  }

  return charsets.reduce(
    (length, charset) =>
      length + (charset.regex.test(string) ? charset.length : 0),
    0,
  );
}

export function calculatePasswordEntropy(password) {
  if (!password) {
    return 0;
  }

  return calculateEntropy(calculateCharsetLength(password), password.length);
}

function calculatePasswordStrength(password) {
  const scaledScore = scale(calculatePasswordEntropy(password), 0, 150, 0, 100);

  return scaledScore > 100 ? 100 : Math.round(scaledScore);
}

export default calculatePasswordStrength;
