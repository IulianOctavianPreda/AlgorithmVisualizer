import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";

import { PathfindUnit } from "./../../types/unit";
import { PATHFIND_UNIT_SIZE } from "./../constants/constants";

@Component({
  selector: "app-pathfind-unit",
  templateUrl: "./pathfind-unit.component.html",
  styleUrls: ["./pathfind-unit.component.scss"],
  animations: [
    trigger("animationTrigger", [
      state(
        "true",
        style({
          backgroundColor: "yellow",
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
export class PathfindUnitComponent implements OnInit, OnChanges {
  @Input() unit: PathfindUnit;

  @Output() unitUpdate = new EventEmitter<PathfindUnit>();

  unitSize = PATHFIND_UNIT_SIZE;

  animationTrigger() {
    if (!this.unit?.isFinishPoint && !this.unit?.isStartingPoint) {
      if (this.unit?.isSolution) {
        return "isSolution";
      } else {
        return this.unit.isSelected ? "true" : "false";
      }
    }
  }

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.unit.currentValue) {
      this.animationTrigger();
    }
  }

  ngOnInit(): void {}
}
