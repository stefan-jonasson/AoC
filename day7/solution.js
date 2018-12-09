const rawDependencies = require("fs").readFileSync("input.txt", "utf-8")
    .split("\n")
    .map(s => s.match(/Step ([A-Z]) must be finished before step ([A-Z]) can begin./))
    .map(r => [r[2], r[1]]);

const getDependencyMap = (rawDependencies) => new Map (
    [...( new Set(rawDependencies.flatMap(a => a)))].sort()
        .map( step => [step ,
                rawDependencies
                .filter(d => d[0] == step)
                .map(d => d[1]) 
            ]));    

/**
 * 
 * @param {String} step 
 * @param {Map<String, Set>} dependencies 
 */
const removeDependency = (step, dependencies) => {
    const newDependencies = new Map();
    dependencies.forEach((v, k) => {        
        if (k != step) {            
            newDependencies.set(k, v.filter(depStep => depStep != step));
        }
    });
    return newDependencies;
}

/**
 * 
 * @param {Map<String, Array>} dependencies 
 */
const solve = (dependencies) => {
    for(let [step, dependecy] of dependencies) {
        if (dependecy.length == 0) {
            return step + solve(removeDependency(step, dependencies))
        }
    }
    return "-END: " + dependencies.size;
}

const dependencyMap = getDependencyMap(rawDependencies)
console.log(dependencyMap);    
console.log(solve(dependencyMap));