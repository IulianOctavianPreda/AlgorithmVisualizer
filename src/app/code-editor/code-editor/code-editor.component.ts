import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

import { CodeEditorBaseComponent } from "../components/code-editor-base/code-editor-base.component";

@Component({
  selector: "app-code-editor",
  templateUrl: "./code-editor.component.html",
  styleUrls: ["./code-editor.component.scss"],
})
export class CodeEditorComponent implements OnInit {
  @ViewChild("codeEditorBase") codeEditorBase: CodeEditorBaseComponent;

  formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({});
  }

  ngOnInit(): void {}

  run() {
    // this.codeEditor.code
  }
}
