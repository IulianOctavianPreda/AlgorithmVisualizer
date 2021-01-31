import { PathfindNode } from 'src/app/shared/types/pathfind/pathfind-node';
import { InlineWorker } from 'src/app/shared/worker/inline-worker';

export function instantiateGridCreatorWorker() {
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

    function createNode(
      col: number,
      row: number,
      cols: number,
      isStartingNode: boolean,
      isFinishingNode: boolean
    ) {
      return {
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

    function createPathFindNodeForMoreRows(
      row: number,
      col: number,
      cols: number,
      rows: number
    ) {
      const initialColPosition = Math.floor(cols / 2);
      const initialRowStartingPosition = 2;
      const initialRowFinishPosition = rows - 2;
      let isStartingNode =
        row === initialRowStartingPosition && col === initialColPosition;
      let isFinishingNode =
        row === initialRowFinishPosition && col === initialColPosition;
      return createNode(col, row, cols, isStartingNode, isFinishingNode);
    }

    function createPathFindNodeForMoreColumns(
      row: number,
      col: number,
      rows: number,
      cols: number
    ) {
      const initialRowPosition = Math.floor(rows / 2);
      const initialColStartingPosition = 2;
      const initialColFinishPosition = cols - 2;
      let isStartingNode =
        row === initialRowPosition && col === initialColStartingPosition;
      let isFinishingNode =
        row === initialRowPosition && col === initialColFinishPosition;

      return createNode(col, row, cols, isStartingNode, isFinishingNode);
    }

    function createPathfindNode(
      row: number,
      col: number,
      rows: number,
      cols: number
    ): PathfindNode {
      if (cols > rows) {
        return createPathFindNodeForMoreColumns(row, col, rows, cols);
      } else {
        return createPathFindNodeForMoreRows(row, col, rows, cols);
      }
    }

    // @ts-ignore
    this.onmessage = (evt) => {
      createGrid(evt.data);
    };
  });
}
