import { NgModule } from "@angular/core";
import { MonacoEditorModule } from "ngx-monaco-editor";

import { SharedModule } from "../shared/shared.module";
import { CodeEditorComponent } from "./code-editor/code-editor.component";
import { CodeEditorBaseComponent } from "./components/code-editor-base/code-editor-base.component";

@NgModule({
  declarations: [CodeEditorComponent, CodeEditorBaseComponent],
  imports: [SharedModule, MonacoEditorModule],
  exports: [CodeEditorComponent],
})
export class CodeEditorModule {}
