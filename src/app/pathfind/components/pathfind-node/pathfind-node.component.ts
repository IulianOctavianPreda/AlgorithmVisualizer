import { animate, keyframes, state, style, transition, trigger } from "@angular/animations";
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { PathfindNode } from "src/app/shared/types/pathfind/pathfind-node";

import { PATHFIND_NODE_SIZE_PX } from "../constants/constants";
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
          backgroundImage: "none",
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
          backgroundColor: "#00ff00",
          backgroundImage: "none",
        })
      ),
      state(
        `${AnimationStates.Visited}`,
        style({
          backgroundColor: "cyan",
          backgroundImage: "none",
        })
      ),
      transition(`* => ${AnimationStates.Wall}`, [animate("0.3s")]),
      transition(`* => ${AnimationStates.Empty}`, [animate("0.3s")]),
      transition(`* => ${AnimationStates.Solution}`, [animate("0.3s")]),
      transition(`* => ${AnimationStates.Visited}`, [
        animate(
          "0.3s ease-out",
          keyframes([
            style({
              backgroundImage: "none",
              backgroundColor: "red",
            }),
          ])
        ),
      ]),
    ]),
  ],
})
// 009aff
export class PathfindNodeComponent implements OnInit, OnChanges {
  @Input() node: PathfindNode;
  @Input() isMesh: boolean = false;

  @Output() nodeUpdate = new EventEmitter<PathfindNode>();

  nodeSize = PATHFIND_NODE_SIZE_PX;

  animationTrigger() {
    if (this.node.isSolution) {
      return AnimationStates.Solution;
    }
    if (this.node.isVisited) {
      return AnimationStates.Visited;
    }
    if (
      this.node.isWall &&
      !this.node.isFinishingNode &&
      !this.node.isStartingNode
    ) {
      return AnimationStates.Wall;
    }
    return AnimationStates.Empty;
  }

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.node.currentValue) {
      this.animationTrigger();
    }
  }
}
