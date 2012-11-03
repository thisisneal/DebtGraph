/* All of the functions in this file operate on a graph. The type of graph is 
 * expected to be as follows:
 * type name = string
 * type graph name -> {net : int,
 *                     neighbors : name -> {net : int,
 *                                          transaction : (int * string) array}}
 */

/*
 * Add a directed edge to the graph.
 * Call this twice to properly add a transaction.
 */
function addTransactionHalf(graph, from, to, amount, description) {
    if (graph[from] == undefined) {
        graph[from] = {};
        graph[from]["net"] = amount
        graph[from]["neighbors"] = {};
        graph[from]["neighbors"][to] = {};
        graph[from]["neighbors"][to]["net"] = amount;
        graph[from]["neighbors"][to]["transactions"] = [];
        graph[from]["neighbors"][to]["transactions"][0] = {
            "amount":amount,
            "description":description
        };
    } else if (graph[from]["neighbors"][to] == undefined) {
        graph[from]["net"] += amount;
        graph[from]["neighbors"][to] = {};
        graph[from]["neighbors"][to]["net"] = amount;
        graph[from]["neighbors"][to]["transactions"] = [];
        graph[from]["neighbors"][to]["transactions"][0] = {
            "amount":amount,
            "description":description
        };
    } else {
        graph[from]["net"] += amount;
        graph[from]["neighbors"][to]["net"] += amount;
        var length = graph[from]["neighbors"][to]["transactions"].length
        graph[from]["neighbors"][to]["transactions"][length] = {
            "amount":amount,
            "description":description
        };
    }
}

/*
 * Get the net debt of the person name. Returns a negative value if the person
 * is owed money.
 */
function getNet(graph, name) {
    if (graph[name] == undefined) {
        return 0;
    } else {
        return graph[name]["net"];
    }
}

/*
 * Get the net debt from owes to. Returns a negative value if to owes from more
 * money than from owes to.
 */
function getNetBetween(graph, from, to) {
    if (graph[from] == undefined || graph[from]["neighbors"][to] == undefined) {
        return 0;
    } else {
        return graph[from]["neighbors"][to]["net"];
    }
}

/*
 * Returns the neighbors of name in graph, complete with information about debt
 * and transaction between them.
 */
function getNeighbors(graph, name) {
    if (graph[name] == undefined) {
        return {};
    } else {
        return graph[name]["neighbors"];
    }
}

/*
 * Returns the transaction history between from and to.
 */
function getTransactions(graph, from, to) {
    if (graph[from] == undefined || graph[from]["neighbors"][to] == undefined) {
        return [];
    } else {
        return graph[from]["neighbors"][to]["transactions"];
    }
}

/*
 * Finds the heaviest path from left to right, where heaviest is defined as
 * length multiplied by minimum weight across the edges in the path and
 * maxWeight. Call this before adding a new transaction in order to find any
 * cycles that adding the transaction would create. Returns "none" if no cycles
 * are found.
 */
function bestPath(graph, left, right, maxWeight) {
    var visited = {};
    var paths = [];

    var frontier = [] // maybe make this a priority queue
    for (neighbor in newNeighbors(left)) {
        frontier.push({"name":neighbor, "path": [neighbor]});
    }

    function newNeighbors(name) {
        var neighbors = getNeighbors(graph, name);
        var result = []
        for (var neighbor in neighbors) {
            if (neighbor in visited && neighbors[neighbor]["net"] > 0) {
                result[result.length] = neighbor;
            }
        }
        return result;
    }

    // Breadth first search the graph to find all of the positive paths.
    while (frontier.length > 0) {
        // remove first element
        var current = frontier.shift()
        if (current["name"] == right) {
            paths[paths.length] = current["path"];
        }
        visited[current["name"]] = true;
        for (neighbor in newNeighbors) {
            frontier.push({"name":neighbor,
               // this copying of path is slow
                           "path": current["path"].slice().push(neighbor)});
        }
    }

    if (paths.length == 0) {
        return "none";
    }

    // Pick the best path.
    var bestPath = paths[0];
    var bestWeight = pathWeight(bestPath, maxWeight);
    for (var i = 1; i < paths.length; i++) {
        var currentWeight = pathWeight(paths[i], maxWeight);
        if (currentWeight > bestWeight ||
            (currentWeight == bestWeight &&
             path[1].length < bestPath.length)) {
            bestWeight = currentWeight;
            bestPath = paths[i];
        }
    }
}
