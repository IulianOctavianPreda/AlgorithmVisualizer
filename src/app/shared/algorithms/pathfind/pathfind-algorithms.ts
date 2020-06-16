import { Language } from "../../enums/language";
import { PathfindInput } from "../../types/pathfind/pathfind-input";
import { PathfindOutput } from "../../types/pathfind/pathfind-output";
import { IAlgorithm } from "../algorithms";
import { dijkstra, dijkstraJs, dijkstraTs } from "./dijkstra";

export interface PathfindAlgorithm extends IAlgorithm {
  nativeFunction: (obj: PathfindInput) => PathfindOutput;
}

export const PathfindAlgorithms: PathfindAlgorithm[] = [
  {
    name: "Dijkstra",
    nativeFunction: dijkstra,
    [Language.Javascript]: dijkstraJs,
    [Language.Typescript]: dijkstraTs,
  },
];
