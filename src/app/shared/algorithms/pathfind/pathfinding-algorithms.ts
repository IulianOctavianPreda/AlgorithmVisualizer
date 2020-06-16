import { LanguageKeys } from "../../enums/language";
import { PathfindInput } from "../../types/pathfind/pathfind-input";
import { PathfindOutput } from "../../types/pathfind/pathfind-output";

type PathfindScriptedAlgorithm = {
  [key in LanguageKeys]?: (input: PathfindInput) => PathfindOutput;
};

export interface PathfindAlgorithm extends PathfindScriptedAlgorithm {
  type: LanguageKeys | "nativeFunction";
  nativeFunction: Function;
}

export const PathfindingAlgorithms: PathfindAlgorithm[] = [];
