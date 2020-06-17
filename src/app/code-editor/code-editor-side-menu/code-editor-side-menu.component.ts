import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { ResultManagementService } from "src/app/shared/state-management/result-management.service";

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
    trigger("visibleHidden", [
      state("visible", style({ visibility: "visible", opacity: 1 })),
      state(
        "hidden",
        style({
          transform: "translateY(-100%)",
          visibility: "hidden",
          opacity: 0,
        })
      ),
      transition("visible => hidden", [animate("0.3s")]),
      transition("hidden => visible", [animate("0.3s")]),
    ]),
  ],
})
export class CodeEditorSideMenuComponent implements OnInit {
  leftArrow = faChevronLeft;
  rightArrow = faChevronRight;

  isOpen = false;

  constructor(private resultManager: ResultManagementService) {}

  ngOnInit(): void {
    this.resultManager.codeResults$.subscribe((data) => {
      if (data?.data) {
        this.isOpen = false;
      }
    });
  }

  onPanRight() {
    this.isOpen = true;
  }
  onPanLeft() {
    this.isOpen = false;
  }
  toggle() {
    this.isOpen = !this.isOpen;
  }
}
