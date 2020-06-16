import { PathfindNode } from "./pathfind-node";

export interface PathfindOutput {
  visitedNodes: PathfindNode[];
  shortestPath: PathfindNode[];
}
