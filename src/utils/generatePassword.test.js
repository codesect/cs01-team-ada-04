import generatePassword from './generatePassword';

const regexes = {
  includes: {
    letters: /[a-z]+/gi,
    numbers: /[0-9]+/gi,
    similarCharacters: /[ilLI|oO0`']/g,
    uppercaseLetters: /[A-Z]+/g,
  },
  only: {
    letters: /^[a-z]+$/gi,
    lettersAndNumbers: /^[a-z0-9]+$/gi,
    lowercaseLetters: /^[a-z]+$/g,
    lowercaseLettersAndNumbers: /^[a-z0-9]+$/g,
  },
};

describe('generatePassword', () => {
  it('returns a password with no options provided', () => {
    const password = generatePassword();

    expect(password).toBeTruthy();
    expect(password.length).toBe(12);
  });

  it('throws if every character set is excluded', () => {
    const options = {
      hasLowercase: false,
      hasNumbers: false,
      hasSymbols: false,
      hasUppercase: false,
    };

    expect(() => generatePassword(options)).toThrow(
      /Invalid options! One of "hasLowercase", "hasUppercase", "hasNumbers", or "hasSymbols" has to be true./,
    );
  });

  it('returns a password with the correct length', () => {
    const options = { length: 50 };
    const password = generatePassword(options);

    expect(password.length).toBe(options.length);
  });

  it('only contains upper and lowercase letters by default', () => {
    const password = generatePassword();

    expect(password).toMatch(regexes.only.letters);
  });

  it('only contains lowercase letters if hasUppercase is false', () => {
    const options = { hasUppercase: false };
    const password = generatePassword(options);

    expect(password).toMatch(regexes.only.lowercaseLetters);
  });

  it('only contains lowercase letters and numbers if hasUppercase is false and hasNumbers is true', () => {
    const options = {
      hasNumbers: true,
      hasUppercase: false,
      length: 100,
    };
    const password = generatePassword(options);

    expect(password).not.toMatch(regexes.includes.uppercaseLetters);
    expect(password).toMatch(regexes.only.lowercaseLettersAndNumbers);
  });

  it('can contain letters and numbers if hasNumbers is true', () => {
    const options = { hasNumbers: true, length: 100 };
    const password = generatePassword(options);

    expect(password).toMatch(regexes.only.lettersAndNumbers);
    expect(password).toMatch(regexes.includes.letters);
    expect(password).toMatch(regexes.includes.numbers);
  });

  it('can contain letters and symbols if hasSymbols is true', () => {
    const options = { hasSymbols: true, length: 100 };
    const password = generatePassword(options);

    expect(password).toMatch(regexes.includes.letters);
    expect(password).not.toMatch(regexes.only.letters);
    expect(password).not.toMatch(regexes.includes.numbers);
  });

  it('only contains lowercase letters and symbols if hasSymbols is true and hasUppercase is false', () => {
    const options = {
      hasSymbols: true,
      hasUppercase: false,
      length: 100,
    };
    const password = generatePassword(options);

    expect(password).toMatch(regexes.includes.letters);
    expect(password).not.toMatch(regexes.only.letters);
    expect(password).not.toMatch(regexes.includes.uppercaseLetters);
    expect(password).not.toMatch(regexes.includes.numbers);
  });

  it('can contain lowercase letters, numbers, and symbols, if hasNumbers is true, hasSymbols is true, and hasUppercase is false', () => {
    const options = {
      hasNumbers: true,
      hasSymbols: true,
      hasUppercase: false,
      length: 100,
    };
    const password = generatePassword(options);

    expect(password).toMatch(regexes.includes.letters);
    expect(password).toMatch(regexes.includes.numbers);
    expect(password).not.toMatch(regexes.includes.uppercaseLetters);
    expect(password).not.toMatch(regexes.only.lowercaseLettersAndNumbers);
  });

  it('can contain letters, numbers, and symbols, if hasNumbers and hasSymbols is true', () => {
    const options = {
      hasNumbers: true,
      hasSymbols: true,
      length: 100,
    };
    const password = generatePassword(options);

    expect(password).toMatch(regexes.includes.letters);
    expect(password).toMatch(regexes.includes.numbers);
    expect(password).toMatch(regexes.includes.uppercaseLetters);
    expect(password).not.toMatch(regexes.only.lettersAndNumbers);
  });

  it('excludes similar characters if excludeSimilar is true', () => {
    const options = {
      excludeSimilar: true,
      hasNumbers: true,
      hasSymbols: true,
      length: 100,
    };
    const password = generatePassword(options);

    expect(password).toMatch(regexes.includes.letters);
    expect(password).toMatch(regexes.includes.numbers);
    expect(password).toMatch(regexes.includes.uppercaseLetters);
    expect(password).not.toMatch(regexes.only.lettersAndNumbers);
    expect(password).not.toMatch(regexes.includes.similarCharacters);
  });

  // TODO: hasLowercase option is not tested
});
