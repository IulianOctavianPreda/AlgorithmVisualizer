import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "pathfind",
  },
  {
    path: "pathfind",
    loadChildren: () =>
      import("./pathfind/pathfind.module").then((m) => m.PathfindModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
