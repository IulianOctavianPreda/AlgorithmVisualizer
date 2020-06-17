import { LanguageOption } from "../../enums/language-option";
import { IPathfindAlgorithm } from "../../types/pathfind/pathfind-algorithm";
import { dijkstra, dijkstraJs, dijkstraTs } from "./dijkstra";

export const PathfindAlgorithms: IPathfindAlgorithm[] = [
  {
    name: "Dijkstra",
    nativeFunction: dijkstra,
    [LanguageOption[LanguageOption.Javascript]]: dijkstraJs,
    [LanguageOption[LanguageOption.Typescript]]: dijkstraTs,
  },
];

// TODO for consistency and automation all algorithm types should respect the implementation of the other enums
