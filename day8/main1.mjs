import { defineLayers, findCounts, readInput } from "./pixelLayers.mjs";

console.log(findCounts(defineLayers(readInput("puzzleinput.txt"), 25, 6)));
