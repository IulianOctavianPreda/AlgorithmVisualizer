import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MonacoEditorModule } from "ngx-monaco-editor";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CodeEditorModule } from "./code-editor/code-editor.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MonacoEditorModule.forRoot(),
    CodeEditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
