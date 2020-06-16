import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";

import { PATHFIND_NODE_SIZE } from "../constants/constants";
import { PathfindNode } from "./../../types/pathfind-node";
import { AnimationStates } from "./animation-states";

@Component({
  selector: "app-pathfind-node",
  templateUrl: "./pathfind-node.component.html",
  styleUrls: ["./pathfind-node.component.scss"],
  animations: [
    trigger("animationTrigger", [
      state(
        `${AnimationStates.Wall}`,
        style({
          backgroundColor: "black",
        })
      ),
      state(
        `${AnimationStates.Empty}`,
        style({
          backgroundColor: "transparent",
        })
      ),
      state(
        `${AnimationStates.Solution}`,
        style({
          backgroundColor: "green",
        })
      ),
      state(
        `${AnimationStates.Visited}`,
        style({
          backgroundColor: "cyan",
        })
      ),
      transition(`* => *`, [animate("1s")]),
    ]),
  ],
})
export class PathfindNodeComponent implements OnInit, OnChanges {
  @Input() node: PathfindNode;

  @Output() nodeUpdate = new EventEmitter<PathfindNode>();

  nodeSize = PATHFIND_NODE_SIZE;

  animationTrigger() {
    if (!this.node.isFinishingNode && !this.node.isStartingNode) {
      if (this.node.isSolution) {
        return AnimationStates.Solution;
      }
      if (this.node.isVisited) {
        return AnimationStates.Visited;
      }
      if (this.node.isWall) {
        return AnimationStates.Wall;
      }
      return AnimationStates.Empty;
    }
  }

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.node.currentValue) {
      this.animationTrigger();
    }
  }
}
