import { readFileSync } from "fs";

/*
0 black
1 white
2 transparent
*/
export const readInput = filename => {
  return readFileSync(filename, "utf-8");
};

const defineLayers = (input, width, height) => {
  const size = width * height;
  const fullLayers = [];
  for (let i = 0; i < input.length; i += size) {
    const layer = [];
    const full = input.slice(i, i + size);
    for (let j = 0; j < full.length; j += width) {
      layer.push(full.slice(j, j + width));
    }
    fullLayers.push(layer);
  }
  return fullLayers;
};

export const getImage = (input, width, height) => {
  const layers = defineLayers(input, width, height);

  return layers
    .reduce((acc, val) => {
      return acc.map((text, i) => {
        const image = text.split("");
        const compare = val[i].split("");
        for (let i = 0; i < width; i++) {
          image[i] = image[i] == 2 ? compare[i] : image[i];
        }
        return image.join("");
      });
    })
    .map(layer => {
      const digits = layer.split("");
      return digits
        .map(digit => {
          return digit == 1 ? "X" : " ";
        })
        .join("");
    })
    .join("\n");
};
