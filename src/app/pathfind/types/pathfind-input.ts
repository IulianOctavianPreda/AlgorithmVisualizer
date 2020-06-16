import { PathfindNode } from "./pathfind-node";

export interface PathfindInput {
  grid: PathfindNode[][];
  startingNode: PathfindNode;
  finishingNode: PathfindNode;
}
