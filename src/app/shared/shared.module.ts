import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, NgSelectModule],
  exports: [CommonModule, FormsModule, NgSelectModule],
})
export class SharedModule {}
