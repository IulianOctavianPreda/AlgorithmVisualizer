import { IPathfindInput } from "../../types/pathfind/pathfind-input";
import { PathfindNode } from "../../types/pathfind/pathfind-node";
import { IPathfindOutput } from "../../types/pathfind/pathfind-output";

export function bfs({ data }: IPathfindInput): IPathfindOutput {
  const visitedNodes: PathfindNode[] = [];
  const startingNode =
    data.grid[data.startingNodeCoords.row][data.startingNodeCoords.col];
  const finishingNode =
    data.grid[data.finishingNodeCoords.row][data.finishingNodeCoords.col];

  if (!startingNode || !finishingNode || startingNode === finishingNode) {
    return { data: { visitedNodes, shortestPath: [] } };
  }

  const unvisitedNodes: PathfindNode[] = [startingNode];

  while (!!unvisitedNodes.length) {
    const currentNode = unvisitedNodes.shift();
    currentNode.isVisited = true;
    visitedNodes.push(currentNode);

    if (currentNode === finishingNode) {
      return {
        data: {
          visitedNodes,
          shortestPath: getShortestPath(finishingNode),
        },
      };
    }

    const currentNeighbors = getNeighbors(currentNode, data.grid);
    currentNeighbors.forEach((neighbor) => {
      neighbor.isVisited = true;
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
    neighbors.push(grid[node.row - 1][node.col]);
  }

  if (grid[node.row][node.col + 1] && !grid[node.row][node.col + 1].isWall) {
    neighbors.push(grid[node.row][node.col + 1]);
  }

  if (
    grid[node.row + 1] &&
    grid[node.row + 1][node.col] &&
    !grid[node.row + 1][node.col].isWall
  ) {
    neighbors.push(grid[node.row + 1][node.col]);
  }

  if (grid[node.row][node.col - 1] && !grid[node.row][node.col - 1].isWall) {
    neighbors.push(grid[node.row][node.col - 1]);
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

export function bfsJs() {
  return `function main({ data }) {
    const visitedNodes = [];
    const startingNode = data.grid[data.startingNodeCoords.row][data.startingNodeCoords.col];
    const finishingNode = data.grid[data.finishingNodeCoords.row][data.finishingNodeCoords.col];

    if (!startingNode || !finishingNode || startingNode === finishingNode) {
      return { data: { visitedNodes, shortestPath: [] } };
    }
    const unvisitedNodes = [startingNode];
    while (!!unvisitedNodes.length) {
        const currentNode = unvisitedNodes.shift();
        currentNode.isVisited = true;
        visitedNodes.push(currentNode);
        if (currentNode === finishingNode) {
            return {
                data: {
                    visitedNodes,
                    shortestPath: getShortestPath(finishingNode),
                },
            };
        }
        const currentNeighbors = getNeighbors(currentNode, data.grid);
        currentNeighbors.forEach((neighbor) => {
            neighbor.isVisited = true;
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
        neighbors.push(grid[node.row - 1][node.col]);
    }
    if (grid[node.row][node.col + 1] && !grid[node.row][node.col + 1].isWall) {
        neighbors.push(grid[node.row][node.col + 1]);
    }
    if (grid[node.row + 1] &&
        grid[node.row + 1][node.col] &&
        !grid[node.row + 1][node.col].isWall) {
        neighbors.push(grid[node.row + 1][node.col]);
    }
    if (grid[node.row][node.col - 1] && !grid[node.row][node.col - 1].isWall) {
        neighbors.push(grid[node.row][node.col - 1]);
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
}
`;
}

export function bfsTs() {
  return `function main({ data }: IPathfindInput): IPathfindOutput {
    const visitedNodes: PathfindNode[] = [];
    const startingNode = data.grid[data.startingNodeCoords.row][data.startingNodeCoords.col];
    const finishingNode = data.grid[data.finishingNodeCoords.row][data.finishingNodeCoords.col];

    if (!startingNode || !finishingNode || startingNode === finishingNode) {
      return { data: { visitedNodes, shortestPath: [] } };
    }

    const unvisitedNodes: PathfindNode[] = [startingNode];

    while (!!unvisitedNodes.length) {
      const currentNode = unvisitedNodes.shift();
      currentNode.isVisited = true;
      visitedNodes.push(currentNode);

      if (currentNode === finishingNode) {
        return {
          data: {
            visitedNodes,
            shortestPath: getShortestPath(finishingNode),
          },
        };
      }

      const currentNeighbors = getNeighbors(currentNode, data.grid);
      currentNeighbors.forEach((neighbor) => {
        neighbor.isVisited = true;
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
      neighbors.push(grid[node.row - 1][node.col]);
    }

    if (grid[node.row][node.col + 1] && !grid[node.row][node.col + 1].isWall) {
      neighbors.push(grid[node.row][node.col + 1]);
    }

    if (
      grid[node.row + 1] &&
      grid[node.row + 1][node.col] &&
      !grid[node.row + 1][node.col].isWall
    ) {
      neighbors.push(grid[node.row + 1][node.col]);
    }

    if (grid[node.row][node.col - 1] && !grid[node.row][node.col - 1].isWall) {
      neighbors.push(grid[node.row][node.col - 1]);
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

  interface GridCoords {
    row: number;
    col: number;
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
