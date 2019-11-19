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
export function scale(num, inMin, inMax, outMin, outMax) {
  return ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
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

// Calculate the entropy of a string based on the size of the charset used and
// the length of the string. Based on http://bit.ly/2XgL7g0
export function calculateEntropy(password) {
  if (!password) {
    return 0;
  }

  const charsetSize = calculateCharsetLength(password);
  const entropy = (Math.log(charsetSize) / Math.LN2) * password.length;

  return Math.round(entropy);
}

function calculatePasswordStrength(password) {
  const entropy = calculateEntropy(password);
  const scaledScore = scale(entropy, 0, 150, 0, 100);

  return scaledScore > 100 ? 100 : Math.round(scaledScore);
}

export default calculatePasswordStrength;
