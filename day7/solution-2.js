const rawDependencies = require("fs").readFileSync("input-test.txt", "utf-8")
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

const getTimeForStep = step => 60 + step.charCodeAt(0) - 64;
const allocateWorkers = (dependencies, numWorkers) => {
    const workers = new Array();
    for(let [step, dependecy] of dependencies) {
        if (dependecy.length == 0) {
            workers.push([step, getTimeForStep(step)])
            if (workers.length >= numWorkers) return workers;
        }
    }
    return workers;
}

/**
 * 
 * @param {Map<String, Array>} dependencies 
 */
const solve = (dependencies, workers) => {
    const allocatedWorkers = allocateWorkers(dependencies, workers);
    console.log(allocatedWorkers);
    /*for(let [step, dependecy] of dependencies) {
        if (dependecy.length == 0) {
            return step + solve(removeDependency(step, dependencies))
        }
    }*/
    return "-END: " + dependencies.size;
}


const dependencyMap = getDependencyMap(rawDependencies)
console.log(dependencyMap);    
console.log(solve(dependencyMap, 2));