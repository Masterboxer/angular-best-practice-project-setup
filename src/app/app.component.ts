import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ThemeService } from "./core/theme/theme.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss"
})
export class AppComponent implements OnInit {
  title = "oss-sass";

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.initiateTheme();
  }
}
