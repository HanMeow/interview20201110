const a = 68903; // prime 1
const b = 101653; // prime 2
// const m = 37633; // prime 3 for mod
// const b = 16785407; // prime 2
const m = 263167; // prime 3 for mod

const seed = {
  origin: 0,
  process: 0,
};

const setSeed = (payload) => {
  const type = typeof payload;
  if (type !== 'number') {
    console.warn(`Method [setSeed] should be called with a number, bug get ${type}.`);
  } else {
    seed.origin = payload;
    seed.process = payload;
  }
};

const nextSeed = () => {
  const next = (seed.process * a + b) % m | 0;
  seed.process = next < 0 ? -next : next;
  return seed.process;
};

const seed2Number = () => {
  nextSeed();
  return seed.process / m;
};

const seed2String = (length = 7) => window.btoa(`${seed2Number() * window.Math.pow(10, length - 1) | 0}`);

const nextString = (length = 7) => seed2String(length).replace(/=/g, () => seed2String(length).slice(0, 1));

setSeed(68903 + Math.random() * 20181102 | 0);

/**
 * @function random - 直接使用可得基於 random seed 的 0 - 0.9999 亂數
 */
function random() {
  return seed2Number();
}

// random.valueOf = () => nextSeed();
random.valueOf = () => seed2Number();
random.toString = () => nextString();

random.value = () => random.valueOf();
// random.string = () => random.toString();

Object.defineProperty(random, 'seed', {
  get() { return seed.origin; },
  set(val) { setSeed(val); },
});

Object.defineProperty(random, 'next', {
  get() { return nextSeed(); },
  set(val) { return false; },
});

Object.defineProperty(random, 'string', {
  get() { return nextString(); },
  set(val) { return false; },
});

export default random;

export const { toString, valueOf } = random;
