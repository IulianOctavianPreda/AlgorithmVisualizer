import { IOutputBase } from "../base/output-base";
import { PathfindNode } from "./pathfind-node";

export interface IPathfindOutput extends IOutputBase {
  data: {
    visitedNodes: PathfindNode[];
    shortestPath: PathfindNode[];
  };
}
