import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import { Unit } from "./../../types/unit";

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
export class PathfindUnitComponent implements OnInit {
  @Input() unit: Unit;

  @Output() unitUpdate = new EventEmitter<boolean>();

  toggle() {
    this.unitUpdate.emit(!this.unit.isSelected);
  }

  animationTrigger() {
    if (!!this.unit.isSolution) {
      return "isSolution";
    } else {
      return this.unit.isSelected ? "true" : "false";
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
