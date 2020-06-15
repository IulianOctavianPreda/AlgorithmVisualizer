import { DragDropModule } from "@angular/cdk/drag-drop";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { PathfindGridComponent } from "./components/pathfind-grid/pathfind-grid.component";
import { PathfindNodeComponent } from "./components/pathfind-node/pathfind-node.component";
import { PathfindRoutingModule } from "./pathfind-routing.module";
import { PathfindComponent } from "./pathfind.container";

@NgModule({
  declarations: [
    PathfindComponent,
    PathfindNodeComponent,
    PathfindGridComponent,
  ],
  imports: [
    CommonModule,
    PathfindRoutingModule,
    DragDropModule,
    FontAwesomeModule,
  ],
})
export class PathfindModule {}
