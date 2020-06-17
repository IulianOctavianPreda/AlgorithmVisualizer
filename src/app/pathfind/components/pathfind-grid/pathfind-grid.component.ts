import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from "@angular/core";
import { faFlag, faMale } from "@fortawesome/free-solid-svg-icons";
import { PathfindAlgorithms } from "src/app/shared/algorithms/pathfind/pathfind-algorithms";
import { PathfindNode } from "src/app/shared/types/pathfind/pathfind-node";

import { PATHFIND_NODE_SIZE_PX } from "./../constants/constants";
import { PathfindGridService } from "./services/pathfind-grid.service";

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

  selectedNode: PathfindNode;

  mouseDown = false;

  flagIcon = faFlag;
  actorIcon = faMale;

  constructor(
    private service: PathfindGridService,
    private changeDetection: ChangeDetectorRef
  ) {}

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
    this.grid = this.service.createGrid(
      this.gridHeight,
      this.gridWidth,
      PATHFIND_NODE_SIZE_PX
    );
    this.stateManager.data$.next({
      data: {
        grid: this.grid,
        startingNode: this.service.startingNode,
        finishingNode: this.service.finishingNode,
      },
    });
    this.changeDetection.detectChanges();
  }

  // copyUsableValuesFromOldGrid(oldGrid: PathfindNode[][]): void {
  //   for (let row = 0; row < this.grid.length; row++) {
  //     for (let col = 0; col < this.grid[row].length; col++) {
  //       if (!!oldGrid[row] && !!oldGrid[row][col]) {
  //         this.copyPathfindNodeProperties(
  //           oldGrid[row][col],
  //           this.grid[row][col]
  //         );
  //         if (oldGrid[row][col].isStartingNode) {
  //           this.service.startingNode.isStartingNode = false;
  //           this.service.startingNode = this.grid[row][col];
  //         }
  //         if (oldGrid[row][col].isFinishingNode) {
  //           this.service.finishingNode.isFinishingNode = false;
  //           this.service.finishingNode = this.grid[row][col];
  //         }
  //       }
  //     }
  //   }
  // }

  // copyPathfindNodeProperties(source: PathfindNode, destination: PathfindNode) {
  //   destination.isWall = source.isWall;
  //   destination.isSolution = source.isSolution;
  //   destination.isFinishingNode = source.isFinishingNode;
  //   destination.isStartingNode = source.isStartingNode;
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
    if (this.selectedNode.isStartingNode) {
      node.isStartingNode = this.selectedNode.isStartingNode;
      this.selectedNode.isStartingNode = false;
      this.service.startingNode = node;
    }

    if (this.selectedNode.isFinishingNode) {
      node.isFinishingNode = this.selectedNode.isFinishingNode;
      this.selectedNode.isFinishingNode = false;
      this.service.finishingNode = node;
    }

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
        foundNode.distance = Infinity;
        foundNode.isVisited = false;
        foundNode.isSolution = false;
      }
    });
  }

  runDis() {
    this.service.softResetGrid(this.grid, this.changeDetection);
    const output = PathfindAlgorithms[0].nativeFunction({
      data: {
        grid: this.grid,
        startingNode: this.service.startingNode,
        finishingNode: this.service.finishingNode,
      },
    });
    console.log(output);
  }
}
