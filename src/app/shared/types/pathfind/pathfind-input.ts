import { IInputBase } from "../base/input-base";
import { PathfindNode } from "./pathfind-node";

export interface IPathfindInput extends IInputBase {
  data: {
    grid: PathfindNode[][];
    startingNode: PathfindNode;
    finishingNode: PathfindNode;
  };
}
