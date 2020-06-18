import { ChangeDetectorRef, Injectable } from "@angular/core";
import { PathfindNode } from "src/app/shared/types/pathfind/pathfind-node";

import { IPathfindOutput } from "./../../../../shared/types/pathfind/pathfind-output";
import { InlineWorker } from "./../../../../shared/worker/inline-worker";

@Injectable({
  providedIn: "root",
})
export class PathfindGridService {
  startingNode: PathfindNode;
  finishingNode: PathfindNode;
  gridCreatorWorker: InlineWorker;

  constructor() {
    this.gridCreatorWorker = this.instantiateGridCreatorWorker();
  }

  private instantiateGridCreatorWorker() {
    return new InlineWorker(() => {
      function createGrid({
        height,
        width,
        nodeSize,
      }: {
        height: number;
        width: number;
        nodeSize: number;
      }) {
        const rows = Math.floor(height / nodeSize);
        const cols = Math.floor(width / nodeSize);
        const grid = [];
        let startingNode = {};
        let finishingNode = {};
        for (let row = 0; row < rows; row++) {
          const colArray = [];
          for (let col = 0; col < cols; col++) {
            const node = createPathfindNode(row, col, rows, cols);
            colArray.push(node);
            if (node.isStartingNode) {
              startingNode = node;
            }
            if (node.isFinishingNode) {
              finishingNode = node;
            }
          }
          grid.push(colArray);
        }
        this.postMessage({
          grid,
          startingNode,
          finishingNode,
        });
      }

      function createPathfindNode(
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
        return node;
      }

      // @ts-ignore
      this.onmessage = (evt) => {
        createGrid(evt.data);
      };
    });
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

  animateGrid(grid: PathfindNode[][], data: IPathfindOutput) {
    for (const [index, node] of data?.data?.visitedNodes?.entries()) {
      setTimeout(() => {
        grid[node.row][node.col].isVisited = true;
      }, 10 * index);
    }
    setTimeout(() => {
      for (const [index, node] of data?.data?.shortestPath?.entries()) {
        setTimeout(() => {
          grid[node.row][node.col].isSolution = true;
        }, 10 * index);
      }
    }, 10 * data?.data?.visitedNodes?.length + 1);
  }
}
