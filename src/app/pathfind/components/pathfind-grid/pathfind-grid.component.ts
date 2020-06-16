import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from "@angular/core";
import { faFlag, faMale } from "@fortawesome/free-solid-svg-icons";

import { PathfindNode } from "./../../types/pathfind-node";
import { PATHFIND_NODE_SIZE } from "./../constants/constants";

@Component({
  selector: "app-pathfind-grid",
  templateUrl: "./pathfind-grid.component.html",
  styleUrls: ["./pathfind-grid.component.scss"],
})
export class PathfindGridComponent implements OnInit, AfterViewInit {
  @ViewChild("gridRef") gridRef: ElementRef;

  gridHeight = 0;
  gridWidth = 0;
  grid: PathfindNode[][] = [];

  flagIcon = faFlag;
  actorIcon = faMale;
  mouseDown = false;
  selectedNode: PathfindNode;

  constructor(private changeDetection: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.resetGrid();
  }

  @HostListener("window:resize", ["$event.target"])
  onResize() {
    // const oldGrid = [...this.grid];
    this.resetGrid();
    // this.copyUsableValuesFromOldGrid(oldGrid);
  }

  resetGrid(): void {
    this.gridHeight = this.gridRef?.nativeElement?.offsetHeight ?? 0;
    this.gridWidth = this.gridRef?.nativeElement?.offsetWidth ?? 0;
    this.grid = this.createGrid();
    this.changeDetection.detectChanges();
  }

  softResetGrid(): void {
    this.grid.forEach((row: PathfindNode[]) => {
      row.forEach((node) => {
        node.distance = Infinity;
        node.isVisited = false;
        node.isWall = false;
        node.isSolution = false;
        node.previouslyVisitedNode = null;
      });
    });
    this.changeDetection.detectChanges();
  }

  createGrid(): PathfindNode[][] {
    const rows = Math.floor(this.gridHeight / PATHFIND_NODE_SIZE);
    const cols = Math.floor(this.gridWidth / PATHFIND_NODE_SIZE);

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

  createPathfindNode(
    row: number,
    col: number,
    rows: number,
    cols: number
  ): PathfindNode {
    if (cols > rows) {
      const initialRowPosition = Math.floor(rows / 2);
      const initialColStartingPosition = 2;
      const initialColFinishPosition = cols - 2;
      return {
        id: row * cols + col,
        col,
        row,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        isSolution: false,
        isStartingNode:
          row === initialRowPosition && col === initialColStartingPosition,
        isFinishingNode:
          row === initialRowPosition && col === initialColFinishPosition,
        previouslyVisitedNode: null,
      };
    } else {
      const initialColPosition = Math.floor(cols / 2);
      const initialRowStartingPosition = 2;
      const initialRowFinishPosition = rows - 2;
      return {
        id: row * cols + col,
        col,
        row,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        isSolution: false,
        isStartingNode:
          row === initialRowStartingPosition && col === initialColPosition,
        isFinishingNode:
          row === initialRowFinishPosition && col === initialColPosition,
        previouslyVisitedNode: null,
      };
    }
  }

  // copyUsableValuesFromOldGrid(oldGrid: PathfindNode[][]): void {
  //   let hasStartingPoint = false;
  //   let hasFinishPoint = false;
  //   for (let row = 0; row < this.grid.length; row++) {
  //     for (let col = 0; col < this.grid[row].length; col++) {
  //       if (!!oldGrid[row][col]) {
  //         if(oldGrid[row][col].isFinishPoint){
  //           hasFinishPoint = true
  //         }
  //         if(oldGrid[row][col].isStartingPoint){
  //           hasStartingPoint = true
  //         }
  //         this.copyPathfindNodeProperties(
  //           oldGrid[row][col],
  //           this.grid[row][col]
  //         );
  //       }
  //     }
  //   }
  //   if(!hasFinishPoint){

  //   }
  // }

  // copyPathfindNodeProperties(source: PathfindNode, destination: PathfindNode) {
  //   destination.isWall = source.isWall;
  //   destination.isSolution = source.isSolution;
  //   destination.isFinishPoint = source.isFinishPoint;
  //   destination.isStartingPoint = source.isStartingPoint;
  //   destination.distance = source.distance;
  //   destination.isVisited = source.isVisited;
  //   destination.previouslyVisitedNode = source.previouslyVisitedNode;
  // }

  onDrag(node: PathfindNode) {
    this.mouseDown = false;
    this.selectedNode = node;
  }

  onDrop(event: DragEvent, node: PathfindNode) {
    event.preventDefault();
    node.isFinishingNode = this.selectedNode.isFinishingNode;
    node.isStartingNode = this.selectedNode.isStartingNode;
    this.selectedNode = null;
  }

  allowDrag(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
  }

  onMouseDown(node: PathfindNode) {
    this.mouseDown = true;
    this.nodeUpdate(node);
  }

  onMouseUp() {
    this.mouseDown = false;
  }

  onMouseOver(node: PathfindNode) {
    if (this.mouseDown) {
      this.nodeUpdate(node);
    }
  }

  onTap(node: PathfindNode) {
    this.nodeUpdate(node);
  }

  onClick(node: PathfindNode) {
    this.nodeUpdate(node);
  }

  nodeUpdate(node: PathfindNode) {
    this.grid.forEach((arr) => {
      const foundNode = arr.find((x) => x.id === node.id);
      if (!!foundNode) {
        foundNode.isWall = !foundNode.isWall;
      }
    });
  }
}
