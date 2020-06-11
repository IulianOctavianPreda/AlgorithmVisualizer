import { NgModule } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { SharedModule } from "../shared/shared.module";
import { CodeEditorSideMenuComponent } from "./code-editor-side-menu/code-editor-side-menu.component";
import { CodeEditorComponent } from "./code-editor/code-editor.component";
import { CodeEditorBaseComponent } from "./components/code-editor-base/code-editor-base.component";

@NgModule({
  declarations: [
    CodeEditorComponent,
    CodeEditorBaseComponent,
    CodeEditorSideMenuComponent,
  ],
  imports: [SharedModule, FontAwesomeModule],
  exports: [CodeEditorComponent, CodeEditorSideMenuComponent],
})
export class CodeEditorModule {}
