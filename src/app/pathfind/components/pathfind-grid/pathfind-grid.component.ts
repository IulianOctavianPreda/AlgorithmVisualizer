import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from "@angular/core";
import { faFlag, faMale } from "@fortawesome/free-solid-svg-icons";
import { ResultManagementService } from "src/app/shared/state-management/result-management.service";
import { StateManagementService } from "src/app/shared/state-management/state-management.service";
import { PathfindNode } from "src/app/shared/types/pathfind/pathfind-node";

import { IPathfindInput } from "./../../../shared/types/pathfind/pathfind-input";
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

  isMesh: boolean;
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
        this.service.animateGrid(this.grid, x);
      }
    });

    this.stateManager.meshView$.subscribe((x) => (this.isMesh = x));

    this.service.gridCreatorWorker.onMessage().subscribe((data) => {
      this.grid = data.data.grid;
      this.service.startingNode = data.data.startingNode;
      this.service.finishingNode = data.data.finishingNode;

      this.changeDetection.detectChanges();
      this.pushGridData();
    });
  }

  ngAfterViewInit(): void {
    this.resetGrid();
  }

  pushGridData() {
    const data: IPathfindInput = {
      data: {
        grid: this.grid,
        startingNodeCoords: {
          row: this.service.startingNode.row,
          col: this.service.startingNode.col,
        },
        finishingNodeCoords: {
          row: this.service.finishingNode.row,
          col: this.service.finishingNode.col,
        },
      },
    };

    this.stateManager.data$.next(data);
  }

  @HostListener("window:resize", ["$event.target"])
  onResize() {
    this.resetGrid();
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

  onDrag(node: PathfindNode) {
    this.mouseDown = false;
    this.selectedNode = node;
  }

  onDrop(event: DragEvent, node: PathfindNode) {
    event.preventDefault();
    if (
      (this.selectedNode.isStartingNode && !node.isFinishingNode) ||
      (this.selectedNode.isFinishingNode && !node.isStartingNode)
    ) {
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
      this.pushGridData();
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
