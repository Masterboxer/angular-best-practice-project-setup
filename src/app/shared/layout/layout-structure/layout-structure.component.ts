import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: "app-layout-structure",
  standalone: true,
  imports: [RouterModule, SidebarComponent, HeaderComponent],
  templateUrl: "./layout-structure.component.html",
  styleUrl: "./layout-structure.component.scss"
})
export class LayoutStructureComponent {}
