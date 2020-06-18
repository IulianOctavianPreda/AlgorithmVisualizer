import { IPathfindInput } from "../../types/pathfind/pathfind-input";
import { PathfindNode } from "../../types/pathfind/pathfind-node";
import { IPathfindOutput } from "../../types/pathfind/pathfind-output";

export function dfs({ data }: IPathfindInput): IPathfindOutput {
  const visitedNodes: PathfindNode[] = [];

  if (
    !data.startingNode ||
    !data.finishingNode ||
    data.startingNode === data.finishingNode
  ) {
    return { data: { visitedNodes, shortestPath: [] } };
  }

  const unvisitedNodes: PathfindNode[] = [data.startingNode];

  while (!!unvisitedNodes.length) {
    const currentNode = unvisitedNodes.pop();
    currentNode.isVisited = true;
    visitedNodes.push(currentNode);

    if (currentNode === data.finishingNode) {
      return {
        data: {
          visitedNodes,
          shortestPath: getShortestPath(data.finishingNode),
        },
      };
    }

    const currentNeighbors = getNeighbors(currentNode, data.grid);
    currentNeighbors.forEach((neighbor) => {
      neighbor.previouslyVisitedNode = currentNode;
      unvisitedNodes.push(neighbor);
    });
  }
  return { data: { visitedNodes, shortestPath: [] } };
}

function getNeighbors(node: PathfindNode, grid: PathfindNode[][]) {
  const neighbors: PathfindNode[] = [];
  if (
    grid[node.row - 1] &&
    grid[node.row - 1][node.col] &&
    !grid[node.row - 1][node.col].isWall
  ) {
    neighbors.unshift(grid[node.row - 1][node.col]);
  }

  if (grid[node.row][node.col + 1] && !grid[node.row][node.col + 1].isWall) {
    neighbors.unshift(grid[node.row][node.col + 1]);
  }

  if (
    grid[node.row + 1] &&
    grid[node.row + 1][node.col] &&
    !grid[node.row + 1][node.col].isWall
  ) {
    neighbors.unshift(grid[node.row + 1][node.col]);
  }

  if (grid[node.row][node.col - 1] && !grid[node.row][node.col - 1].isWall) {
    neighbors.unshift(grid[node.row][node.col - 1]);
  }
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

function getShortestPath(finishingNode: PathfindNode) {
  const shortestPath: PathfindNode[] = [];
  let currentNode = finishingNode;
  while (currentNode !== null) {
    shortestPath.unshift(currentNode);
    currentNode.isSolution = true;
    currentNode = currentNode.previouslyVisitedNode;
  }
  return shortestPath;
}

export function dfsJs() {
  return `function main({ data }) {
    const visitedNodes = [];
    if (!data.startingNode ||
        !data.finishingNode ||
        data.startingNode === data.finishingNode) {
        return { data: { visitedNodes, shortestPath: [] } };
    }
    const unvisitedNodes = [data.startingNode];
    while (!!unvisitedNodes.length) {
        const currentNode = unvisitedNodes.pop();
        currentNode.isVisited = true;
        visitedNodes.push(currentNode);
        if (currentNode === data.finishingNode) {
            return {
                data: {
                    visitedNodes,
                    shortestPath: getShortestPath(data.finishingNode),
                },
            };
        }
        const currentNeighbors = getNeighbors(currentNode, data.grid);
        currentNeighbors.forEach((neighbor) => {
            neighbor.previouslyVisitedNode = currentNode;
            unvisitedNodes.push(neighbor);
        });
    }
    return { data: { visitedNodes, shortestPath: [] } };
}
function getNeighbors(node, grid) {
    const neighbors = [];
    if (grid[node.row - 1] &&
        grid[node.row - 1][node.col] &&
        !grid[node.row - 1][node.col].isWall) {
        neighbors.unshift(grid[node.row - 1][node.col]);
    }
    if (grid[node.row][node.col + 1] && !grid[node.row][node.col + 1].isWall) {
        neighbors.unshift(grid[node.row][node.col + 1]);
    }
    if (grid[node.row + 1] &&
        grid[node.row + 1][node.col] &&
        !grid[node.row + 1][node.col].isWall) {
        neighbors.unshift(grid[node.row + 1][node.col]);
    }
    if (grid[node.row][node.col - 1] && !grid[node.row][node.col - 1].isWall) {
        neighbors.unshift(grid[node.row][node.col - 1]);
    }
    return neighbors.filter((neighbor) => !neighbor.isVisited);
}
function getShortestPath(finishingNode) {
    const shortestPath = [];
    let currentNode = finishingNode;
    while (currentNode !== null) {
        shortestPath.unshift(currentNode);
        currentNode.isSolution = true;
        currentNode = currentNode.previouslyVisitedNode;
    }
    return shortestPath;
}`;
}

export function dfsTs() {
  return `function main({ data }: IPathfindInput): IPathfindOutput {
    const visitedNodes: PathfindNode[] = [];

    if (
      !data.startingNode ||
      !data.finishingNode ||
      data.startingNode === data.finishingNode
    ) {
      return { data: { visitedNodes, shortestPath: [] } };
    }

    const unvisitedNodes: PathfindNode[] = [data.startingNode];

    while (!!unvisitedNodes.length) {
      const currentNode = unvisitedNodes.pop();
      currentNode.isVisited = true;
      visitedNodes.push(currentNode);

      if (currentNode === data.finishingNode) {
        return {
          data: {
            visitedNodes,
            shortestPath: getShortestPath(data.finishingNode),
          },
        };
      }

      const currentNeighbors = getNeighbors(currentNode, data.grid);
      currentNeighbors.forEach((neighbor) => {
        neighbor.previouslyVisitedNode = currentNode;
        unvisitedNodes.push(neighbor);
      });
    }
    return { data: { visitedNodes, shortestPath: [] } };
  }

  function getNeighbors(node: PathfindNode, grid: PathfindNode[][]) {
    const neighbors: PathfindNode[] = [];
    if (
      grid[node.row - 1] &&
      grid[node.row - 1][node.col] &&
      !grid[node.row - 1][node.col].isWall
    ) {
      neighbors.unshift(grid[node.row - 1][node.col]);
    }

    if (grid[node.row][node.col + 1] && !grid[node.row][node.col + 1].isWall) {
      neighbors.unshift(grid[node.row][node.col + 1]);
    }

    if (
      grid[node.row + 1] &&
      grid[node.row + 1][node.col] &&
      !grid[node.row + 1][node.col].isWall
    ) {
      neighbors.unshift(grid[node.row + 1][node.col]);
    }

    if (grid[node.row][node.col - 1] && !grid[node.row][node.col - 1].isWall) {
      neighbors.unshift(grid[node.row][node.col - 1]);
    }
    return neighbors.filter((neighbor) => !neighbor.isVisited);
  }

  function getShortestPath(finishingNode: PathfindNode) {
    const shortestPath: PathfindNode[] = [];
    let currentNode = finishingNode;
    while (currentNode !== null) {
      shortestPath.unshift(currentNode);
      currentNode.isSolution = true;
      currentNode = currentNode.previouslyVisitedNode;
    }
    return shortestPath;
  }

  interface IPathfindInput {
    data: {
      grid: PathfindNode[][];
      startingNode: PathfindNode;
      finishingNode: PathfindNode;
    };
  }

  interface IPathfindOutput {
    data: {
      visitedNodes: PathfindNode[];
      shortestPath: PathfindNode[];
    };
  }

  interface PathfindNode {
    id: number;
    col: number;
    row: number;
    distance: number;
    isWall: boolean;
    isSolution: boolean;
    isVisited: boolean;
    isStartingNode: boolean;
    isFinishingNode: boolean;
    previouslyVisitedNode: PathfindNode;
  }`;
}
