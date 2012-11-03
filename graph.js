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

function getNet(graph, name) {
    if (graph[name] == undefined) {
        return 0;
    } else {
        return graph[name]["net"];
    }
}

function getNetBetween(graph, from, to) {
    if (graph[from] == undefined || graph[from]["neighbors"][to] == undefined) {
        return 0;
    } else {
        return graph[from]["neighbors"][to]["net"];
    }
}

function getNeighbors(graph, name) {
    if (graph[name] == undefined) {
        return {};
    } else {
        return graph[name]["neighbors"];
    }
}

function getTransactions(graph, from, to) {
    if (graph[from] == undefined || graph[from]["neighbors"][to] == undefined) {
        return [];
    } else {
        return graph[from]["neighbors"][to]["transactions"];
    }
}

function findPaths(graph, left, right, maxSize) {
    var visited = {};
    var paths = [];

    var frontier = newNeighbors(left); // maybe make next a priority queue

    function newNeighbors(name) {
        var neighbors = getNeighbors(name);
        var result = []
        for (var neigbor in neighbors) {
            if (neighbor in visited) {
                result[result.length] = neighbor;
            }
        }
        return result;
    }
    
    while (frontier.length > 0) {
        // remove first element
        var current = frontier.shift()
        if (current = right) {
	    current_path
    }
	visited[current] = true;
	next.append(newNeighbors)
    }
}
