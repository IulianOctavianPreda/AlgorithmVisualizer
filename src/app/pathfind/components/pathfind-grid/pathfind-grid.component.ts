import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from "@angular/core";
import { faFlag, faMale } from "@fortawesome/free-solid-svg-icons";
import { ResultManagementService } from "src/app/shared/state-management/result-management.service";
import { StateManagementService } from "src/app/shared/state-management/state-management.service";
import { PathfindNode } from "src/app/shared/types/pathfind/pathfind-node";

import { IPathfindOutput } from "./../../../shared/types/pathfind/pathfind-output";
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
    public service: PathfindGridService,
    private changeDetection: ChangeDetectorRef,
    private stateManager: StateManagementService,
    private resultManager: ResultManagementService
  ) {}

  ngOnInit(): void {
    this.resultManager.codeResults$.subscribe((x: IPathfindOutput) => {
      if (x?.data) {
        this.service.softResetGrid(this.grid, this.changeDetection);
        console.log(x.data);
        this.service.animateGrid(this.grid, x);
      }
    });

    this.service.gridCreatorWorker.onMessage().subscribe((data) => {
      this.grid = data.data.grid;
      this.service.startingNode = data.data.startingNode;
      this.service.finishingNode = data.data.finishingNode;

      this.changeDetection.detectChanges();
      this.pushGridData();
    });
  }

  pushGridData() {
    this.stateManager.data$.next({
      data: {
        grid: this.grid,
        startingNode: this.service.startingNode,
        finishingNode: this.service.finishingNode,
      },
    });
  }

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
    this.service.gridCreatorWorker.postMessage({
      height: this.gridHeight,
      width: this.gridWidth,
      nodeSize: PATHFIND_NODE_SIZE_PX,
    });
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
}
