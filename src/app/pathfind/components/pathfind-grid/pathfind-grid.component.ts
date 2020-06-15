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
  grid: Array<Array<PathfindNode>> = [];

  flagIcon = faFlag;
  actorIcon = faMale;
  mouseDown = false;

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

  resetGrid() {
    this.gridHeight = this.gridRef?.nativeElement?.offsetHeight ?? 0;
    this.gridWidth = this.gridRef?.nativeElement?.offsetWidth ?? 0;
    this.grid = this.createGrid();
    this.changeDetection.detectChanges();
  }

  createGrid() {
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

  createPathfindNode(row: number, col: number, rows: number, cols: number) {
    if (cols > rows) {
      const initialRowPosition = Math.floor(rows / 2);
      const initialColStartingPosition = 2;
      const initialColFinishPosition = cols - 2;
      return {
        id: row * cols + col,
        isSelected: false,
        isSolution: false,
        isStartingPoint:
          row === initialRowPosition && col === initialColStartingPosition,
        isFinishPoint:
          row === initialRowPosition && col === initialColFinishPosition,
      };
    } else {
      const initialColPosition = Math.floor(cols / 2);
      const initialRowStartingPosition = 2;
      const initialRowFinishPosition = rows - 2;
      return {
        id: row * cols + col,
        isSelected: false,
        isSolution: false,
        isStartingPoint:
          row === initialRowStartingPosition && col === initialColPosition,
        isFinishPoint:
          row === initialRowFinishPosition && col === initialColPosition,
      };
    }
  }

  // copyUsableValuesFromOldGrid(oldGrid: Array<Array<PathfindNode>>) {
  //   for (let row = 0; row < this.grid.length; row++) {
  //     for (let col = 0; col < this.grid[row].length; col++) {
  //       if (!!oldGrid[row][col]) {
  //         this.copyPathfindNodeProperties(
  //           oldGrid[row][col],
  //           this.grid[row][col]
  //         );
  //       }
  //     }
  //   }
  // }

  copyPathfindNodeProperties(source: PathfindNode, destination: PathfindNode) {
    destination.isFinishPoint = source.isFinishPoint;
    destination.isSelected = source.isSelected;
    destination.isSolution = source.isSolution;
    destination.isStartingPoint = source.isSelected;
  }

  selectedNode: PathfindNode;

  onDrag(event: DragEvent, node: PathfindNode) {
    this.mouseDown = false;
    this.selectedNode = node;

    // event.dataTransfer.setData("draggedNode", JSON.stringify(node));
  }

  onDrop(event: DragEvent, node: PathfindNode) {
    event.preventDefault();
    // const data = JSON.parse(event.dataTransfer.getData("draggedNode"));
    this.copyPathfindNodeProperties(this.selectedNode, node);
  }

  allowDrag(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  onMouseDown(data: PathfindNode) {
    this.mouseDown = true;
    this.nodeUpdate(data);
  }

  onMouseUp(data: PathfindNode) {
    this.mouseDown = false;
  }

  onMouseOver(data: PathfindNode) {
    if (this.mouseDown) {
      this.nodeUpdate(data);
    }
  }

  onTap(data: PathfindNode) {
    console.log("tap");
    this.nodeUpdate(data);
  }

  onPan(data: PathfindNode) {
    this.nodeUpdate(data);
  }

  // isPressed = false;
  // onPress(data: PathfindNode) {
  //   this.isPressed = true;
  //   this.selectedNode = data;
  // }

  // onPressUp(data: PathfindNode) {
  //   if (this.isPressed) {
  //     this.isPressed = false;
  //     this.copyPathfindNodeProperties(this.selectedNode, data);
  //   }
  // }

  nodeUpdate(data) {
    this.grid.forEach((arr) => {
      let node = arr.find((x) => x.id === data.id);
      if (!!node) {
        node.isSelected = !node.isSelected;
      }
    });
  }
}
