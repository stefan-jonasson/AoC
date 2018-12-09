const vectors = require("fs").readFileSync("input.txt", "utf-8")
    .split("\n")
    .map(s => s
        .split(", ")     
        .map(p => Number.parseInt(p))
    );
    
const manhattanDistance = (a, b) => Math.abs((b[0] || 0) - (a[0] || 0)) + Math.abs((b[1] || 0) - (a[1] || 0))

const getMaxSize = (vecotrs) => vectors
        .map(vector => Math.max(vector[0], vector[1]))
        .reduce((maxValue, value) => maxValue < value ? value : maxValue, 0)

const getDistancePlane = (vectors, size) => {    
    return new Array(size * size).fill(".").map((_, idx) => {
        const gridPoint = [idx % size, Math.round(idx / size)];
        const distances = vectors.map((vector, id) => {
            return {
                distance: manhattanDistance(vector, gridPoint), 
                id: id
            }
        })
        .sort((a, b) => a.distance - b.distance)        
        if (distances[0].distance == distances[1].distance) {
            return "."
        } else {
            return distances[0].id;
        }
    });
}
const size = getMaxSize(vectors) + 1;
const printPlane = (plane, size) => {
    let buffer = '';
    for (index in plane) {
        if (index % size == 0) {
            buffer += "\n";
        }
        buffer += plane[index];
    }
    console.log(buffer);
} 
const infiniteAreas = (plane, size) => {
    const edgeIds = new Set();
    for (let pos = 0; pos < size; pos++) {
        // Top 
        edgeIds.add(plane[pos]);
        // Bottom        
        edgeIds.add(plane[(size * size) - (pos + 1)]);
        // Left        
        edgeIds.add(plane[pos * size ]);
        // Right        
        edgeIds.add(plane[(pos * size) + size - 1]);
    }
    return edgeIds;
}
/**
 * 
 * @param {Array} plane 
 * @param {Set} infiniteAreas 
 */
const solve = (plane, infiniteAreas) => {
    const summary = new Map();
    for (let areaId of plane) {
        if (!infiniteAreas.has(areaId)) {
            if (!summary.has(areaId)) {
                summary.set(areaId, 1)
            } else {
                summary.set(areaId, summary.get(areaId) + 1)
            }            
        }
    }    
    return Math.max(...summary.values());
}
console.log(vectors);
const plane = getDistancePlane(vectors, size);
printPlane(plane, size);

console.log(solve(plane, infiniteAreas(plane, size)));
