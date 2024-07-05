import { Component, input, output } from "@angular/core";

@Component({
  selector: "app-common-button",
  standalone: true,
  imports: [],
  templateUrl: "./common-button.component.html",
  styleUrl: "./common-button.component.scss"
})
export class CommonButtonComponent {
  buttonText = input.required<string>();
  buttonClick = output<MouseEvent>();

  onButtonClick(event: MouseEvent) {
    this.buttonClick.emit(event);
  }
}
