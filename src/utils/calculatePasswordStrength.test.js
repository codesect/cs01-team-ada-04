import calculatePasswordStrength, {
  calculateCharsetLength,
  calculateEntropy,
  calculatePasswordEntropy,
  scale,
} from './calculatePasswordStrength';

describe('scale', () => {
  it('returns a number', () => {
    expect(typeof scale(5, 0, 10, 0, 100)).toBe('number');
  });

  it('scales numbers correctly', () => {
    expect(scale(0, 0, 1, 0, 100)).toBe(0);
    expect(scale(1, 0, 1, 0, 100)).toBe(100);
    expect(scale(0.25, 0, 1, 0, 100)).toBe(25);
    expect(scale(5, 0, 100, 0, 10)).toBe(0.5);
    expect(scale(39, 0, 100, 100, 200)).toBe(139);
    expect(scale(150, 0, 100, 0, 10)).toBe(15);
  });
});

describe('calculateCharsetLength', () => {
  it('returns a number', () => {
    expect(typeof calculateCharsetLength('abc123')).toBe('number');
  });

  it('returns zero if string is empty', () => {
    expect(calculateCharsetLength()).toBe(0);
    expect(calculateCharsetLength('')).toBe(0);
  });

  it('calculates charset lengths correctly', () => {
    expect(calculateCharsetLength('ab')).toBe(26);
    expect(calculateCharsetLength('CD')).toBe(26);
    expect(calculateCharsetLength('123')).toBe(10);
    expect(calculateCharsetLength('?:')).toBe(31);

    expect(calculateCharsetLength('aB')).toBe(52);
    expect(calculateCharsetLength('a4')).toBe(36);
    expect(calculateCharsetLength('a{')).toBe(57);

    expect(calculateCharsetLength('C5')).toBe(36);
    expect(calculateCharsetLength('C"')).toBe(57);

    expect(calculateCharsetLength('6!')).toBe(41);

    expect(calculateCharsetLength('aB3')).toBe(62);
    expect(calculateCharsetLength('aB|')).toBe(83);
    expect(calculateCharsetLength('E4%')).toBe(67);

    expect(calculateCharsetLength('xY9@')).toBe(93);
  });
});

describe('calculateEntropy', () => {
  it('returns a number', () => {
    expect(typeof calculateEntropy(26, 8)).toBe('number');
  });
});

describe('calculatePasswordEntropy', () => {
  it('returns a number', () => {
    expect(typeof calculatePasswordEntropy('password')).toBe('number');
  });
});

describe('calculatePasswordStrength', () => {
  it('returns a number', () => {
    expect(typeof calculatePasswordStrength('password')).toBe('number');
  });

  it('returns zero if password length is zero', () => {
    expect(calculatePasswordStrength(null)).toBe(0);
  });

  it('returns a very low score for a very weak password', () => {
    expect(calculatePasswordStrength('arxxwu')).toBeLessThan(20);
  });

  it('returns a low score for a weak password', () => {
    expect(calculatePasswordStrength('JegoyDeeqs')).toBeGreaterThan(20);
    expect(calculatePasswordStrength('JegoyDeeqs')).toBeLessThan(40);
  });

  it('returns a good score for a good password', () => {
    expect(calculatePasswordStrength('j3hp4cKJmO5S')).toBeGreaterThan(40);
    expect(calculatePasswordStrength('j3hp4cKJmO5S')).toBeLessThan(60);
  });

  it('returns a very good score for a very strong password', () => {
    expect(calculatePasswordStrength('PoNukoonKFolYGou')).toBeGreaterThan(60);
    expect(calculatePasswordStrength('PoNukoonKFolYGou')).toBeLessThan(80);
    expect(
      calculatePasswordStrength('6uQi-E{}aK9fRAjCVCa|_#M0'),
    ).toBeGreaterThan(80);
  });

  it('returns 100 as a maximum strength', () => {
    const password = 'V"HV&k/.@J7)aCn{$BTx,l4Y7`Wm*7wS<mIwo)=gobf7OPQ=a';
    expect(calculatePasswordStrength(password)).toBe(100);
  });
});
