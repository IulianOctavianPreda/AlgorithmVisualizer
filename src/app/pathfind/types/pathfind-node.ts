export interface PathfindNode {
  id: number;
  col: number;
  row: number;
  distance: number;
  isWall: boolean;
  isSolution: boolean;
  isVisited: boolean;
  isStartingNode: boolean;
  isFinishingNode: boolean;
  previouslyVisitedNode: PathfindNode;
}
