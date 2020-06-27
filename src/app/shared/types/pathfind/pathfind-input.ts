import { IInputBase } from "../base/input-base";
import { GridCoords } from "./../base/grid-coords";
import { PathfindNode } from "./pathfind-node";

export interface IPathfindInput extends IInputBase {
  data: {
    grid: PathfindNode[][];
    startingNodeCoords: GridCoords;
    finishingNodeCoords: GridCoords;
  };
}
