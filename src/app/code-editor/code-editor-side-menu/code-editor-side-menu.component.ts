import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-code-editor-side-menu",
  templateUrl: "./code-editor-side-menu.component.html",
  styleUrls: ["./code-editor-side-menu.component.scss"],
  animations: [
    trigger("openClose", [
      state("open", style({})),
      state(
        "close",
        style({
          "flex-grow": "0",
          "padding-left": "0px",
          "padding-right": "0px",
          width: "0px",
        })
      ),
      transition("open => close", [animate("0.3s ease-in-out")]),
      transition("close => open", [animate("0.3s ease-in-out")]),
    ]),
  ],
})
export class CodeEditorSideMenuComponent implements OnInit {
  leftArrow = faChevronLeft;
  rightArrow = faChevronRight;

  isOpen = false;

  constructor() {}

  ngOnInit(): void {}

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
