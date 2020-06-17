import { IAlgorithmBase } from "../base/algorithm-base";
import { IPathfindInput } from "./pathfind-input";
import { IPathfindOutput } from "./pathfind-output";

export interface IPathfindAlgorithm extends IAlgorithmBase {
  nativeFunction: ({ data }: IPathfindInput) => IPathfindOutput;
}
