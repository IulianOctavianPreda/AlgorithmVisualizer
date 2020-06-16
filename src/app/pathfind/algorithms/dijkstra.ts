import { PathfindNode } from "src/app/pathfind/types/pathfind-node";

import { PathfindOutput } from "./../types/pathfind-output";

export function dijkstra(
  grid: PathfindNode[][],
  startNode: PathfindNode,
  finishNode: PathfindNode
): PathfindOutput {
  const visitedNodes: PathfindNode[] = [];
  startNode.distance = 0;
  const unvisitedNodes = flattenNodeMatrix(grid);
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();

    if (closestNode.isWall) {
      continue;
    }

    if (isStuck(closestNode)) {
      return { visitedNodes, shortestPath: null };
    }

    closestNode.isVisited = true;
    visitedNodes.push(closestNode);

    if (closestNode === finishNode) {
      return {
        visitedNodes,
        shortestPath: getShortestPath(finishNode),
      };
    }

    updateUnvisitedNeighbors(closestNode, grid);
  }
}

function flattenNodeMatrix(grid: PathfindNode[][]): PathfindNode[] {
  const nodes: PathfindNode[] = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

function sortNodesByDistance(unvisitedNodes: PathfindNode[]) {
  unvisitedNodes.sort(
    (nodeA: PathfindNode, nodeB: PathfindNode) =>
      nodeA.distance - nodeB.distance
  );
}

function isStuck(node: PathfindNode) {
  return node.distance === Infinity;
}

function updateUnvisitedNeighbors(node: PathfindNode, grid: PathfindNode[][]) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previouslyVisitedNode = node;
  }
}

function getUnvisitedNeighbors(node: PathfindNode, grid: PathfindNode[][]) {
  const neighbors: PathfindNode[] = [];
  if (node.row > 0) {
    neighbors.push(grid[node.row - 1][node.col]);
  }
  if (node.row < grid.length - 1) {
    neighbors.push(grid[node.row + 1][node.col]);
  }
  if (node.col > 0) {
    neighbors.push(grid[node.row][node.col - 1]);
  }
  if (node.col < grid[0].length - 1) {
    neighbors.push(grid[node.row][node.col + 1]);
  }
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

function getShortestPath(finishNode: PathfindNode) {
  const shortestPath: PathfindNode[] = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    shortestPath.unshift(currentNode);
    currentNode.isSolution = true;
    currentNode = currentNode.previouslyVisitedNode;
  }
  return shortestPath;
}

// toString() {
//   return super.serializeToFunctions();
// }
