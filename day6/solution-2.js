const vectors = require("fs").readFileSync("input.txt", "utf-8")
    .split("\n")
    .map(s => s
        .split(", ")     
        .map(p => Number.parseInt(p))
    );
    
const manhattanDistance = (a, b) => Math.abs((b[0] || 0) - (a[0] || 0)) + Math.abs((b[1] || 0) - (a[1] || 0))

const getMaxSize = (vectors) => vectors
        .map(vector => Math.max(vector[0], vector[1]))
        .reduce((maxValue, value) => maxValue < value ? value : maxValue, 0)

const pointsWithMaxDistance = (vectors, size, maxDistance) => {    
    return new Array(size * size).fill(".").map((_, idx) => {
        const gridPoint = [idx % size, Math.floor(idx / size)];
        return vectors
            .map(vector => manhattanDistance(gridPoint, vector))
            .reduce((a, b) => a + b, 0)
    }).map(val => val < maxDistance ? 1 : 0);
}
const size = getMaxSize(vectors) + 1;
const printPlane = (plane, size) => {
    let buffer = '';
    for (index in plane) {
        if (index % size == 0) {
            buffer += "\n";
        }
        buffer += "," + plane[index];
    }
    console.log(buffer);
} 
console.log(vectors);
const plane = pointsWithMaxDistance(vectors, size, 10000);
//printPlane(plane, size);
console.log(plane.reduce((a, b) => a + b, 0 ));
