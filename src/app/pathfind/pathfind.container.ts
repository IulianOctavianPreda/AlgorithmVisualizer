import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-pathfind",
  templateUrl: "./pathfind.container.html",
  styleUrls: ["./pathfind.container.scss"],
})
export class PathfindComponent implements OnInit {
  node = { isSelected: false };
  constructor() {}

  ngOnInit(): void {}
}
