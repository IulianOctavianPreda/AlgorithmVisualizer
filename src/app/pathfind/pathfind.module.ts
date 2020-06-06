import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { PathfindGridComponent } from "./components/pathfind-grid/pathfind-grid.component";
import { PathfindUnitComponent } from "./components/pathfind-unit/pathfind-unit.component";
import { PathfindRoutingModule } from "./pathfind-routing.module";
import { PathfindComponent } from "./pathfind.container";

@NgModule({
  declarations: [
    PathfindComponent,
    PathfindUnitComponent,
    PathfindGridComponent,
  ],
  imports: [CommonModule, PathfindRoutingModule],
})
export class PathfindModule {}
