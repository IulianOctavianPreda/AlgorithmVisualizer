import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from "@angular/core";
import { faFlag, faMale } from "@fortawesome/free-solid-svg-icons";

import { PathfindUnit } from "./../../types/unit";
import { PATHFIND_UNIT_SIZE } from "./../constants/constants";

@Component({
  selector: "app-pathfind-grid",
  templateUrl: "./pathfind-grid.component.html",
  styleUrls: ["./pathfind-grid.component.scss"],
})
export class PathfindGridComponent implements OnInit, AfterViewInit {
  @ViewChild("gridRef") gridRef: ElementRef;

  gridHeight = 0;
  gridWidth = 0;
  grid: Array<Array<PathfindUnit>> = [];

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
    const rows = Math.floor(this.gridHeight / PATHFIND_UNIT_SIZE);
    const cols = Math.floor(this.gridWidth / PATHFIND_UNIT_SIZE);

    const grid = [];
    for (let row = 0; row < rows; row++) {
      const colArray = [];
      for (let col = 0; col < cols; col++) {
        colArray.push(this.createPathfindUnit(row, col, rows, cols));
      }
      grid.push(colArray);
    }
    return grid;
  }

  createPathfindUnit(row: number, col: number, rows: number, cols: number) {
    const initialRowPosition = Math.floor(rows / 2);
    const initialColStartingPosition = 3;
    const initialColFinishPosition = cols - 3;
    return {
      id: row * cols + col,
      isSelected: false,
      isSolution: false,
      isStartingPoint:
        row === initialRowPosition && col === initialColStartingPosition,
      isFinishPoint:
        row === initialRowPosition && col === initialColFinishPosition,
    };
  }

  // copyUsableValuesFromOldGrid(oldGrid: Array<Array<PathfindUnit>>) {
  //   for (let row = 0; row < this.grid.length; row++) {
  //     for (let col = 0; col < this.grid[row].length; col++) {
  //       if (!!oldGrid[row][col]) {
  //         this.copyPathfindUnitProperties(
  //           oldGrid[row][col],
  //           this.grid[row][col]
  //         );
  //       }
  //     }
  //   }
  // }

  copyPathfindUnitProperties(source: PathfindUnit, destination: PathfindUnit) {
    destination.isFinishPoint = source.isFinishPoint;
    destination.isSelected = source.isSelected;
    destination.isSolution = source.isSolution;
    destination.isStartingPoint = source.isSelected;
  }

  selectedUnit: PathfindUnit;

  onDrag(event: DragEvent, unit: PathfindUnit) {
    this.mouseDown = false;
    this.selectedUnit = unit;

    // event.dataTransfer.setData("draggedUnit", JSON.stringify(unit));
  }

  onDrop(event: DragEvent, unit: PathfindUnit) {
    event.preventDefault();
    // const data = JSON.parse(event.dataTransfer.getData("draggedUnit"));
    this.copyPathfindUnitProperties(this.selectedUnit, unit);
  }

  allowDrag(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  onMouseDown(data: PathfindUnit) {
    this.mouseDown = true;
    this.unitUpdate(data);
  }

  onMouseUp(data: PathfindUnit) {
    this.mouseDown = false;
  }

  onMouseOver(data: PathfindUnit) {
    if (this.mouseDown) {
      this.unitUpdate(data);
    }
  }

  onTap(data: PathfindUnit) {
    console.log("tap");
    this.unitUpdate(data);
  }

  onPan(data: PathfindUnit) {
    this.unitUpdate(data);
  }

  // isPressed = false;
  // onPress(data: PathfindUnit) {
  //   this.isPressed = true;
  //   this.selectedUnit = data;
  // }

  // onPressUp(data: PathfindUnit) {
  //   if (this.isPressed) {
  //     this.isPressed = false;
  //     this.copyPathfindUnitProperties(this.selectedUnit, data);
  //   }
  // }

  unitUpdate(data) {
    this.grid.forEach((arr) => {
      let a = arr.find((x) => x.id === data.id);
      console.log(a);
      if (!!a) {
        a.isSelected = !a.isSelected;
      }
    });
  }
}
