function findPaths(left, right, maxSize) {
    val visited = {};
    val paths = [];

    function newNeighbors(name) {
        val neighbors = getNeighbors(left);
        val result = []
        for (var neigbor in neighbors) {
            if (neighbor in visited) {
                result[result.length] = neighbor;
            }
        }
        return result;
    }

    val frontier = newNeighbors(left); // maybe make next a priority queue

    while (frontier.length > 0) {
        // remove first element
        val current = frontier.shift()
        if (current = right) {
	    current_path
	}
	visited[current] = true;
	next.append(newNeighbors)
    }
}
