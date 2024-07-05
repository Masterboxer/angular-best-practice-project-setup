import { Component } from "@angular/core";

@Component({
  selector: "app-page-not-found",
  standalone: true,
  imports: [],
  template: `
    <div
      class="flex items-center justify-center h-full flex-col bg-secondary-background-color"
    >
      <h3 class="text-7xl text-common-warning-color">Error 404</h3>
      <p class="text-2xl text-primary-text-color">Page Not Found</p>
    </div>
  `
})
export class PageNotFoundComponent {}
