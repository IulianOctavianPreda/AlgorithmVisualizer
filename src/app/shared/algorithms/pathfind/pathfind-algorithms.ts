import { LanguageOption, LanguagesObject } from "../../enums/language-option";
import { IPathfindAlgorithm } from "../../types/pathfind/pathfind-algorithm";
import { bfs, bfsJs, bfsTs } from "./bfs";
import { dfs, dfsJs, dfsTs } from "./dfs";
import { dijkstra, dijkstraJs, dijkstraTs } from "./dijkstra";

export const PathfindAlgorithms: IPathfindAlgorithm[] = [
  {
    name: "Dijkstra",
    nativeFunction: dijkstra,
    availableLanguages: [
      LanguagesObject[LanguageOption.Javascript],
      LanguagesObject[LanguageOption.Typescript],
    ],
    [LanguagesObject[LanguageOption.Javascript]]: dijkstraJs(),
    [LanguagesObject[LanguageOption.Typescript]]: dijkstraTs(),
  },
  {
    name: "DFS",
    nativeFunction: dfs,
    availableLanguages: [
      LanguagesObject[LanguageOption.Javascript],
      LanguagesObject[LanguageOption.Typescript],
    ],
    [LanguagesObject[LanguageOption.Javascript]]: dfsJs(),
    [LanguagesObject[LanguageOption.Typescript]]: dfsTs(),
  },
  {
    name: "BFS",
    nativeFunction: bfs,
    availableLanguages: [
      LanguagesObject[LanguageOption.Javascript],
      LanguagesObject[LanguageOption.Typescript],
    ],
    [LanguagesObject[LanguageOption.Javascript]]: bfsJs(),
    [LanguagesObject[LanguageOption.Typescript]]: bfsTs(),
  },
];

// TODO for consistency and automation all algorithm types should respect the implementation of the other enums
