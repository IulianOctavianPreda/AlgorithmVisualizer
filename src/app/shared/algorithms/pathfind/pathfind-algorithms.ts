import { LanguageOption, LanguagesObject } from "../../enums/language-option";
import { IPathfindAlgorithm } from "../../types/pathfind/pathfind-algorithm";
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
];

// TODO for consistency and automation all algorithm types should respect the implementation of the other enums
