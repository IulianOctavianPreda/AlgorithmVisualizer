import { IPathfindInput } from "../../types/pathfind/pathfind-input";
import { PathfindNode } from "../../types/pathfind/pathfind-node";
import { IPathfindOutput } from "../../types/pathfind/pathfind-output";

export function dijkstra({ data }: IPathfindInput): IPathfindOutput {
  const visitedNodes: PathfindNode[] = [];
  const startingNode =
    data.grid[data.startingNodeCoords.row][data.startingNodeCoords.col];
  const finishingNode =
    data.grid[data.finishingNodeCoords.row][data.finishingNodeCoords.col];

  startingNode.distance = 0;
  const unvisitedNodes = flattenNodeMatrix(data.grid);
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();

    if (closestNode.isWall) {
      continue;
    }

    if (isStuck(closestNode)) {
      return { data: { visitedNodes, shortestPath: [] } };
    }

    closestNode.isVisited = true;
    visitedNodes.push(closestNode);

    if (closestNode === finishingNode) {
      return {
        data: {
          visitedNodes,
          shortestPath: getShortestPath(finishingNode),
        },
      };
    }

    updateUnvisitedNeighbors(closestNode, data.grid);
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

export function dijkstraJs() {
  return `function main({ data }) {
    const visitedNodes = [];
    const startingNode = data.grid[data.startingNodeCoords.row][data.startingNodeCoords.col];
    const finishingNode = data.grid[data.finishingNodeCoords.row][data.finishingNodeCoords.col];

    startingNode.distance = 0;
    const unvisitedNodes = flattenNodeMatrix(data.grid);
    while (!!unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        if (closestNode.isWall) {
            continue;
        }
        if (isStuck(closestNode)) {
            return { data: { visitedNodes, shortestPath: [] } };
        }
        closestNode.isVisited = true;
        visitedNodes.push(closestNode);
        if (closestNode === finishingNode) {
            return {
                data: {
                    visitedNodes,
                    shortestPath: getShortestPath(finishingNode),
                },
            };
        }
        updateUnvisitedNeighbors(closestNode, data.grid);
    }
}
function flattenNodeMatrix(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}
function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}
function isStuck(node) {
    return node.distance === Infinity;
}
function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previouslyVisitedNode = node;
    }
}
function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
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

export function dijkstraTs() {
  return `function main({ data }: IPathfindInput): IPathfindOutput {
    const visitedNodes: PathfindNode[] = [];
    const startingNode = data.grid[data.startingNodeCoords.row][data.startingNodeCoords.col];
    const finishingNode = data.grid[data.finishingNodeCoords.row][data.finishingNodeCoords.col];

    startingNode.distance = 0;
    const unvisitedNodes = flattenNodeMatrix(data.grid);
    while (!!unvisitedNodes.length) {
      sortNodesByDistance(unvisitedNodes);
      const closestNode = unvisitedNodes.shift();
      if (closestNode.isWall) {
        continue;
      }
      if (isStuck(closestNode)) {
        return { data: { visitedNodes, shortestPath: [] } };
      }
      closestNode.isVisited = true;
      visitedNodes.push(closestNode);
      if (closestNode === finishingNode) {
        return {
          data: {
            visitedNodes,
            shortestPath: getShortestPath(finishingNode),
          },
        };
      }
      updateUnvisitedNeighbors(closestNode, data.grid);
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
  }
  `;
}

// TODO function for the algorithm that is completely isolated from the code editor. If the code didn't change
// it should use this function instead of the one written in. ALso to preserve the type of the function for the
// webworker and the 'imports' I had to enclose the function in another one
// since function.toString() doesn't grab the functions called inside of if
// the IAlgorithm has a type that is commented as well
// export function dijkstraWebWorker() {
//   function dijkstra({ data }: IPathfindInput): IPathfindOutput {
//     const visitedNodes: PathfindNode[] = [];
//     data.startingNode.distance = 0;
//     const unvisitedNodes = flattenNodeMatrix(data.grid);
//     while (!!unvisitedNodes.length) {
//       sortNodesByDistance(unvisitedNodes);
//       const closestNode = unvisitedNodes.shift();

//       if (closestNode.isWall) {
//         continue;
//       }

//       if (isStuck(closestNode)) {
//         return { data: { visitedNodes, shortestPath: null } };
//       }

//       closestNode.isVisited = true;
//       visitedNodes.push(closestNode);

//       if (closestNode === data.finishingNode) {
//         return {
//           data: {
//             visitedNodes,
//             shortestPath: getShortestPath(data.finishingNode),
//           },
//         };
//       }

//       updateUnvisitedNeighbors(closestNode, data.grid);
//     }
//   }

//   function flattenNodeMatrix(grid: PathfindNode[][]): PathfindNode[] {
//     const nodes: PathfindNode[] = [];
//     for (const row of grid) {
//       for (const node of row) {
//         nodes.push(node);
//       }
//     }
//     return nodes;
//   }

//   function sortNodesByDistance(unvisitedNodes: PathfindNode[]) {
//     unvisitedNodes.sort(
//       (nodeA: PathfindNode, nodeB: PathfindNode) =>
//         nodeA.distance - nodeB.distance
//     );
//   }

//   function isStuck(node: PathfindNode) {
//     return node.distance === Infinity;
//   }

//   function updateUnvisitedNeighbors(
//     node: PathfindNode,
//     grid: PathfindNode[][]
//   ) {
//     const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
//     for (const neighbor of unvisitedNeighbors) {
//       neighbor.distance = node.distance + 1;
//       neighbor.previouslyVisitedNode = node;
//     }
//   }

//   function getUnvisitedNeighbors(node: PathfindNode, grid: PathfindNode[][]) {
//     const neighbors: PathfindNode[] = [];
//     if (node.row > 0) {
//       neighbors.push(grid[node.row - 1][node.col]);
//     }
//     if (node.row < grid.length - 1) {
//       neighbors.push(grid[node.row + 1][node.col]);
//     }
//     if (node.col > 0) {
//       neighbors.push(grid[node.row][node.col - 1]);
//     }
//     if (node.col < grid[0].length - 1) {
//       neighbors.push(grid[node.row][node.col + 1]);
//     }
//     return neighbors.filter((neighbor) => !neighbor.isVisited);
//   }

//   function getShortestPath(finishingNode: PathfindNode) {
//     const shortestPath: PathfindNode[] = [];
//     let currentNode = finishingNode;
//     while (currentNode !== null) {
//       shortestPath.unshift(currentNode);
//       currentNode.isSolution = true;
//       currentNode = currentNode.previouslyVisitedNode;
//     }
//     return shortestPath;
//   }

//   function run(data: IPathfindInput) {
//     this.postMessage({ data: dijkstra(data) });
//   }
// }
