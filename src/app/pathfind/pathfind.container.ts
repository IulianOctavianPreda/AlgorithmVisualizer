import { Component, OnInit } from "@angular/core";
import { StateManagementService } from "src/app/shared/state-management/state-management.service";

import { Categories, CategoryOption } from "../shared/enums/category-option";

@Component({
  selector: "app-pathfind",
  templateUrl: "./pathfind.container.html",
  styleUrls: ["./pathfind.container.scss"],
})
export class PathfindComponent implements OnInit {
  constructor(private stateManager: StateManagementService) {
    const pathfindCategory = Categories.find(
      (x) => x.id === CategoryOption.Pathfind
    );
    this.stateManager.selectedCategory$.next(pathfindCategory);
  }

  ngOnInit(): void {}
}
