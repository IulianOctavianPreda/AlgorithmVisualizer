import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";

import { PATHFIND_NODE_SIZE } from "../constants/constants";
import { PathfindNode } from "./../../types/pathfind-node";

@Component({
  selector: "app-pathfind-node",
  templateUrl: "./pathfind-node.component.html",
  styleUrls: ["./pathfind-node.component.scss"],
  animations: [
    trigger("animationTrigger", [
      state(
        "true",
        style({
          backgroundColor: "black",
        })
      ),
      state(
        "false",
        style({
          backgroundColor: "transparent",
        })
      ),
      state(
        "isSolution",
        style({
          backgroundColor: "green",
        })
      ),
      transition("true => false", [animate("1s")]),
      transition("false => true", [animate("1s")]),
      transition("true => isSolution", [animate("1s")]),
      transition("false => isSolution", [animate("1s")]),
    ]),
  ],
})
export class PathfindNodeComponent implements OnInit, OnChanges {
  @Input() node: PathfindNode;

  @Output() nodeUpdate = new EventEmitter<PathfindNode>();

  nodeSize = PATHFIND_NODE_SIZE;

  animationTrigger() {
    if (!this.node?.isFinishPoint && !this.node?.isStartingPoint) {
      if (this.node?.isSolution) {
        return "isSolution";
      } else {
        return this.node.isSelected ? "true" : "false";
      }
    }
  }

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.node.currentValue) {
      this.animationTrigger();
    }
  }

  ngOnInit(): void {}
}
