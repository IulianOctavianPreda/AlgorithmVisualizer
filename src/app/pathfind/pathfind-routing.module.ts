import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PathfindComponent } from "./pathfind.container";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "pathfinding",
      },
      {
        path: "pathfinding",
        pathMatch: "full",
        component: PathfindComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PathfindRoutingModule {}
