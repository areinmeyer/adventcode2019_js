import { readFileSync } from "fs";

export const readInput = filename => {
  return readFileSync(filename, "utf-8");
};

const countChars = (val, reg) => {
  const matches = [...val.matchAll(reg)];
  return matches.length;
};

export const defineLayers = (input, width, height) => {
  const size = width * height;
  const layers = [];
  for (let i = 0; i < input.length; i += size) {
    layers.push(input.slice(i, i + size));
  }
  return layers;
};

export const findCounts = layers => {
  const fewestZeroes = layers.reduce((acc, layer) => {
    const count = countChars(layer, "0");
    const accCount = countChars(acc, "0");
    return accCount > count ? layer : acc;
  });
  const ones = countChars(fewestZeroes, "1");
  const twos = countChars(fewestZeroes, "2");
  return ones * twos;
};
