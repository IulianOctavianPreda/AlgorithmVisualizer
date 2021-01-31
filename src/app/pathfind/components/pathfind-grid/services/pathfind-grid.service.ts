import { ChangeDetectorRef, Injectable } from '@angular/core';
import { PathfindNode } from 'src/app/shared/types/pathfind/pathfind-node';

import { IPathfindOutput } from './../../../../shared/types/pathfind/pathfind-output';
import { InlineWorker } from './../../../../shared/worker/inline-worker';
import { instantiateGridCreatorWorker } from './pathfind-grid-inline-worker';

@Injectable({
  providedIn: "root",
})
export class PathfindGridService {
  startingNode: PathfindNode;
  finishingNode: PathfindNode;
  gridCreatorWorker: InlineWorker;

  constructor() {
    this.gridCreatorWorker = instantiateGridCreatorWorker();
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
      }, 40 * index);
    }
    setTimeout(() => {
      for (const [index, node] of data?.data?.shortestPath?.entries()) {
        setTimeout(() => {
          grid[node.row][node.col].isSolution = true;
        }, 40 * index);
      }
    }, 40 * data?.data?.visitedNodes?.length + 1);
  }
}
