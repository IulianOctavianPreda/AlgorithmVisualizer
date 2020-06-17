import { ChangeDetectorRef, Injectable } from "@angular/core";
import { PathfindNode } from "src/app/shared/types/pathfind/pathfind-node";

@Injectable({
  providedIn: "root",
})
export class PathfindGridService {
  startingNode: PathfindNode;
  finishingNode: PathfindNode;

  constructor() {}

  public createGrid(
    height: number,
    width: number,
    nodeSize: number
  ): PathfindNode[][] {
    const rows = Math.floor(height / nodeSize);
    const cols = Math.floor(width / nodeSize);

    const grid = [];
    for (let row = 0; row < rows; row++) {
      const colArray = [];
      for (let col = 0; col < cols; col++) {
        colArray.push(this.createPathfindNode(row, col, rows, cols));
      }
      grid.push(colArray);
    }
    return grid;
  }

  private createPathfindNode(
    row: number,
    col: number,
    rows: number,
    cols: number
  ): PathfindNode {
    let node: PathfindNode = null;
    let isStartingNode = false;
    let isFinishingNode = false;
    if (cols > rows) {
      const initialRowPosition = Math.floor(rows / 2);
      const initialColStartingPosition = 2;
      const initialColFinishPosition = cols - 2;
      isStartingNode =
        row === initialRowPosition && col === initialColStartingPosition;
      isFinishingNode =
        row === initialRowPosition && col === initialColFinishPosition;
      node = {
        id: row * cols + col,
        col,
        row,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        isSolution: false,
        isStartingNode,
        isFinishingNode,
        previouslyVisitedNode: null,
      };
    } else {
      const initialColPosition = Math.floor(cols / 2);
      const initialRowStartingPosition = 2;
      const initialRowFinishPosition = rows - 2;
      isStartingNode =
        row === initialRowStartingPosition && col === initialColPosition;
      isFinishingNode =
        row === initialRowFinishPosition && col === initialColPosition;

      node = {
        id: row * cols + col,
        col,
        row,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        isSolution: false,
        isStartingNode,
        isFinishingNode,
        previouslyVisitedNode: null,
      };
    }
    if (isStartingNode) {
      this.startingNode = node;
    }
    if (isFinishingNode) {
      this.finishingNode = node;
    }
    return node;
  }

  softResetGrid(
    grid: PathfindNode[][],
    changeDetection: ChangeDetectorRef
  ): void {
    grid.forEach((row: PathfindNode[]) => {
      row.forEach((node) => {
        node.distance = Infinity;
        node.isVisited = false;
        // node.isWall = false;
        node.isSolution = false;
        node.previouslyVisitedNode = null;
      });
    });
    changeDetection.detectChanges();
  }
}
